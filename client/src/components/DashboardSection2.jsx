import React, { useState } from 'react';
import { ethers } from 'ethers';
import defaultProfileImage from '../assets/xeneth.png';
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import {  FaCheckSquare } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

function DashboardSection2({  userInfo, setUserInfo, donations }) {
    const { accountId, walletInterface } = useWalletInterface();
    const [currentPage, setCurrentPage] = useState(0);
    const donationsPerPage = 8;

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

    const copyToClipboardAddress = async (address, index) => {
        setSelectedIndexDonatorAddress(index);
        const textToCopy = "https://sepolia.etherscan.io/address/"+address;
        await navigator.clipboard.writeText(textToCopy)
        setCopyDonatorAddressStatus(true);
    
          setTimeout(() => setCopyDonatorAddressStatus(false), 3000); 
      };

    const startIndex = currentPage * donationsPerPage;
    const currentDonations =  donations.slice(startIndex, startIndex + donationsPerPage);
    const [copyDonatorAddressStatus, setCopyDonatorAddressStatus] = useState(false);
    const [selectedIndexDonatorAddress, setSelectedIndexDonatorAddress] = useState(0);

    return (
        (walletInterface!=null &&  userInfo && donations.length > 0) ?  
        <div>
        <div className="px-5 pb-10 bg-white rounded-3xl shadow-lg lg:px-7 mx-[5%] items-center">
            <div className='h-[40px]'></div>
       
            <div>
                <h2 className="text-3xl font-bold text-[#353535] text-center">Reward from your Supporter</h2>
                <section className="py-6 mx-4 bg-white">
        
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-2 items-center">
                        {currentDonations.map((donation, index) => (
                            <div key={index} className="flex flex-col gap-3 px-6 py-6 mx-4 border border-gray-300 rounded-md bg-gray-50 h-72">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1 lg:gap-4">
                                            {/* place some profile picture here when it's ready with this feature */}
                                            <div className="flex flex-col">
                                                <p className="text-xl font-bold text-[#353535]">{donation.donorName}</p>
                                                <div className="flex gap-1 items-center">
                                                    <p className='text-[#353535]'>{formatAddress(donation.donor)}</p>
                                                    
                                                    <button onClick={()=>{copyToClipboardAddress(donation.donor, index)}}>{copyDonatorAddressStatus && index == selectedIndexDonatorAddress ? < FaCheckSquare className='text-[#353535] text-[12px]' /> :  <IoCopyOutline className='text-[#353535] text-[12px]' />}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-xl font-bold text-[#353535]">{parseInt(ethers.formatEther(donation.amount) / 0.005).toFixed(0)}</p>
                                        </div>
                                    </div>
                                    <img className="relative w-[30px] h-[30px]" src={defaultProfileImage} alt="Profile" />
                                </div>
                                <p className="text-[12px] font-medium text-[#353535]">{parseFloat(ethers.formatEther(donation.amount)).toFixed(4)} ETH</p>
                                <p className="text-sm text text-[#353535]">{donation.message}</p>
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
        <div className='h-[60px]'></div>     
        </div>
    :  null   );
}

export default DashboardSection2;
