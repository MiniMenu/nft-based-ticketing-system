//lg:py-56
'use client';
import { ethers } from "ethers";
import {useWeb3Context} from './context/useWeb3Context';
import { useState } from "react";
import backgroundImage from '../../public/images/background.jpg';
import progressGif from '../../public/images/waitingimage.gif'

export default function Home() {
  const {handleWallet, web3State} = useWeb3Context();
  const {selectedAccount, contractInstance} = web3State;

  const [loading, setLoading] =useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const TICKET_PRICE = 20;

 /**
 * This function handles Payment
 */
  let handlePayment = async(e) => {
    e.preventDefault();
    setLoading(true);

      try{
        const convertPrice = await contractInstance.convertUSDToMatic(TICKET_PRICE);
        console.log("USD --> MATIC ", convertPrice);
        // Due to a Gas estimation error, will be using 0.001
        // const amountToSend = ethers.parseUnits(ethers.formatEther( convertPrice.toString() ));
        const amountToSend =  ethers.parseUnits("0.001");
        const options = { value: amountToSend.toString() };
    
         await new Promise((resolve) => {
          resolve(contractInstance.confirmTransaction(selectedAccount, options));
         }).then((transaction)=>{
          console.log(transaction);
          setLoading(false);
          setIsPaid(true);
        });
      }catch(error){
        console.error(error);
        setLoading(false);
      }
  }

/**
 * This function handles NFT minting
 */
  let handleCompleteTransaction = async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
        await new Promise((resolve) => {
          resolve(contractInstance.safeMint(selectedAccount));
        }).then((tx) => {

           console.log(tx);
           setIsPaid(true);
           listenToEvent();  
         
        }).catch(()=>{
          setIsPaid(false);
        });

    } catch(error){
      console.error(error);
      setLoading(false);
    }
  }


/**
 * Listens to the `TransactionComplete` event
 */
  let listenToEvent = async() =>{

     contractInstance.on("TransactionComplete", (tokenId, nftAddress, uniqueNumber, event) => {         
        setTransactionDetails({
          tokenId: parseInt(tokenId),
          nftAddress: nftAddress
        });
        if (uniqueNumber == 7){
          setIsWinner(true);
        }
        setLoading(false); 

        console.log({
            tokenId: tokenId,
            nftAddress: nftAddress,
            uniqueNumber: uniqueNumber,
            data: event
          });
        });  
  }

  return (
    <>
      <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply min-h-screen"
          style={{backgroundImage: "url(" + backgroundImage.src + ")" }}>
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 ">
            <div className="landing-box-background py-5 bg-opacity-10">
              <h3 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-color-white ">Superliga: Randers vs Viborg</h3>
              <p className="mb-8 text-lg font-normal text-gray-300 text-color-red">Cepheus Park Randers, Viborgvej 92, 8920 Randers, Denmark</p>
              <h3 className="mb-4 text-xl font-bold tracking-tight leading-none text-color-white ">Wednesday, 15 May 2024 16:00 onwards</h3>
              <p className="mb-4 text-lg font-normal text-gray-300 text-color-red"> From 20.00 USD</p>
              {!loading ? (
                  <div className="flex space-y-4 flex-row justify-center">
                    {
                      !selectedAccount ? (<button className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base 
                      font-medium text-center rounded-lg border border-red hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                      onClick={handleWallet}>
                          Connect Wallet
                      </button> ):(
                            !isPaid ? 
                           <button className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base 
                              font-medium text-center rounded-lg border border-red hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                              onClick={handlePayment}>
                                  Buy Ticket
                          </button> :                   
                         Object.keys(transactionDetails).length == 0  && (  <button className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base 
                         font-medium text-center rounded-lg border border-red hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                         onClick={handleCompleteTransaction}>
                            Complete Transaction
                         </button> )
                      )
                    }                 
                </div>
              ):
              (
                <div className="flex justify-center items-center">
                    <img src={progressGif.src} alt="processingscreen"  width="250" />
                 </div>
              )}  
              {
                Object.keys(transactionDetails).length > 0  && (
                  <span className="px-4">
                    {
                      isWinner && (
                        <h3 className="text-lg font-bold text-color-red">Congratulations! You have won an exclusive ticket! Thank you for participating and enjoy your special experience.</h3>
                      )
                    }
                    <p className=" text-lg font-normal text-gray-300 text-color-red">Token Id: {transactionDetails.tokenId}</p>
                    <p className="text-lg font-normal text-gray-300 text-color-red">NFT Address: {transactionDetails.nftAddress}</p>
                  </span>        
                 )
              }     
           </div>
        </div>
       </section>
   </>
  );
}
