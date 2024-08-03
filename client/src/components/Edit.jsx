import React, { useState, useEffect } from 'react';
import { changeUserName, getUserInfo } from '../ethFunctions';
import { IoClose } from "react-icons/io5";

const EditPopup = ({ isEditPopupOpen, onClose, userInfo, setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSuccess, setIsSuccess] = useState(false); // State for success


  


  const handleEdit = async (_userInfo) => {
    try {
      await changeUserName(_userInfo, username);
      setSuccessMessage('Edit successful! ✅');
      const {userInfo} = await getUserInfo();
      setUserInfo(userInfo);
      setErrorMessage(''); // Clear any existing error messages
      setIsSuccess(true); // Set success state to true
    } catch (error) {
      console.error('Error editing username:', error);
      setErrorMessage('There was an error editing the user.');
      setSuccessMessage(''); // Clear any existing success messages
    }
  };



  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(username);
  };

  if (!isEditPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="mx-5">
        <div className="container flex flex-col md:w-[400px] w-[300px] px-8 py-8 mx-auto bg-white rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium text-[#353535]">Edit Page</h1>
            <button onClick={()=>{  
                onClose();
                setUsername('');
                setIsSuccess(false);
                setErrorMessage('');
                setSuccessMessage('');
               }}>
              <IoClose className='text-[#353535] text-2xl' />
            </button>
          </div>
          <div className="flex flex-col">
            {!isSuccess ? (
              <>
                <div className='h-[10px]'></div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Current Username</label>
                  <input
                    type="text"
                    value={userInfo}
                    readOnly
                    className="text-gray-500 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">New Username</label>
                  <input
                    type="text"
                    value={username}
                  readOnly= {editLoading}
                    onChange={(e) => {
                      setErrorMessage('')
                      const newValue = e.target.value.toLowerCase();
                      if (isValidUsername(newValue)) {
                        setUsername(newValue);
                        setErrorMessage(''); // Clear error message if input is valid
                      }
                      
                      else {
                        setErrorMessage('Username can only contain letters and numbers.');
                      }
                    }}
                    className={` mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${editLoading?'hover:border-gray-300 text-gray-500' : 'hover:border-[#E56E38] text-[#353535]' } sm:text-sm` }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Page Url</label>
                  <input
                    type="text"
                    value={`xeneth.com/${username.toLowerCase()}`}
                    readOnly
                    className="text-gray-500 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                </div>
                {errorMessage && (
                  <div className="mb-4 text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}
              </>
            ) : (
              <div className="mb-4 text-green-500 text-sm">
                {successMessage}
              </div>
            )}
          </div>
          <div className='h-[10px]'></div>
          <button
            onClick={async () => {
              if (isSuccess) {
                onClose();
                setUsername('');
                setIsSuccess(false);
                setErrorMessage('');
                setSuccessMessage('');
           // Close the popup if edit is successful
              

              } else {
                if (username == userInfo) {
                  setErrorMessage('Nothing changes in your username.');
                
                }  else if (username){
                  setEditLoading(true);
                  await handleEdit(userInfo);

                
                 
                  setEditLoading(false);
                }else {
                  setErrorMessage('Username cannot be blank.');
                }
              }editLoading
            }}
            className="w-full bg-[#353535] text-white py-2 px-4 rounded-md hover:bg-[#E56E38] disabled:bg-gray-400"
            disabled={editLoading}
          >
            {editLoading ? (
              <>
                Loading...
              </>
            ) : (
              isSuccess ? 'Okay' : 'Sign'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
