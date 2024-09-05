import React, { useState, useEffect, useRef } from 'react';
import logo_image from '../assets/xeneth.png';
import { PiWallet } from 'react-icons/pi';
import ConnectWalletOverlay from './ConnectWalletOverlay';
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import { useNavigate, useLocation } from 'react-router-dom';




function Header({  setWalletOpen,  walletOpen , setIsRegisterPopupOpen, setIsEditPopupOpen, userInfo,  isRegisterPopupOpen, isEditPopupOpen,  setUserInfo}) {
  
  const { accountId, walletInterface } = useWalletInterface();

  const navigate = useNavigate();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  

  



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

  const getBackgroundColor = () => {
    if (isScrolled) {
      return  'bg-white';
    } else {
      return 'bg-[#353535]';
    }
  };

  const getTextColor = () => {
    if (isScrolled) {
      return 'text-[#353535]';
    } else {
      return 'text-white';
    }
  };

  return (
    <div>
      <div
        className={`flex items-center fixed w-full justify-between p-5 z-50 backdrop-blur-xl transition-colors duration-500 ${getBackgroundColor()}`}
      >
       
        <div className='flex items-center'>
          <img src={logo_image} className='md:h-10 h-7' alt='Logo' />
          <span
            className={`md:text-2xl text-xl font-medium ml-2 ${getTextColor()}`}
          >
            XenEth
          </span>
        </div>

        <div className='relative flex items-center md:mr-[20px]'>
          <div className='md:w-[120px]'></div>
          {walletInterface != null ? (
            <>
              <button
                onClick={toggleMenuVisibility}
                className={`font-medium text-[10px] md:text-[16px] px-4 py-2 rounded-2xl flex items-center transition-colors duration-500 ${isScrolled ? 'bg-[#353535] text-white' : 'bg-white text-[#353535]'} hover:bg-[#E56E38]`}
              >
                {formatAddress(accountId)}
                <PiWallet className='md:ml-2 md:text-2xl text-xs' />
              </button>
              {isMenuVisible && (
                <div
                  ref={menuRef}
                  className="absolute top-full right-0 mt-2 w-60 bg-white shadow-lg rounded-md py-2 px-2"
                >
                  {userInfo && location.pathname=="/"? (
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                      onClick={() => { navigate('/dashboard'); }}
                    >
                      <span className="ml-3">Dashboard</span>
                      <RxDashboard className="md:w-8 md:h-8 w-5 h-5" />
                    </button>
                  ) : null}

                  {userInfo && (location.pathname=="/dashboard" || location.pathname=="/")  ? (
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                      onClick={() => {
                        setIsEditPopupOpen(true);
                        setIsMenuVisible(false);
                      }}
                    >
                      <span className="ml-3">Edit Page</span>
                      <CgWebsite className="md:w-8 md:h-8 w-5 h-5" />
                    </button>
                  ) :  (location.pathname=="/dashboard" || location.pathname=="/")  ? (
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                      onClick={() => {
                        setIsRegisterPopupOpen(true);
                        setIsMenuVisible(false);
                      }}
                    >
                      <span className="ml-3">Create Page</span>
                      <CgWebsite className="md:w-8 md:h-8 w-5 h-5" />
                    </button>
                  ) : null}

                  <button
                    className="flex items-center justify-between w-full px-4 py-2 text-xs md:text-sm text-[#353535] font-semibold hover:bg-[#353535] hover:text-white rounded-[5px]"
                    onClick={() => {
                      // console.log('Disconnect');
                      walletInterface.disconnect();
                      
                      
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
              onClick={()=>{setWalletOpen(true);}}
              className={`font-medium text-[10px] md:text-[16px] px-4 py-2 rounded-2xl flex items-center transition-colors duration-500 ${isScrolled ? 'bg-[#353535] text-white' : 'bg-white text-[#353535]'} hover:bg-[#E56E38]`}
            >
              Connect Wallet
              <PiWallet className='md:ml-2 md:text-2xl text-xs' />
            </button>
          )}
        </div>
      </div>
      {walletOpen && (
        <ConnectWalletOverlay
        setWalletOpen = {setWalletOpen}
        

        />
      )}
    </div>
  );
}

export default Header;
