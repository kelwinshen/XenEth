import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate"; // Assuming you still want to use this component for handling the ID
import Header from "./components/Header";

const AppRouter = ({
  setWalletOpen,
  walletOpen,
  setIsRegisterPopupOpen,
  setIsEditPopupOpen,
  isRegisterPopupOpen,
  userInfo,
  isEditPopupOpen,
  setUserInfo,
}) => {
  return (
    <Router>
      <Header
        setWalletOpen={setWalletOpen}
        walletOpen={walletOpen}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        setIsEditPopupOpen={setIsEditPopupOpen}
        userInfo={userInfo}
        isRegisterPopupOpen={isRegisterPopupOpen}
        isEditPopupOpen={isEditPopupOpen}
        setUserInfo={setUserInfo}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setWalletOpen={setWalletOpen}
              walletOpen={walletOpen}
              setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              setIsEditPopupOpen={setIsEditPopupOpen}
              userInfo={userInfo}
              isRegisterPopupOpen={isRegisterPopupOpen}
              isEditPopupOpen={isEditPopupOpen}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setWalletOpen={setWalletOpen}
              walletOpen={walletOpen}
              setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              setIsEditPopupOpen={setIsEditPopupOpen}
              userInfo={userInfo}
              isRegisterPopupOpen={isRegisterPopupOpen}
              isEditPopupOpen={isEditPopupOpen}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/:recipientId"
          element={
            <Donate
              setWalletOpen={setWalletOpen}
              walletOpen={walletOpen}
              setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              setIsEditPopupOpen={setIsEditPopupOpen}
              userInfo={userInfo}
              isRegisterPopupOpen={isRegisterPopupOpen}
              isEditPopupOpen={isEditPopupOpen}
              setUserInfo={setUserInfo}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
