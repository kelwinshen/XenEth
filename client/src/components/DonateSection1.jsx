import React, { useState } from 'react';
import defaultProfileImage from '../assets/xeneth.png';
import { FaRegShareSquare,  FaCheckSquare } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import coverImage from "../assets/xenethCover.png";
import {ethers} from 'ethers';
import { useWalletInterface } from '../services/wallets/useWalletInterface';

function DonateSection1({ recipientName, donations, setDonations }) {
  const { walletInterface } = useWalletInterface(); 

  const copyToClipboardAddress = async (address, index) => {
    setSelectedIndexDonatorAddress(index);
    const textToCopy = "https://sepolia.etherscan.io/address/"+address;
    await navigator.clipboard.writeText(textToCopy)
    setCopyDonatorAddressStatus(true);

      setTimeout(() => setCopyDonatorAddressStatus(false), 3000); 
  };

  const copyToClipboardDonatePage = async() => {
  
      const shareData = {
        title: `${"Let's support "+recipientName} via XenEth!`,
        url: `${window.location.origin+"/"+recipientName}`,
      };
  
      if (navigator.share) {
        try {
          await navigator.clipboard.writeText(shareData.url);
          await navigator.share(shareData);
          // console.log('Page shared successfully');
        } catch (error) {
          // console.error('Error sharing:', error);
        }
      } else {
        // Fallback: Copy URL to clipboard
        try {
          setCopyPageStatus(true);
          await navigator.clipboard.writeText(shareData.url);
          alert('Link copied to clipboard! Share it with your friends.');
        } catch (error) {
          // console.error('Failed to copy link:', error);
        }
      }
     
      setTimeout(() => setCopyPageStatus(false), 3000); 
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [amountOfCup, setAmountOfCup] = useState(1); // Initialize with a default value (1)
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false);
  const [copyPageStatus, setCopyPageStatus] = useState(false);
  const [copyDonatorAddressStatus, setCopyDonatorAddressStatus] = useState(false);
  const [selectedIndexDonatorAddress, setSelectedIndexDonatorAddress] = useState(0);
  




  


  const donationsPerPage = 4;

  const formatAddress = (data) => {
    if (data.length > 10) {
      return data.slice(0, 5) + '...' + data.slice(-5);
    } else {
      return data; // if the length is not sufficient, return the data as is
    }
  };

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value) {
      setAmountOfCup(parseInt(value));
    } else {
      setAmountOfCup(1); // Fallback to default if input is empty
    }
  };

  const sendDonate = async()=>{
    if(walletInterface!=null){
    try {
      setSendLoading(true);
      await walletInterface.donate(recipientName, message,  donorName, (amountOfCup*0.00505).toString());
      const donationsDataGroup = await walletInterface.getDonations();
      const donationsArray = Object.assign([], donationsDataGroup.donations);
      donationsArray.reverse();
      setDonations(donationsArray);

      setSendLoading(false);
      setCurrentPage(0);
      setAmountOfCup(1);
      setDonorName('');
      setMessage('');    
      setSuccessMessage("The transaction is successful! ✅")
      setErrorMessage(''); // Clear any existing error messages
      setIsSuccess(true); // Set success state to true
      
    } catch (error) {
      // console.log('Error send transaction',error);
      setErrorMessage("Something wrong with the transaction!")
      setSuccessMessage(''); // Clear any existing success messages
      
    }
  
  }
}



  const startIndex = currentPage * donationsPerPage;
  const currentDonations = donations.slice(startIndex, startIndex + donationsPerPage);

  return (
    <div className="bg-[#f3f3f3]">
      <section id="bannerProfile" className="bg-blue-100/50">
        <div className="w-full h-72"> 
          <img className="w-full h-72 object-cover" src={coverImage} alt="Cover"/>
        </div>
      </section>

      <section id="CoffeOrder" className="flex flex-col lg:container lg:mx-auto lg:flex-row ">
        <div className="items-center">
          <div className="order-1 flex flex-col gap-8 px-5 py-8 my-6 text-black bg-white rounded-lg shadow-md lg:w-[700px] md:flex-row md:h-28 lg:justify-between md:items-center">
            {/* Profile Section */}
            <div className="flex justify-center py-8 lg:hidden">
              <div className="relative w-[50px] h-[50px] items-center justify-center hidden lg:block">
                <div className="absolute w-[50px] h-[50px] bg-[#89A9EF] rounded-full"></div>
                <img className="relative w-[35px] h-[35px]" src={defaultProfileImage} alt="Profile" />
              </div>
            </div>

            <div className="flex items-center justify-between w-full lg:py-8">
              <div className="flex gap-1 lg:gap-4">
                <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                  <div className="absolute w-[60px] h-[60px] bg-[#89A9EF] rounded-full"></div>
                  <img className="relative w-[40px] h-[40px]" src={defaultProfileImage} alt="Profile" />
                </div>
                <div className='w-[5px]'></div>
                <div className="flex flex-col gap-2 lg:w-full">
                  <p className="text-[16px] font-bold text-[#353535] md:text-2xl">
                    Hi, I'm {recipientName}
                  </p>
                  <p className="text-[14px] text-[#353535] md:text-xl">
                  {window.location.origin+"/"+recipientName}
                  </p>
                </div>
              </div>

              <div onClick={()=>{copyToClipboardDonatePage();}} className="hidden md:flex">
                <div className="flex gap-3 items-center hover:bg-[#E56E38] bg-[#353535] text-[14px] text-white py-[10px] px-4 rounded-2xl cursor-pointer ml-auto">
                {copyPageStatus ? "Copied!" : "Share Page"}
                  <div className="font-bold ti-link text-white"><FaRegShareSquare /></div>
                </div>
              </div>
            </div>
            <div className='h-[20px]'></div>
            <div onClick={()=>{copyToClipboardDonatePage();}} className="md:hidden">
              <div className="flex justify-center gap-1 hover:bg-[#E56E38] bg-[#353535] text-[14px] text-white py-[10px] px-4 rounded-2xl cursor-pointer items-center">
                {copyPageStatus ? "Copied!" : "Share Page"}
                <div className="font-bold ti-link text-white"><FaRegShareSquare /></div>
              </div>
            </div>
          </div>

          <div className="order-2 md:hidden md:mx-auto flex flex-col gap-5 px-5 py-8 mx-5 my-6 bg-white shadow-lg rounded-xl md:w-[700px] lg:w-[400px] h-[500px]">
            <h2 className="text-lg font-semibold">Buy {recipientName} a Coffee</h2>
            <form action="" method="post" className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-4 py-4 border rounded-lg">
                <img className="w-10" src={defaultProfileImage} alt="Profile" />
                <span className="">X</span>
                <div id="qty" className="flex gap-2">
                  <div className="relative flex items-center justify-center w-10 h-10 border border-solid rounded-full focus-within:border-black focus-within:bg-[#E5E5E5]">
                    <span className="text-sm font-bold">1</span>
                    <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value="1" checked={amountOfCup === 1} onChange={() => setAmountOfCup(1)} />
                  </div>
                  <div className="relative flex items-center justify-center w-10 h-10 border border-solid rounded-full focus-within:border-black focus-within:bg-[#E5E5E5]">
                    <span className="text-sm font-bold">2</span>
                    <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value="2" checked={amountOfCup === 2} onChange={() => setAmountOfCup(2)} />
                  </div>
                  <div className="relative flex items-center justify-center w-10 h-10 border border-solid rounded-full focus-within:border-black focus-within:bg-[#E5E5E5]">
                    <span className="text-sm font-bold">3</span>
                    <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value="3" checked={amountOfCup === 3} onChange={() => setAmountOfCup(3)} />
                  </div>
                  <input className="focus:outline-none focus:ring-2 focus:ring-[#31363F] relative flex items-center justify-center w-12 h-10 pl-3.5 border border-solid rounded-xl indeterminate:border-black focus-within:bg-[#E5E5E5]" type="number" min="1" max="1000" placeholder="10" onChange={handleAmountChange} value={amountOfCup.toString()} />
                </div>
              </div>
              <input onChange={(donorName)=>setDonorName(donorName.target.value)} className="   focus:outline-none focus:ring-0 w-full px-3 py-4 rounded-lg bg-[#ebe9e9] placeholder-[#a5a5a5]" type="text" name="" placeholder="Name" id="" />
            <input  onChange={(message)=>setMessage(message.target.value)} className="   focus:outline-none focus:ring-0 w-full px-3 py-4 rounded-lg bg-[#ebe9e9] placeholder-[#a5a5a5]" placeholder="Say something nice!" name="" id=""></input>
              {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
            <button
                    onClick={async () => {
                      if (isSuccess) {
                        setErrorMessage('');
                        setSuccessMessage('');
                        setIsSuccess(false);
                      }
                       else {
                        setSendLoading(true);
                        await sendDonate();
                        setSendLoading(false);
                      }
                    }}
                    disabled={sendLoading}
                    className="focus:outline-none focus:ring-0 bg-[#353535] py-2 px-4  text-white  rounded-xl hover:bg-[#E56E38] font-bold  text-center disabled:bg-gray-400"
                    // type="submit"
                  >
                      {sendLoading ? (
                        <>Loading...</>
                      ) : (
                        isSuccess ? (
                          'Okay'
                        ) : (
                          `Support ${amountOfCup * 0.005} ETH`
                        )
                      )}
                    </button>
            </form>
          </div>

          <div className="px-5 pb-10 bg-white rounded-xl shadow-lg lg:px-7 items-center lg:w-[700px]">
            <div className='h-[40px]'></div>
            <div>
              <h2 className="text-3xl font-bold text-[#353535] text-center">{currentDonations.length == 0 ? "Don't have any supporter yet"  : "Supporter" }</h2>
              <section className="py-6 mx-4 bg-white">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-1 items-center">
                {  currentDonations.map((donation, index) => (
                            <div key={index} className="flex flex-col gap-3 px-6 py-6 mx-4 border border-gray-300 rounded-md bg-gray-50 h-72">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1 lg:gap-4">
                                            {/* place some profile picture here when it's ready with this feature */}
                                            <div className="flex flex-col">
                                                <p className="text-xl font-bold text-[#353535]">{donation.donorName == "" ? "Unknown" : donation.donorName}</p>
                                                <div className="flex gap-1 items-center">
                                                    <p className='text-[#353535]'>{formatAddress(donation.donor)}</p>
                                                    <button onClick={()=>{copyToClipboardAddress(donation.donor, index);}}> {copyDonatorAddressStatus && index == selectedIndexDonatorAddress ? < FaCheckSquare className='text-[#353535] text-[12px]' /> :  <IoCopyOutline className='text-[#353535] text-[12px]' />}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-xl font-bold text-[#353535]">{parseInt(ethers.formatEther(donation.amount) / 0.00495).toFixed(0)}</p>
                                        </div>
                                    </div>
                                    <img className="relative w-[30px] h-[30px]" src={defaultProfileImage} alt="Profile" />
                                </div>
                                <p className="text-[12px] font-medium text-[#353535]">{parseFloat(ethers.formatEther(donation.amount)).toFixed(4)} ETH</p>
                                <p className="text-sm text text-[#353535]">{donation.message == "" ? "No Message" : donation.message }</p>
                            </div>
                        ))}
                </div>

                <div className="flex justify-center mt-4">
                        {currentPage > 0 && (
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 text-white bg-[#353535] rounded-2xl hover:bg-[#E56E38]"
                            >
                                Previous
                            </button>
                        )}
                        <div className='w-[10px]'></div>
                        {startIndex + donationsPerPage < donations.length && (
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 text-white bg-[#353535] rounded-2xl hover:bg-[#E56E38]"
                            >
                                Next
                            </button>
                        )}
                    </div>
              </section>
      
            </div>
            
          </div>
        </div>

        <div className='w-[20px]'></div>

        <div className="order-2 md:flex md:mx-auto hidden flex-col gap-5 px-5 py-8 mx-5 my-6 bg-white shadow-lg rounded-xl md:w-[700px] lg:w-[400px] h-[500px]">
          <h2 className="text-lg font-semibold">Buy {recipientName} a Coffee</h2>
          <form  className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 py-4 border rounded-lg">
              <img className="w-10" src={defaultProfileImage} alt="Profile" />
              <span className="">X</span>
              <div id="qty" className="flex gap-2">
                <div className="relative flex items-center justify-center w-10 h-10 border border-solid rounded-full focus-within:border-black focus-within:bg-[#E5E5E5]">
                  <span className="text-sm font-bold">1</span>
                  <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value="1" checked={amountOfCup === 1} onChange={() => setAmountOfCup(1)} />
                </div>
                <div className="relative flex items-center justify-center w-10 h-10 border border-solid rounded-full focus-within:border-black focus-within:bg-[#E5E5E5]">
                  <span className="text-sm font-bold">2</span>
                  <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value="2" checked={amountOfCup === 2} onChange={() => setAmountOfCup(2)} />
                </div>
                <div className="relative flex items-center justify-center w-10 h-10 border border-solid rounded-full focus-within:border-black focus-within:bg-[#E5E5E5]">
                  <span className="text-sm font-bold">3</span>
                  <input type="radio" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" value="3" checked={amountOfCup === 3} onChange={() => setAmountOfCup(3)} />
                </div>
                <input className="focus:outline-none focus:ring-2 focus:ring-[#31363F] relative flex items-center justify-center w-12 h-10 pl-3.5 border border-solid rounded-xl indeterminate:border-black focus-within:bg-[#E5E5E5]" type="number" min="1" max="1000" placeholder="10" onChange={handleAmountChange} value={amountOfCup} />
              </div>

              
            </div>
       
            <input onChange={(donorName)=>setDonorName(donorName.target.value)} className="   focus:outline-none focus:ring-0 w-full px-3 py-4 rounded-lg bg-[#ebe9e9] placeholder-[#a5a5a5]" type="text" name="" placeholder="Name" id="" />
            <input  onChange={(message)=>setMessage(message.target.value)} className="   focus:outline-none focus:ring-0 w-full px-3 py-4 rounded-lg bg-[#ebe9e9] placeholder-[#a5a5a5]" placeholder="Say something nice!" name="" id=""></input>
            {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
            <button
  onClick={async () => {
    if (isSuccess) {
      setErrorMessage('');
      setSuccessMessage('');
      setIsSuccess(false);
     
    } 
    else {
      setSendLoading(true);
      await sendDonate();
      setSendLoading(false);
    }
  }}
  disabled={sendLoading}
  className="focus:outline-none focus:ring-0 bg-[#353535] py-2 px-4  text-white  rounded-xl hover:bg-[#E56E38] font-bold  text-center disabled:bg-gray-400"
  // type="submit"
>
  {sendLoading ? (
    <>Loading...</>
  ) : (
    isSuccess ? (
      'Okay'
    ) : (
      `Support ${amountOfCup * 0.005} ETH`
    )
  )}
</button>

            
          </form>
        </div>
      </section>
      <div className='h-[80px]'></div>
    </div>
  );
}

export default DonateSection1;
