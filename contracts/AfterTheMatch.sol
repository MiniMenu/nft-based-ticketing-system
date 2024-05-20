// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts@1.1.0/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts@1.1.0/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

/// @notice Interface to interact with Ticket.sol
interface TicketInterface {
    function updateMetaData(string memory _score) external;
}

/**
    @title This contract implements chainlink automation to trigger chainlink functions to 
           retrieve the score of the football match and update the NFT metadata. 
    @author Minal Abayasekara
*/
contract TriggerUpdateTicket is AutomationCompatibleInterface, FunctionsClient {
    /**
        @notice This allows the contract to use the FunctionsRequest library's FunctionsRequest.Request.
                 It is used to build a Chainlink Functions request.
    */
    using FunctionsRequest for FunctionsRequest.Request;

    /**
      @notice state variable to check if the function has run.
      @dev This is done to make sure that the function is run only once.
    */
    bool public IsFunctionsJobDone = false;

    /// @notice state variables to store interval and block.timestamp to assist in chainlink automation
    uint256 internal lastTimeStamp;
    uint256 internal interval;

    /// @notice state variable to store the function's Subscription Id
    uint64 internal functionsSubscriptionId;

    /// @notice State variables to store the last request ID, response, and error
    bytes32 internal s_lastRequestId;
    bytes internal s_lastResponse;
    bytes internal s_lastError;

    /// @notice Custom error type
    error UnexpectedRequestID(bytes32 requestId);

    /**
        @notice Event to log responses
        @param requestId The ID of the request to fulfill
        @param score Returned value from the function
        @param response The HTTP response data
        @param err Any errors from the Functions request
     */
    event Response(
        bytes32 indexed requestId,
        string score,
        bytes response,
        bytes err
    );

    /*
        @notice Router address - Hardcoded for Amoy
        Check to get the router address for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    */
    address internal router = 0xC22a79eBA640940ABB6dF0f7982cc119578E11De;
    /// @notice Callback gas limit
    uint32 internal gasLimit = 300000;
    /*
         @notice donID - Hardcoded for Amoy
         Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    */
    bytes32 internal donID =
        0x66756e2d706f6c79676f6e2d616d6f792d310000000000000000000000000000;

    /// @notice JavaScript source code to fetch the score
    string internal source =
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://dynatick-dnft-ticketing-solution.vercel.app/api/football`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data.result);";

    // @notice State variable to store the returned score information
    string public score;
    // @notice State variable to store the TicketInterface object
    TicketInterface internal instanceOfTicket;

    constructor(
        uint256 _interval,
        uint64 _functionsSubscriptionId,
        address _ticketAddress
    ) FunctionsClient(router) {
        interval = _interval;
        lastTimeStamp = block.timestamp;
        functionsSubscriptionId = _functionsSubscriptionId;
        instanceOfTicket = TicketInterface(_ticketAddress);
    }

    /**
       @notice This  function contains the logic that runs offchain during every block as 
               an eth_call to determine if performUpkeep should be executed onchain.
       @return upkeepNeeded  Boolean that when True will trigger the onchain performUpkeep call.
    */
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        if (IsFunctionsJobDone == false) {
            if ((block.timestamp - lastTimeStamp) > interval) {
                upkeepNeeded = true;
            }
        }
    }

    /**
       @notice This function contains the logic to trigger Functions after the checkupkeep is successful.
    */
    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            sendRequest(functionsSubscriptionId);
            IsFunctionsJobDone = true;
        }
    }

    /**
     * @notice Sends an HTTP request for character information
     * @param subscriptionId The ID for the Chainlink subscription
     * @return requestId The ID of the request
     */
    function sendRequest(
        uint64 subscriptionId
    ) public returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        // if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        score = string(response);
        s_lastError = err;

        emit Response(requestId, score, s_lastResponse, s_lastError);
    }

    // @notice Function which triggers the nft metadata update
    function updateNFTMetaData() external {
        require(
            bytes(score).length != 0,
            "Score is null, Cannot trigger NFT meta data"
        );
        instanceOfTicket.updateMetaData(score);
    }
}
