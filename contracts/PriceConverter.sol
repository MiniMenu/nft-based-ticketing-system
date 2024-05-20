// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @title A contract to convert USD to Matic using Chainlink Price Feed 
/// @author Minal Abayasekara
contract PriceConverter {

   /// @notice MATIC / USD Feed contract address
   address immutable internal priceFeedAddress = 0x001382149eBa3441043c1c66972b4772963f5D43;
   /// @notice Interface to retrieve the feed 
   AggregatorV3Interface internal priceFeed;
 
    /// @notice Create the interface object by pointing to the proxy address
    constructor(){
       priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /// @notice Retrieve the latest round
    /// @return Returns the latest round 
    function getChainlinkDataFeedLatestAnswer() internal    view returns (int) {
        (
            /*uint80 roundID*/, 
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }

    /// @notice Convert the USD price of ticket to Matic
    /// @param _ticketPrice The ticket price in USD
    /// @return The ticket price in Matic
    function convertUsdToMatic(uint256 _ticketPrice) external view returns (uint256) {
         uint256 precision = 1 * 10 ** 18;
         uint256 price = uint(getChainlinkDataFeedLatestAnswer());
         uint256 costPerTicketInMatic = SafeMath.mul(SafeMath.div(precision, price), SafeMath.mul(_ticketPrice, 100000000));
         return costPerTicketInMatic;
    } 
}