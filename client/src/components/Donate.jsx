import React, { useState } from 'react';
import { donate } from '../ethFunctions';

function Donate() {
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    await donate(recipientId, message, donorName, amount);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Donate</h1>
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="Your Name"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-4"
      ></textarea>
      <button onClick={handleDonate} className="bg-blue-500 text-white p-2 w-full">Donate</button>
    </div>
  );
}

export default Donate;
