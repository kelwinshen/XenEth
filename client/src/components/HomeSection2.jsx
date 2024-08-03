import React from 'react';
import mobileFormSendETH from '../assets/mobileFormSendETH.png';
import formSendETH from '../assets/formSendETH.png'


function HomeSection2() {
  return (
    
<div className="bg-white md:container md:mx-auto py-[90px] rounded-lg mt-10 px-4 mx-4">
<div className="">

  <h4 className="font-bold uppercase text-center text-[#6E6E6E] text-lg md:text-[22px]">Supporters</h4>
  <h2 className="text-center text-4xl md:text-[70px] font-semibold md:leading-[110px] my-8 md:px-3">Support your Fav Creators and Become a Loyal Fan</h2>
  <p className="text-center md:w-[687px] mx-auto text-base">
  XenEth makes showing appreciation easy and fun. With just a few taps, you can support your favorite creators and leave a meaningful message.
  </p>

  <img className="hidden lg:block" src={formSendETH} />
  <img className="lg:hidden" src={mobileFormSendETH} />
</div>
</div>
  );
}

export default HomeSection2;










