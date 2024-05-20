import "./globals.css";
import Web3StateProvider from './context/Web3StateProvider';
import Header from './components/Header/page';
import Footer from "./components/Footer/page";

export default function RootLayout({ children }) {
 
  return (    
    <html lang="en">
      <body>
          <Web3StateProvider>
              <Header />
    
                    {children}  
                 
              <Footer />      
          </Web3StateProvider>
      </body>      
    </html>
  );
}
