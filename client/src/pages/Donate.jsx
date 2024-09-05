import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DonateSection1 from '../components/DonateSection1';
import LoadingScreen from '../components/LoadingScreen';
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import moneyWings from '../assets/moneyWings.png';
import moneyBag from '../assets/moneyBag.png';
import rocket from '../assets/rocket.png';
import moneyFace from '../assets/moneyFace.png';
import ConnectWalletOverlay from '../components/ConnectWalletOverlay';
import { PiWallet } from "react-icons/pi";

function Donate({ setWalletOpen, walletOpen, setIsRegisterPopupOpen, setIsEditPopupOpen, userInfo, isRegisterPopupOpen, isEditPopupOpen, setUserInfo }) {
  const { walletInterface } = useWalletInterface(); 
  const { recipientId } = useParams();
  const [nameRegisteredStatus, setNameRegisteredStatus] = useState(false);
  const [donations, setDonations] = useState([]);
  const [recipientName, setRecipientName] = useState(recipientId);
  const navigate = useNavigate();


  
  useEffect(() => {
    const getKnowRecipientIdDetails = async () => {

        if (!walletInterface) {
          // console.error('walletInterface is not available');
          return;
        }
        
        // console.log('Calling isNameRegistered with recipientId:', recipientId);
        const {nameRegistered} = await walletInterface.isNameRegistered(recipientId);
        // console.log('isNameRegistered result:', nameRegistered);
        
        
 
        if (nameRegistered) {
          setNameRegisteredStatus(nameRegistered);
          // console.log('Fetching donations...');
          const donationsDataGroup = await walletInterface.getDonations();
          const donationsArray = Object.assign([], donationsDataGroup.donations);
          donationsArray.reverse();
          setDonations(donationsArray);
          // console.log('Donations fetched and set:', donationsArray);
        } else if (!nameRegistered){
          navigate("/");
        }
     
    };
    
    getKnowRecipientIdDetails();
  }, [walletInterface, recipientId, navigate]);

  return (
    nameRegisteredStatus && walletInterface != null? 
      <div className='w-full bg-[#F3F3F3]'>
        <DonateSection1 recipientName={recipientName} donations={donations} setDonations={setDonations}/> 
      </div>
    : walletInterface == null ? <div>  <div className='h-[100px] md:h-[200px] bg-[#353535]'> </div> <div className="bg-[#353535] text-white flex flex-col items-center py-20 relative h-[600px]">
  
    <div className="absolute top-1/10 md:top-0 left-10">
      <img src={moneyWings} alt="Money with wings" className="h-[300px] w-[300px] animated-image" />
    </div>
    <div className="absolute top-3/5 md:top-3/4 left-0 transform -translate-y-1/2">
      <img src={moneyBag} alt="Money bag" className="h-[300px] w-[300px] animated-image" />
    </div>
    <div className="absolute top-1/10 md:top-0 right-10">
      <img src={moneyFace} alt="Money face" className="h-[300px] w-[300px] animated-image" />
    </div>
    <div className="absolute top-3/5 md:top-3/4 right-0 transform -translate-y-1/2">
      <img src={rocket} alt="Rocket" className="h-[300px] w-[300px] animated-image" />
    </div>
    <div className="text-center">
      <div className='h-[100px]'></div>
      <h1 className="md:text-[60px] text-[40px] font-bold mx-10">Oops... You don't connect your wallet yet</h1>
     
    </div>
    <button className="mt-10 bg-white text-[#353535] font-medium px-6 py-3 rounded-2xl flex items-center hover:bg-[#E56E38]" onClick={()=>{setWalletOpen(true);}}>
      { 'Connect Wallet'}
      { <PiWallet className='ml-2 text-2xl' />}
    </button>
    {walletOpen && <ConnectWalletOverlay setWalletOpen={setWalletOpen} />}
    </div>
  </div> : 
      <div className='w-full bg-[#353535] flex items-center justify-center h-screen'>
        <LoadingScreen />
      </div>
  );
}

export default Donate;
