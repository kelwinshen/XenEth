import React, { useState, useEffect } from 'react';
import HomeSection1 from '../components/HomeSection1';
import HomeSection2 from '../components/HomeSection2';
import HomeSection3 from '../components/HomeSection3';
import HomeSection4 from '../components/HomeSection4';



function Home ({ setWalletOpen,  walletOpen , setIsRegisterPopupOpen, setIsEditPopupOpen,   isRegisterPopupOpen, userInfo, isEditPopupOpen,  setUserInfo}) {
  
    
  return (
    <div className='w-full bg-[#353535]'>
      <div className='h-[100px]'></div>
      <HomeSection1   setWalletOpen={setWalletOpen} walletOpen = {walletOpen} setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen} userInfo={userInfo} isRegisterPopupOpen={isRegisterPopupOpen} isEditPopupOpen={isEditPopupOpen} setUserInfo={setUserInfo}/>
      <HomeSection2 />
      <HomeSection3  setWalletOpen={setWalletOpen} walletOpen = {walletOpen} setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen} userInfo={userInfo} isRegisterPopupOpen={isRegisterPopupOpen} isEditPopupOpen={isEditPopupOpen} setUserInfo={setUserInfo}/>
      <HomeSection4 />
    </div>
  );
};

export default Home;
