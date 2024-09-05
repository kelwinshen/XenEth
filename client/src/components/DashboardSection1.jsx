import defaultProfileImage from '../assets/xeneth.png';


import RegisterPopup from './Register';
import EditPopup from './Edit';
import moneyWings from '../assets/moneyWings.png';
import moneyBag from '../assets/moneyBag.png';
import rocket from '../assets/rocket.png';
import moneyFace from '../assets/moneyFace.png';
import ConnectWalletOverlay from './ConnectWalletOverlay';
import { CgWebsite } from "react-icons/cg";
import { PiWallet } from "react-icons/pi";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletInterface } from '../services/wallets/useWalletInterface';


function DashboardSection1({

  userInfo,
  setUserInfo, 
  isRegisterPopupOpen, 
  isEditPopupOpen, 
  setIsRegisterPopupOpen, 
  setIsEditPopupOpen, 
  totalDonations, 
  setTotalDonations, 
  availableBalance,
  setAvailableBalance,
  withdrawnDonations,
  setWithdrawnDonations, 
  donations,
  setDonations

}) {


  const navigate = useNavigate();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false);



  const { walletInterface } = useWalletInterface();

  const handleConnectWalletClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };






 

  const handleClick = async () => {
    if (walletInterface!=null && !userInfo) {
      setIsRegisterPopupOpen(true);
    } else {
      handleConnectWalletClick();
    }
  };

  const handleClickClaim = async () => {
    if(walletInterface!=null){
    try {
      await walletInterface.withdraw();
      const {donationsDataGroup} = await walletInterface.getDonations();
      const {donateStatisticTotal, donateStatisticAvailable, donateStatisticWithdrawn} = await walletInterface.getDonateStatistic()
      const donationsArray = Object.assign([], donationsDataGroup.donations);
      donationsArray.reverse();
      setDonations(donationsArray);
      setTotalDonations(donateStatisticTotal);
      setAvailableBalance(donateStatisticAvailable);
      setWithdrawnDonations(donateStatisticWithdrawn);
    
   
      setSuccessMessage('Claim successful! ✅');
      setErrorMessage(''); // Clear any existing error messages
      setIsSuccess(true); // Set success state to true
    } catch (error) {
      console.error('Error claim:', error);
      setErrorMessage('There was an error claiming your reward.');
      setSuccessMessage(''); // Clear any existing success messages
    }}
  };

  return (
    
    <div className=" text-white flex-col items-center relative">
  
      {(walletInterface!=null && userInfo) ? 
        <div>
             <div className='h-[200px]'></div>
          <div className='items-center flex'> 
            
            <div className="px-5 pb-5 bg-white rounded-3xl shadow-lg lg:px-7 w-full mx-[5%] items-center">
          
              <div className="flex justify-center py-8 lg:hidden"> 
                
                <div className="relative w-[50px] h-[50px] items-center justify-center hidden lg:block">
                  <div className="absolute w-[50px] h-[50px] bg-[#89A9EF] rounded-full"></div>
                  <img className="relative w-[35px] h-[35px]" src={defaultProfileImage} alt="Profile" />
                </div>
              </div>
              <div className="flex items-center justify-between max-sm:pb-8 lg:py-8">
                <div className="flex gap-1 lg:gap-4">
                  <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                    <div className="absolute w-[60px] h-[60px] bg-[#89A9EF] rounded-full"></div>
                    <img className="relative w-[40px] h-[40px]" src={defaultProfileImage} alt="Profile" />
                  </div>
                  <div className='w-[5px]'></div>
                  <div className="flex flex-col gap-2 lg:w-full">
                    <p className="text-[16px] font-bold text-[#353535] md:text-2xl">
                      Hi, {userInfo}
                    </p>
                    <p className="text-[14px] text-[#353535]  md:text-xl">
                     {window.location.origin+"/"+userInfo}
                    </p>
                  </div>
                </div>
                <div onClick={()=>{navigate(`${"/"+userInfo}`);}} className="items-center hidden md:flex">
                  <div className="flex gap-3 items-center hover:bg-[#E56E38] bg-[#353535] text-[14px] text-white py-[10px] px-4 rounded-2xl cursor-pointer">
                 Open Page
                    <div className="font-bold ti-link text-white"><CgWebsite /></div>
                  </div>
                </div>
              </div>
              <div className='h-[20px]'></div>
              <div onClick={()=>{navigate(`${"/"+userInfo}`);}} className="md:hidden">
                <div className="flex justify-center gap-1 hover:bg-[#E56E38] bg-[#353535] text-[14px] text-white py-[10px] px-4 rounded-2xl cursor-pointer items-center">
                Open Page
                  <div className="font-bold ti-link text-white"><CgWebsite /></div>
                </div>
              </div>
              <div className='h-[20px]'></div>
              <hr />
              <div className="flex flex-col justify-between py-5 lg:py-10 lg:gap-6 lg:flex-row">
                <div className="flex flex-col gap-2 py-4 lg:gap-1">
                  <p className="text-7xl">💰</p>
                  <p className="text-sm font-semibold text-[#353535]">Total Reward</p>
                  <p className="text-3xl font-bold text-[#353535]">{(parseFloat(totalDonations)).toFixed(5)} ETH</p>
                </div>
                <div className="flex flex-col gap-2 py-4 lg:gap-1">
                  <p className="text-7xl">🤑</p>
                  <p className="text-sm font-semibold text-[#353535]">Balance</p>
                  <p className="text-3xl font-bold text-[#353535]">{parseFloat((availableBalance)).toFixed(5)} ETH</p>
                </div>
                <div className="flex flex-col gap-2 py-4 lg:gap-1">
                  <p className="text-7xl">💸</p>
                  <p className="text-sm font-semibold text-[#353535]">Claimed Reward</p>
                  <p className="text-3xl font-bold text-[#353535]">{ parseFloat((withdrawnDonations)).toFixed(5)} ETH</p>
                </div>
              </div>
              {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
              {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
              <button
                onClick={async () => {
                  if (isSuccess) {
                    setErrorMessage('');
                    setSuccessMessage('');
                    setIsSuccess(false);
                  } else {
                    if (availableBalance != 0) {
                      setClaimLoading(true);
                      await handleClickClaim();
                      setClaimLoading(false);
                    } else {
                      setErrorMessage("No Balance to Claim.");
                    }
                  }
                }}
                className="w-full bg-[#353535] text-white text-center py-2 px-4 rounded-xl hover:bg-[#E56E38] disabled:bg-gray-400"
                disabled={claimLoading}
              >
                {claimLoading ? (
                  <>
                    Loading...
                  </>
                ) : (
                  isSuccess ? 'Okay' : 'Claim'
                )}
              </button>
            </div>
          </div>
          <div className='h-[40px]'></div>
        </div>
        
      : <div>
        <div className='h-[100px] md:h-[200px] bg-[#353535]'></div>
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
          <h1 className="mx-10 md:text-[60px] text-[40px] font-bold">{walletInterface!=null && !userInfo ? "Oops... You don't have a page yet" : "Please connect your wallet to access the dashboard"}</h1>
        </div>
        <button className="mt-10 bg-white text-[#353535] font-medium px-6 py-3 rounded-2xl flex items-center hover:bg-[#E56E38]" onClick={handleClick}>
          {walletInterface!=null && !userInfo ? 'Create Your Page' : 'Connect Wallet'}
          {walletInterface!=null && !userInfo ? <CgWebsite className='ml-2 text-2xl' /> : <PiWallet className='ml-2 text-2xl' />}
        </button>
 
   
      </div>
      <div className='h-[100px] bg-[#353535]'></div>
      </div>
      }
      
      {isOverlayVisible && <ConnectWalletOverlay setWalletOpen={setWalletOpen} />}
      <RegisterPopup isRegisterPopupOpen={isRegisterPopupOpen} onClose={() => setIsRegisterPopupOpen(false)} setUserInfo={setUserInfo} />
      <EditPopup isEditPopupOpen={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)} setUserInfo={setUserInfo} userInfo={userInfo} />
     
    </div>
  );
}

export default DashboardSection1;
