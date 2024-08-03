import React, { useState, useEffect } from 'react';
import Header from './Header';
import HomeSection1 from './HomeSection1';
import HomeSection2 from './HomeSection2';
import HomeSection3 from './HomeSection3';
import HomeSection4 from './HomeSection4';
import Footer from './Footer';
import { getTemplate, getUserInfo } from '../ethFunctions';

const Home = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [userInfo, setUserInfo] = useState(null);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);


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
    
  return (
    <div className='w-full bg-[#353535]'>
      <Header userAddress={userAddress} setUserAddress={setUserAddress} state={state} setState={setState} userInfo={userInfo} setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen}/>
      <div className='h-[100px]'></div>

      <HomeSection1 userAddress={userAddress} setUserAddress={setUserAddress} state={state} setState={setState} userInfo={userInfo} setUserInfo = {setUserInfo} isRegisterPopupOpen={isRegisterPopupOpen} isEditPopupOpen={isEditPopupOpen}  setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen}/>
      <HomeSection2 />
      <HomeSection3 userAddress={userAddress} setUserAddress={setUserAddress} state={state} setState={setState} userInfo={userInfo} setUserInfo = {setUserInfo} isRegisterPopupOpen={isRegisterPopupOpen} isEditPopupOpen={isEditPopupOpen}  setIsRegisterPopupOpen={setIsRegisterPopupOpen} setIsEditPopupOpen={setIsEditPopupOpen}/>
      <HomeSection4 />
      <Footer />
    </div>
  );
};

export default Home;
