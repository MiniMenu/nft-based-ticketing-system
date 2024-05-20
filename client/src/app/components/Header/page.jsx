'use client';

import {useWeb3Context} from '../../context/useWeb3Context';
import logoImage from '../../../../public/images/Dynatick.png';

const Header = () => {
  const {web3State} = useWeb3Context();
  const {selectedAccount} = web3State;

  return (
      <header>
            <nav className="bg-blue">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  <a className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img src={logoImage.src} className="h-8" alt="TicketVerse Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap text-color-red pt-4">Tokenize The Unforgettable</span>
                  </a>
                  <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                   <div 
                    className="text-lg font-normal text-gray-300 text-color-red">{!selectedAccount? "Please connect to the Wallet": selectedAccount}</div>                          
                  </div>
                </div>
              </nav>
      </header>
  )
}

export default Header