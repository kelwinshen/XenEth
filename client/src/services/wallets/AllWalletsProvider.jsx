import { MetamaskContextProvider } from "../../contexts/MetamaskContext";
import { MetaMaskClient } from "./metamask/metamaskClient";

export const AllWalletsProvider = (props) => {
  return (
    <MetamaskContextProvider>
        <MetaMaskClient />
        {props.children}
    </MetamaskContextProvider>
  );
};
