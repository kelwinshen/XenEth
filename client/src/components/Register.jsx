import React, { useState } from 'react';
import { registerUser, getUserInfo } from '../ethFunctions';
import { IoClose } from "react-icons/io5";

const RegisterPopup = ({ isRegisterPopupOpen, onClose, setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSuccess, setIsSuccess] = useState(false); // State for success

  const handleRegister = async () => {
    try {
      await registerUser(username);
      setSuccessMessage('Registration successful! ✅');
      const {userInfo} = await getUserInfo();
      setUserInfo(userInfo);
      setErrorMessage(''); // Clear any existing error messages
      setIsSuccess(true); // Set success state to true
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('There was an error registering the user.');
      setSuccessMessage(''); // Clear any existing success messages
    }
  };

  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(username);
  };

  if (!isRegisterPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="mx-5">
        <div className="container flex flex-col md:w-[400px] w-[300px] px-8 py-8 mx-auto bg-white rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium text-[#353535]">Create Your Page</h1>
            <button onClick={()=>{  setUsername('');
                setErrorMessage('');
                setSuccessMessage('');
                setIsSuccess(false);
                onClose();}}>
              <IoClose className='text-[#353535] text-2xl' />
            </button>
          </div>
          <div className="flex flex-col">
            {!isSuccess ? (
              <>
                <div className='h-[10px]'></div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    readOnly= {registerLoading}
                    onChange={(e) => {
                    setErrorMessage('')
                      const newValue = e.target.value.toLowerCase();
                      if (isValidUsername(newValue)) {
                        setUsername(newValue);
                        setErrorMessage(''); // Clear error message if input is valid
                      } else {
                        setErrorMessage('Username can only contain letters and numbers.');
                      }
                    }}
                    
                    className={` mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${registerLoading?'hover:border-gray-300 text-gray-500' : 'hover:border-[#E56E38] text-[#353535]' } sm:text-sm` }
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
                setUsername('');
                setErrorMessage('');
                setSuccessMessage('');
                setIsSuccess(false);
                onClose(); // Close the popup if registration is successful
              } else {
                if (username) {
                  setRegisterLoading(true);
                  await handleRegister();
                  setRegisterLoading(false);
                } else {
                  setErrorMessage('Username cannot be blank.');
                }
              }
            }}
            className="w-full bg-[#353535] text-white py-2 px-4 rounded-md hover:bg-[#E56E38] disabled:bg-gray-400"
            disabled={registerLoading}
          >
            {registerLoading ? (
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

export default RegisterPopup;
