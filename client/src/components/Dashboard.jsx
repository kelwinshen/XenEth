import React, { useEffect, useState } from 'react';
import { getDonations, withdraw, getTemplate, getUserInfo, getTotalDonations, getAvailableBalance, getWithdrawnDonations } from '../ethFunctions';
import Header from './Header';
import Footer from './Footer';
import DashboardSection1 from './DashboardSection1';
import { useNavigate } from 'react-router-dom';
import DashboardSection2 from './DashboardSection2';



function Dashboard() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const navigate = useNavigate();

  const handleConnectWalletClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };
  const [donations, setDonations] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [userInfo, setUserInfo] = useState(null);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [totalDonations, setTotalDonations] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(null);
  const [withdrawnDonations, setWithdrawnDonations] = useState(null);


  useEffect(() => {
    const handleConnectWallet = async () => {
    try {
      const {  contract, provider, signer , userAddress} = await getTemplate();
      const {userInfo} =  await getUserInfo();
      setUserInfo(userInfo);
      setUserAddress(userAddress);
      setState({ provider, signer, contract});
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  handleConnectWallet();
  }, []);


  useEffect(() => {
    const fetchDonations = async () => {
      const donationsDataGroup = await getDonations();
      const totalDonations = await getTotalDonations()
      const availableBalance = await getAvailableBalance();
      const withdrawnDonations = await getWithdrawnDonations();
      setDonations(donationsDataGroup.donations);
      setTotalDonations(totalDonations);
      setAvailableBalance(availableBalance);
      setWithdrawnDonations(withdrawnDonations);
    };
    fetchDonations();
  }, []);


  const handleWithdraw = async () => {
    await withdraw();
  };

  return (
    <div className='w-full bg-[#353535]'>
   <Header userAddress={userAddress} setUserAddress={setUserAddress} state={state} setState={setState} userInfo={userInfo} setUserInfo = {setUserInfo} isRegisterPopupOpen={isRegisterPopupOpen} isEditPopupOpen={isEditPopupOpen} setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen}  totalDonations={totalDonations} setTotalDonations={setTotalDonations} availableBalance={availableBalance} setAvailableBalance={setAvailableBalance} withdrawnDonations= {withdrawnDonations} setWithdrawnDonations = {setWithdrawnDonations} />
   <div className='h-[100px]'></div>
   <DashboardSection1 userAddress={userAddress} setUserAddress={setUserAddress} state={state} setState={setState} userInfo={userInfo}  setUserInfo = {setUserInfo}  isRegisterPopupOpen={isRegisterPopupOpen} isEditPopupOpen={isEditPopupOpen} setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen}  totalDonations={totalDonations} setTotalDonations={setTotalDonations} availableBalance={availableBalance} setAvailableBalance={setAvailableBalance} withdrawnDonations= {withdrawnDonations} setWithdrawnDonations = {setWithdrawnDonations} />
   <DashboardSection2 userAddress={userAddress} setUserAddress={setUserAddress} state={state} setState={setState} userInfo={userInfo}  setUserInfo = {setUserInfo} donations={donations}/>
    <Footer />
  </div>



  );
}

export default Dashboard;
