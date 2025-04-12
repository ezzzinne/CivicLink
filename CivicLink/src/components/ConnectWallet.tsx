import { useState } from 'react';
import { ethers } from 'ethers';

  const WalletConnectButton = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  return (
    <div>
      {address ? (
        <p className="wallet-connected">✔️ Wallet Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
      ) : (
        <button className="connect-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
