import React, { useEffect, useState } from 'react';
import DashboardSection1 from '../components/DashboardSection1';
import DashboardSection2 from '../components/DashboardSection2';
import { useWalletInterface } from '../services/wallets/useWalletInterface';


function Dashboard({ setWalletOpen, walletOpen, setIsRegisterPopupOpen, setIsEditPopupOpen,userInfo, isRegisterPopupOpen, isEditPopupOpen, setUserInfo }) {
  const { walletInterface } = useWalletInterface(); 
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  // const [loading, setLoading] = useState(true);

  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(null);
  const [withdrawnDonations, setWithdrawnDonations] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      if (walletInterface) {
        try {
          const donationsDataGroup = await walletInterface.getDonations();
          const donationsArray = Object.assign([], donationsDataGroup.donations);
          donationsArray.reverse();

          const { donateStatisticTotal, donateStatisticAvailable, donateStatisticWithdrawn } = await walletInterface.getDonateStatistic();
          setDonations(donationsArray);
          setTotalDonations(donateStatisticTotal);
          setAvailableBalance(donateStatisticAvailable);
          setWithdrawnDonations(donateStatisticWithdrawn);
        } catch (error) {
          console.error('Error fetching donations:', error);
        } finally {
          // setLoading(false); // End loading once data is fetched or an error occurs
        }
      } else {
        console.warn('walletInterface is not available');
        // setLoading(false); // End loading if walletInterface is not available
      }
    };

    if (walletInterface) {
      fetchDonations();
    } else {
      // setLoading(true);
    }
  }, [walletInterface]);


  // if (loading) {
  //   return <LoadingScreen/>
  // } 

  return (
    <div className='w-full bg-[#F3F3F3]'>
      <DashboardSection1  
        userInfo={userInfo} 
        setUserInfo={setUserInfo}
        isRegisterPopupOpen={isRegisterPopupOpen}
        isEditPopupOpen={isEditPopupOpen}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        setIsEditPopupOpen={setIsEditPopupOpen}
        totalDonations={totalDonations}
        setTotalDonations={setTotalDonations}
        availableBalance={availableBalance}
        setAvailableBalance={setAvailableBalance}
        withdrawnDonations={withdrawnDonations}
        setWithdrawnDonations={setWithdrawnDonations}
        donations={donations}
        setDonations={setDonations}
      />
      <DashboardSection2  
        userInfo={userInfo}  
        setUserInfo={setUserInfo} 
        donations={donations} 
        setDonations={setDonations}
      />
    </div>
  );
}

export default Dashboard;
