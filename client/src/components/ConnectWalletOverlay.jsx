import React from 'react';
import metamask_logo from "../assets/metamask.png";
import phantom_logo from "../assets/phantom.png";
import { IoClose } from "react-icons/io5";
import { getTemplate}  from '../ethFunctions';; // Adjust the import path accordingly

function ConnectWalletOverlay({ onClose, setUserAddress, setState, state}) {
  const handleConnectWallet = async () => {
    try {
      const { userAddress, state } = await getTemplate();
      setUserAddress(userAddress);
      setState(state);
      onClose();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="mx-5">
        <div className="container flex flex-col max-w-md gap-12 px-8 py-8 mx-auto bg-white rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium text-[#353535]">Connect Wallet</h1>
            <button onClick={onClose}>
              <IoClose className='text-[#353535] text-2xl' />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between p-4 border-2 rounded-xl hover:border-[#E56E38]" onClick={handleConnectWallet}>
              <span className="text-sm text-[#353535] font-medium">MetaMask</span>
              <img src={metamask_logo} alt="MetaMask" className="w-8 h-8"/>
            </div>
            <div className="flex items-center justify-between p-4 border-2 rounded-xl hover:border-[#E56E38]" onClick={handleConnectWallet}>
              <span className="text-sm text-[#353535] font-medium">Phantom</span>
              <img src={phantom_logo} alt="Phantom" className="w-8 h-8"/>
            </div>
          </div>
          <div>
            <p className="text-[#353535] text-sm">By continuing, you agree to our <b>Terms</b> and <b>Privacy Policy</b>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectWalletOverlay;
