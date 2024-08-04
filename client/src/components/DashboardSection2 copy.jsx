import React from 'react'

function DashboardSection2Copy() {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p><strong>Your Address:</strong> {userAddress}</p>
    <button onClick={handleWithdraw} className="bg-green-500 text-white p-2 w-full mb-4">Withdraw</button>
    <div>
      {donations.map((donation, index) => (
        <div key={index} className="border p-4 mb-2">
          <p><strong>Donor:</strong> {donation.donorName}</p>
          <p><strong>Message:</strong> {donation.message}</p>
          <p><strong>Amount:</strong> {ethers.formatEther(donation.amount)} ETH</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default DashboardSection2Copy