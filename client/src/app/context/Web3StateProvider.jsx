
'use client'
import { useState, useEffect } from 'react';
import {getWeb3State} from '../utils/web3State';
import { handleAccountChange } from '../utils/handleAccountChange';
import { handleChainChange } from '../utils/handleChainChange';
import {Web3Context} from '../context/Web3Context';
import PropTypes from 'prop-types';

const Web3StateProvider = ({children}) => {
    const [web3State, setWeb3State] = useState({
        contractInstance: null,
        chainId: null,
        selectedAccount: null
    })
 
  const handleWallet = async() =>{
    try {
      const  { contractInstance, chainId, selectedAccount } = await getWeb3State();
      setWeb3State({contractInstance,chainId,selectedAccount});
    } catch (error) {
      console.error("Wallet connection failed", error.message);
    }
  }

  useEffect(()=>{
    if (window.ethereum) {
    window.ethereum.on('accountsChanged',()=>handleAccountChange(setWeb3State))
    window.ethereum.on('chainChanged',()=>handleChainChange(setWeb3State))
    
    return()=>{
        window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
        window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
    }} else {
      console.log("Wallet is not installed");
    }
  },[])

  return (
    <div>
        <Web3Context.Provider  value={{web3State, handleWallet}}>
          {children}
        </Web3Context.Provider>
    </div>
  )
}
Web3StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export default Web3StateProvider