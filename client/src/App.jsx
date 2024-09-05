import Footer from './components/Footer';
import { AllWalletsProvider } from './services/wallets/AllWalletsProvider';
import AppRouter from './AppRouter';
import BodyHolder from './subcomponents/BodyHolder';
import { useState, useEffect } from 'react';
import { useWalletInterface } from './services/wallets/useWalletInterface';

function App() {
  return (
    <AllWalletsProvider>
      <AppContent />
    </AllWalletsProvider>
  );
}

export default App;

export function AppContent() {
  const { walletInterface } = useWalletInterface();  // Call the hook directly in the component
  const [walletOpen, setWalletOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (walletInterface) {  // Check if walletInterface is available
        try {
          const {userInfo} = await walletInterface.getUserInfo();  // Fetch user info asynchronously
          setUserInfo(userInfo);
        } catch (error) {
          // console.error("Error fetching user info:", error);
        }
      } else {
        // console.warn("walletInterface is not available yet.");
      }
    };

    fetchUserInfo();
  }, [walletInterface]);  // Only run when walletInterface is available

  return (
    <>
      <BodyHolder>
        <AppRouter
          setWalletOpen={setWalletOpen}
          walletOpen={walletOpen}
          setIsRegisterPopupOpen={setIsRegisterPopupOpen}
          setIsEditPopupOpen={setIsEditPopupOpen}
          userInfo={userInfo}
          isRegisterPopupOpen={isRegisterPopupOpen}
          isEditPopupOpen={isEditPopupOpen}
          setUserInfo={setUserInfo}
        />
      </BodyHolder>
      <Footer />
    </>
  );
}
