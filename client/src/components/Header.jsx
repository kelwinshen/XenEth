import React, { useState, useEffect, useRef } from 'react';
import logo_image from '../assets/xeneth.png';
import { PiWallet } from 'react-icons/pi';
import ConnectWalletOverlay from './ConnectWalletOverlay';
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';


function Header({ userAddress, setUserAddress, state, setState, userInfo, setUserInfo, setIsRegisterPopupOpen, setIsEditPopupOpen , totalDonations, getTotalDonations, availableBalance, setAvailableBalance, withdrawnDonations, setWithdrawnDonations}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);


 
  const menuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConnectWalletClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const formatAddress = (data) => {
    if (data.length > 10) {
      return data.slice(0, 5) + '...' + data.slice(-5);
    } else {
      return data; // if the length is not sufficient, return the data as is
    }
  };

 
  return (
    <div>
      <div
        className={`flex items-center fixed w-full justify-between p-5 z-50 backdrop-blur-xl transition-colors duration-500 ${
          isScrolled ? 'bg-white' : 'bg-[#353535]'
        }`}
      >
        
        <div className='hidden md:flex items-center space-x-5 md:ml-[20px]'>
          <button
            className={`border-0 focus:outline-none focus:ring-2 focus:ring-[#353535] hover:text-[#E56E38] ${
              isScrolled ? 'text-[#353535]' : 'text-white'
            }`}
          >
            FAQ
          </button>
          <button
            className={`border-0 focus:outline-none focus:ring-2 focus:ring-[#353535] hover:text-[#E56E38] ${
              isScrolled ? 'text-[#353535]' : 'text-white'
            }`}
          >
            Developer
          </button>
          <button
            className={`border-0 focus:outline-none focus:ring-2 focus:ring-[#353535] hover:text-[#E56E38] ${
              isScrolled ? 'text-[#353535]' : 'text-white'
            }`}
          >
            Help Center
          </button>
        </div>

        <div className='flex items-center'>
          <img src={logo_image} className='md:h-10 h-7' alt='Logo' />
          <span
            className={`md:text-2xl text-xl font-medium ml-2 ${
              isScrolled ? 'text-[#353535]' : 'text-white'
            }`}
          >
            XenEth
          </span>
        </div>

        <div className='relative flex items-center md:mr-[20px]'>
          <div className='md:w-[120px]'></div>
          {userAddress ? (
            <>
              <button
                onClick={toggleMenuVisibility}
                className={`font-medium text-[10px] md:text-[16px] px-4 py-2 rounded-2xl flex items-center transition-colors duration-500 ${
                  isScrolled ? 'bg-[#353535] text-white' : 'bg-white text-[#353535]'
                } hover:bg-[#E56E38]`}
              >
                {formatAddress(userAddress)}
                <PiWallet className='md:ml-2 md:text-2xl text-xs' />
              </button>
              {isMenuVisible && (
               <div
               ref={menuRef}
               className="absolute top-full right-0 mt-2 w-60 bg-white shadow-lg rounded-md py-2 px-2"
             >
                {(userInfo) ?  <button
                 className={"flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]" }
                 onClick={() => { navigate('/dashboard');}}
               >
                  <span className="ml-3">Dashboard</span>
                 <RxDashboard className="md:w-8 md:h-8 w-5 h-5" />
                
               </button>  : null}

               {(userInfo) ?  <button
                 className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                 onClick={() => { setIsEditPopupOpen(true); 
                    setIsMenuVisible(false);
                 }}
               >
                 <span className="ml-3">Edit Page</span>
                 <CgWebsite className="md:w-8 md:h-8 w-5 h-5" />
                
               </button> :  <button
                 className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                 onClick={() => { setIsRegisterPopupOpen(true); 
                    setIsMenuVisible(false);
                 }}
               >
                 <span className="ml-3">Create Page</span>
                 <CgWebsite className="md:w-8 md:h-8 w-5 h-5" />
                
               </button> }


              
               <button
                 className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                 onClick={() => {
                   console.log('Disconnect');
                   
                   setUserAddress(null); // Disconnect logic
                   setUserInfo(null);
                   setState(null);
                   setIsMenuVisible(false); // Close menu on disconnect
                 }}
               >
                 <span className="ml-3">Disconnect</span>
                 <FiLogOut className="md:w-8 md:h-8 w-5 h-5" />
                
               </button>
             </div>
              )}
            </>
          ) : (
            <button
              onClick={handleConnectWalletClick}
              className={`font-medium text-[10px] md:text-[16px] px-4 py-2 rounded-2xl flex items-center transition-colors duration-500 ${
                isScrolled ? 'bg-[#353535] text-white' : 'bg-white text-[#353535]'
              } hover:bg-[#E56E38]`}
            >
              Connect Wallet
              <PiWallet className='md:ml-2 md:text-2xl text-xs' />
            </button>
          )}
        </div>
      </div>
      {isOverlayVisible && (
        <ConnectWalletOverlay
          onClose={handleCloseOverlay}
          setUserAddress={setUserAddress}
          setState={setState}
          state={state}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      )}
      
    </div>
    
  );
}

export default Header;
