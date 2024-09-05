import React, { useState } from 'react';
import { PiWallet } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import moneyWings from '../assets/moneyWings.png';
import moneyBag from '../assets/moneyBag.png';
import rocket from '../assets/rocket.png';
import moneyFace from '../assets/moneyFace.png';
import ConnectWalletOverlay from './ConnectWalletOverlay';
import useTypingAnimation from '../useTypingAnimation'; // Import the custom hook
import RegisterPopup from './Register';
import { CgWebsite } from "react-icons/cg";
import EditPopup from './Edit';
import { useWalletInterface } from '../services/wallets/useWalletInterface';




function HomeSection1({  setWalletOpen,  walletOpen , setIsRegisterPopupOpen, setIsEditPopupOpen, userInfo,  isRegisterPopupOpen, isEditPopupOpen,  setUserInfo}) {
  
  
  const { accountId, walletInterface } = useWalletInterface();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const navigate = useNavigate();

  const handleConnectWalletClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handleClick = async () => {
    if (walletInterface != null && userInfo) {
      navigate('/dashboard'); // Navigate to the dashboard if the user address exists
    } else if (walletInterface != null) {
      setIsRegisterPopupOpen(true);
    } else {
      handleConnectWalletClick(); // Show the overlay to connect the wallet
    }
  };

  const typingText = useTypingAnimation([
    'Creators',
    'Gamers',
    'Builders',
    'Communities',
    'Anyone'
  ], 100, 1500); // Adjust typing speed and pause duration

  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #89A9EF 0%, #C7B2F3 28%, #EECCC3 62%, #B7F9F4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div className="bg-[#353535] text-white flex flex-col items-center py-20 relative h-[600px]">
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
        <h1 className="md:text-[60px] text-[40px] font-bold mx-10">Easy Way to Say Thanks</h1>
        <h2 className="md:text-[60px] text-[40px] font-bold" style={gradientTextStyle}>to {typingText}|</h2>
        <p className="mt-4 text-lg">A decentralized app design to appreciate and contribute to<br />anyone on the Web3 space in easy and fun way, built on Ethereum and Solana.</p>
      </div>
      <button className="mt-10 bg-white text-[#353535] font-medium px-6 py-3 rounded-2xl flex items-center hover:bg-[#E56E38]" onClick={handleClick}>
        {walletInterface!=null && userInfo ? 'Open Dashboard' : walletInterface!=null  ? 'Create Your Page' : 'Connect Wallet'}
        {walletInterface!=null && userInfo ? <RxDashboard className='ml-2 text-xl' /> : walletInterface!=null  ? <CgWebsite className='ml-2 text-2xl' /> : <PiWallet className='ml-2 text-2xl' />}
      </button>

      {isOverlayVisible && <ConnectWalletOverlay setWalletOpen={setWalletOpen} />}
      <RegisterPopup isRegisterPopupOpen={isRegisterPopupOpen} onClose={() => setIsRegisterPopupOpen(false)} setUserInfo={setUserInfo} />
      <EditPopup isEditPopupOpen={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)} setUserInfo={setUserInfo} userInfo={userInfo} />
    </div>
  );
}

export default HomeSection1;
