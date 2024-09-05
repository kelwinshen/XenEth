import React, { useState } from 'react';
import { useWalletInterface } from '../services/wallets/useWalletInterface';


function ChangeName() {
  const { walletInterface } = useWalletInterface(); 
  const [oldName, setOldName] = useState('');
  const [newName, setNewName] = useState('');

  const handleChangeName = async () => {
    await walletInterface.changeUserName(oldName, newName);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Change Name</h1>
      <input
        type="text"
        placeholder="Old Name"
        value={oldName}
        onChange={(e) => setOldName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="New Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleChangeName} className="bg-blue-500 text-white p-2 w-full">Change Name</button>
    </div>
  );
}

export default ChangeName;
