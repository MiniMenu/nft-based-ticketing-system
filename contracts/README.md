## Smart Contracts 

The Smart Contracts will be deployed on the Polygon Amoy Testnet.

Please use Remix IDE to deploy the contracts.

### Ticket.sol

 * Handles Payments
 * Mint NFT

Chainlink service used: Chainlink VRF

### PriceConverter.sol - A helper contract

 * Convert USD to Matic

 Chainlink service used: Chainlink Price Feed

### MetaDataGenerator.sol - A helper contract

 * Generate the NFT metadata

Contract deployment process in Remix IDE:

```bash
MetaData.sol -> PriceConverter.sol -> Ticket.sol
```

Input needed to deploy Ticket.sol

 * Contract Address of MetaData.sol
 * Contract Address of PriceConverter.sol
 * VRF subscription ID

After the contract has been deployed, please add the contract address as a consumer to the VRF Subscription

### AfterTheMatch.sol

 * Trigger the API to retrieve the score
 * Update the NFT with the score

 Chainlink services: Chainlink Automation and Chainlink Function

 Input needed to deploy AfterTheMatch.sol

 * Contract Address of Ticket.sol
 * Interval for Automation
 * Functions subscription ID

After the contract has been deployed;
* Add the contract address as a consumer to the Functions Subscription
* Register new Upkeep using custom logic and the contract address


