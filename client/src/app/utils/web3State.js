import { ethers } from "ethers";
import abi from "../constants/ABI.json";
/**
 * Creates the contract instance
 * @returns contract instance, selected account and the chain id
 */
export const getWeb3State = async () => {
  let [contractInstance, selectedAccount, chainId] = [null, null, null, null];

  try {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });

    chainId = parseInt(chainIdHex, 16);
    selectedAccount = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Once you deploy the Ticket.sol in remix.. Paste the contract Address over here
    const contractAddress = "0xe4aA7844A7e62EC467784cBb94c2bdF2aad5492D";
    contractInstance = new ethers.Contract(contractAddress, abi, signer);
    return {
      contractInstance,
      chainId,
      selectedAccount,
    };
  } catch (error) {
    console.error("Not able to get the web3 state", error.message);
    throw error;
  }
};
