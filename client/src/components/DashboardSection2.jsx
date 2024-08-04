import React from 'react';
import {ethers} from 'ethers';

function DashboardSection2({userAddress, setUserAddress, state, setState, userInfo, setUserInfo , donations}) {
  return (
    <div className='mx-[5%]'>
            <h2 className="text-3xl font-bold text-white">Reward from your Supporter</h2>
    <div>
    <div>
      {donations.map((donation, index) => (
        <div key={index} className="border p-4 mb-2">
          <p><strong>Name:</strong> {donation.donorName}</p>
          <p><strong>Address:</strong> {donation.donor}</p>
          <p><strong>Message:</strong> {donation.message}</p>
          <p><strong>Amount:</strong> {parseFloat(ethers.formatEther(donation.amount)).toFixed(5)} ETH</p>

        </div>
      ))}
    </div>
    </div>
          </div>
  )
}

export default DashboardSection2