import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CgWebsite } from "react-icons/cg";
import { IoPeople } from "react-icons/io5";

function HomeSection3({ userAddress, setUserAddress, state, setState, userInfo, setUserInfo, isRegisterPopupOpen, isEditPopupOpen, setIsRegisterPopupOpen, setIsEditPopupOpen }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (userAddress && userInfo) {
      navigate('/donate'); // Navigate to the dashboard if the user address exists
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log("Scroll to top");
    }
  };

  return (
    <div className="bg-white md:container md:mx-auto py-12 rounded-lg mt-10 lg:px-[70px] px-[16px] mx-4">
      <div>
        <h2 className="text-center text-4xl md:text-[70px] font-semibold md:leading-[110px] ">Build your Valuable Community with XenEth</h2>

        <div className="flex flex-col gap-12 py-20 md:gap-6 md:flex-row">
          <div className="flex gap-4">
            <p className="text-[30px]">✅</p>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">Security</h3>
              <p className="text-base font-semibold">Secure and transparent donation transactions using blockchain technology.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <p className="text-[30px]">✅</p>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">Fast</h3>
              <p className="text-base font-semibold">Fast donation process without intermediaries.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <p className="text-[30px]">✅</p>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">Decentralization</h3>
              <p className="text-base font-semibold">Everyone can be everything in this space to bring more value to the community</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={handleClick} className="mt-10 bg-[#353535] text-white font-medium px-6 py-3 rounded-2xl flex items-center hover:bg-[#E56E38]">
            {userAddress && userInfo ? 'Open My Page' : 'Join as XenEth creator'}
            {userAddress && userInfo ? <CgWebsite className='ml-2 text-2xl' /> : <IoPeople className='ml-2 text-2xl' />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeSection3;
