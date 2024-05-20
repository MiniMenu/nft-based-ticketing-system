// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts@4.6.0/utils/Base64.sol";
import "@openzeppelin/contracts@4.6.0/utils/Strings.sol";

/// @title A contract to manage dynamic NFT meta data generation
/// @author Minal Abayasekara
contract MetaDataGenerator {

       /// @notice This function generates the NFT/ticket's metadata using the belo\w parameters. 
       /// @dev If the random number generator produces a result of 7, the exclusive artwork will be assigned to the NFT.
       /// @param _randomNumber The random number generated using the VRF
       /// @param _tokenId The tokenId of the NFT
       /// @param _score Score of the football event
      function generateMetaData(uint256 _randomNumber,  uint256 _tokenId, string memory _score) pure external returns (string memory){

        string memory ticketImage = "https://ipfs.io/ipfs/QmPuo9Bxfhwbf7t7RkdBJwP6WDMGht5Bat8bzYz5S8ktWu?filename=FootBallTicket.jpeg";
        if (_randomNumber == 7){ 
            ticketImage = "ipfs://bafybeid6yni6xppmwua6wky27cubjkcn4jbswqdhhbmkcuegarvphz3744/";
        }

        string memory newUri = Base64.encode(
                    bytes(
                        string(
                            abi.encodePacked(
                                '{"name": "CSF - Chainlink Superliga FootBall 2024 ",'
                                '"description": "Chainlink Superliga FootBall 2024 - This is a Test NFT for BlockMagic Hackathon",',
                                '"image": "', ticketImage, '",'
                                '"attributes": [',
                                    '{"display_type": "Ticket Number","trait_type": "ticket_number",', '"value": ', Strings.toString(_tokenId) ,'}',
                                    ',{"display_type": "Event Name", "trait_type": "event_name",', '"value": "Superliga"}',
                                    ',{"display_type": "Description", "trait_type": "description",', '"value": "Chainlink Superliga FootBall 2024 - This is a Test NFT for BlockMagic Hackathon"}',
                                    ',{"display_type": "Teams", "trait_type": "teams",', '"value": "Randers vs Viborg"}',
                                    ',{"display_type": "Date", "trait_type": "date",', '"value": "Wednesday, 15 May 2024"}',
                                    ',{"display_type": "Time", "trait_type": "time",', '"value": "4.00 PM"}',
                                    ',{"display_type": "Venue", "trait_type": "venue",', '"value": "Cepheus Park Randers, Viborgvej 92, 8920 Randers, Denmark"}',
                                    ',{"display_type": "Score","trait_type": "score",', '"value": "', _score ,'"}',                           
                                ']}'
                            )
                        )
                    )
                );

        string memory finalTokenURI = string(
             abi.encodePacked("data:application/json;base64,", newUri)
        );

        return finalTokenURI;
      }
}