import React from 'react';

function AppBar({ children }) {
  return (
    <div className='fixed w-full z-50'>
      {children}
    </div>
  );
}

export default AppBar;
