# Dynatick -  Dynamic NFT Ticketing 

* [Presentation](https://docs.google.com/presentation/d/16gAAQqnAwrH93gdW6DVva1t1zjGjvukV337FD2Gg678/edit?usp=sharing)
* [Video Presentation](https://www.youtube.com/watch?v=GQLGRHbN2H0)
  
## Installation

To run the project in localhost 
 * please clone the repository
 * follow the README instructions.

Installation guides

 * Blockchain (Smart Contract): [README](https://github.com/MiniMenu/nft-based-ticketing-system/blob/main/contracts/README.md)
 * Front-end (Client): [README](https://github.com/MiniMenu/nft-based-ticketing-system/blob/main/client/README.md)

## Inspiration

After attending the Chainlink Bootcamp (2024) for the Block Magic Hackathon and learning about Dynamic NFTs, especially the Dynamic LaMelo Ball NFTs, I was inspired to apply the concept of Dynamic NFTs to the ticketing industry. I saw the potential for the dNFTs to revolutionize the ticketing experience and decided to embark on the project.

Event tickets are an integral part of any successful event. It ensures security, manages attendance, and offers a memorable souvenir for the attendees. However, with the advancement of digitalization, we've sacrificed the sentimental value and personalized experience of traditional paper-based tickets. Imagine if we could combine the top-notch security of blockchain and the convenience of digital tickets with the same nostalgic elements of conventional tickets, providing attendees with a truly memorable keepsake.
I believe dNFT could achieve this with the help of Chainlink services.

To define the scope and parameters, I have made a few assumptions that will be considered throughout the development process. These assumptions are intended to simplify the project's scope and serve as a basis for further development.

Assumptions:
  1. The event will be a football match
  2. The event will be a single-day event 
  3. Each wallet/buyer will purchase only one ticket
  4. This project will not consider the scenario of ticket resale.
  5. This project will focus on physical, in-person events and will not consider virtual events.
     
The ticketing experience is multifaceted, but due to the time constraints, I have focused on the following scenarios in this project.

  1. Ticket Purchase and Minting: This feature will provide a seamless user experience for customers purchasing tickets, including the 
    ability to mint the NFT after the payment is confirmed.
  2. NFT Dynamic Updates: After the event has concluded, the NFT ticket will update dynamically to display the score of the event, providing 
    a unique souvenir for attendees.

## What it does

![Image Title](https://github.com/MiniMenu/nft-based-ticketing-system/blob/main/client/public/images/Hackathon.jpg)

Tickets: 
  * [Normal Ticket](https://ipfs.io/ipfs/QmPuo9Bxfhwbf7t7RkdBJwP6WDMGht5Bat8bzYz5S8ktWu?filename=FootBallTicket.jpeg)
  * [Exclusive Ticket](https://ipfs.io/ipfs/bafybeid6yni6xppmwua6wky27cubjkcn4jbswqdhhbmkcuegarvphz3744?filename=exclusiveArtwork.png)

### Blockchain (Smart Contracts)

``` Ticket.sol ``` - 
    The main smart contract in this project serves as the primary facilitator for all transactions, managing the minting and updating of NFTs, as well as the conversion of USD to Matic for payments. The smart contract utilized in this project includes two helper contracts: 
    
* ``` PriceConverter.sol ``` - This contract leverages Chainlink Price Feeds to fetch the current USD/Matic price and convert the specified USD amount into Matic for the transaction.
* ``` MetaDataGenerator.sol ``` - This contract houses the metadata for the NFTs, including dynamic information such as ticket number and score.

During the NFT minting process, Chainlink VRF is used to randomly generate two words, which are then combined using an XOR operation to produce a single random number. If this number is 7, the NFT is assigned an exclusive ticket.

``` AfterTheMatch.sol ``` - 
     The dynamic NFT update process is initiated by a smart contract that triggers an update of the NFT metadata with the final score after the event. This is achieved by utilizing Chainlink Automation, which sets a timer corresponding to the duration of the match. After this timer expires, Chainlink Functions retrieves the score data from the SportsMonk API. The contract then triggers the Update metadata function in the Ticket.sol smart contract, updating the NFT metadata with the score data.

### Front-end

For this project, I developed a front-end interface for only Scenario 1, which provides a simple and user-friendly way to access event information, process payments, and mint NFTs for successful transactions.

The user interface displays a summary of the event's details, followed by a 'Connect Wallet' button. Upon clicking this button, if a wallet is detected, it will be connected and the connected wallet address will be displayed in the header. Upon clicking 'Buy Ticket,' the specified amount is converted from USD to Matic, and the transaction is processed. Once the payment is successful, a 'Complete Transaction' button appears, triggering the minting of an NFT associated with the event.

This entire process is enabled by the communication between the front-end and back-end through the use of the Ethers.js library.

## How I built it

This project started as a group project but ended up as a solo project due to unavoidable circumstances. It has been a month full of challenges, opportunities, and growth, as this was my first hackathon and the first solo web3 project. I want to express my sincere gratitude to the Chainlink Discord Moderators and Developers who offered support and guidance throughout this process. Their assistance was invaluable in helping me overcome difficulties and achieve a successful outcome.

Front-end

For the front-end development, I utilized Next.js, a popular JavaScript framework that provides server-side rendering and other features for building dynamic web applications. On the back end, I employed Ethers.js, a lightweight and user-friendly library for interacting with Ethereum smart contracts. This allowed me to effectively integrate the front-end and smart contracts to provide a seamless user experience for ticket purchasing and dynamic updates.

Blockchain(Smart Contract)

For smart contract development, I used Solidity, a popular programming language specifically designed for writing smart contracts on Ethereum-based networks. The contracts were deployed to the Polygon Amoy Testnet, allowing me to test and debug the functionality without the need for real-world tokens. Throughout this process, I relied on Remix IDE, a browser-based integrated development environment for Solidity, which facilitated efficient testing and deployment of the contracts.

Chainlink Services utlilzed:
  * Chainlink Price Feed
  * Chainlink VRF
  * Chainlink Functions
  * Chainlink Automation.

## Challenges

This project was challenging as it was my first web3 project utilizing Chainlink products. The Blackmagic Bootcamp was invaluable in getting me started, but the most challenging part was resolving callback gas errors from both VRF and Functions. Navigating this complex technical terrain required persistence and critical thinking, ultimately helping me grow as a developer.

In addition to the above challenge, another challenge was effectively retrieving data from the Sportsmonk API using Chainlink Functions. This involved resolving CORS errors, which required a thorough understanding of cross-origin resource sharing and the implementation of appropriate solutions to ensure successful data retrieval.

Using Next.js for the front-end development introduced another layer of complexity to this project, as it was an unfamiliar framework for me. Despite this initial challenge, I was able to gain enough knowledge in Next.js and leverage its features to develop a clean and responsive user interface that effectively integrated with the smart contract.

## Accomplishment

Throughout the development of Dynatick, I gained hands-on experience working with cutting-edge technologies such as IPFS, Pinata, and dynamic NFTs. Specifically, I learned how to upload artwork to IPFS using Pinata, mint NFTs with custom metadata, and implement a dynamic NFT update function triggered by specific events.

My experience with Dynatick also provided me with practical knowledge of Chainlink's products, including its Verifiable Random Function (VRF) and Oracle services. I learned how to integrate these services into my smart contracts, enabling secure and reliable data retrieval and randomness generation, essential for the dynamic NFT update function and other key features of Dynatick.

I had the opportunity to gain hands-on experience with Next.js. This allowed me to build a dynamic and responsive user interface giving me practical knowledge of modern front-end technologies and techniques.

## What I learned

NFTs - This experience provided an excellent opportunity for me to gain a deeper understanding of NFTs and the intricacies of their metadata and dynamic features. Through my research, I was able to effectively apply the ERC-721 standard for minting and dynamically updating NFTs to provide attendees with a unique and personalized keepsake of their event experience.

Chainlink Products - Before this project, I had limited knowledge of Chainlink's offerings. However, the Chainlink Bootcamp was instrumental in helping me understand the various products and how they could be applied to solve real-world problems. This knowledge allowed me to utilize Chainlink's oracles and services in my development, providing a more robust and secure solution for the project.

NextJs - In the pursuit of a versatile front-end framework, I chose Next.js, which was a new technology for me. Through the course of this project, I familiarized myself with its features and capabilities, ultimately creating a clean, user-friendly interface that effectively integrated with the back end. I'm delighted to have gained knowledge in this area and to have utilized it in the development of this project.

## What's next for Dynatick

Since Dynatick was for the Hackathon, it only addresses scenarios in the ticketing industry, it demonstrates the potential for NFT-based ticketing solutions to provide a secure, engaging, and personalized experience for attendees. With further development and refinement, this solution could be implemented on a wider scale and offer event organizers and attendees a more comprehensive ticketing experience. 

To develop Dynatick into a more comprehensive solution, the following steps and features will be considered in the next phase of development:

* Scenario Research: Conduct further research to identify and address additional scenarios and requirements for comprehensive ticketing solutions.
* Feature Expansion: Developing additional functionality, including resale, covering more events and multi-ticket purchase options, to further enhance the ticketing experience for both customers and event organizers.
* Front end: To enhance the user experience and provide a more polished interface, the front end of Dynatick will undergo a redesign and optimization process. This will include utilizing modern web development techniques, such as responsive design and progressive web apps, to deliver an intuitive and seamless experience for customers and event organizers
* Smart Contracts: To improve the efficiency and performance of Dynatick's smart contracts, I will utilize a framework such as Foundry, which can help simplify contract development, testing, and debugging. Furthermore, each smart contract will be deconstructed and rewritten with a focus on optimizing gas usage, enabling the system to run more efficiently and economically.
* Monetization: To ensure the commercial viability and scalability of Dynatick, a thorough monetization strategy will be developed. This will include identifying and exploring various revenue streams, such as service fees, data monetization, and potential partnerships, to ensure long-term profitability and growth. 
