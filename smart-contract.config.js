import { ethers } from 'ethers';

import Library from './src/utils/Library.json';

const contractABI  = Library.abi;
const LIBRARY_CONTRACT_ADDRESS = "0x207B330Ba89e9b5CEfbc55A223D4Cb5Ab092D774";
const contractAddress = LIBRARY_CONTRACT_ADDRESS;

const getContract = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, contractABI, signer);
    }
    throw new Error("Please install MetaMask!");
  };

export {
    contractABI,
    contractAddress,
    getContract
};