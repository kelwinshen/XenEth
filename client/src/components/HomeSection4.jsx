import React from 'react';
import metamask_logo from "../assets/metamask.png";
import phantom_logo from "../assets/phantom.png";

function HomeSection4() {
  return (
    <div className="bg-white md:container md:mx-auto py-[90px] rounded-lg mt-10 px-4 mx-4">
    <div className="">
      <h4 className="font-bold uppercase text-center text-[#6E6E6E] text-lg md:text-[22px]">How it Work</h4>
      <h2 className="text-center text-4xl md:text-[70px] font-semibold md:leading-[110px] my-8">Connect with your Favorite Wallet</h2>
      <p className="text-center md:w-[687px] mx-auto text-base">
      Connect with your favorite wallet in a one tap.
      </p>
      <div className="flex justify-center items-center gap-8 pt-16">
        <img  src= {metamask_logo} className="md:w-[180px] md:h-[180px] w-[100px] h-[100px]" alt="" />
        <img src={phantom_logo} className="md:w-[140px] md:h-[140px] w-[70px] h-[70px]" alt="" />
      </div>
    </div>
  </div>
  );
}

export default HomeSection4;





