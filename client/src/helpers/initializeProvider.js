import { ethers } from 'ethers';
import Auction from '../contracts/Auction.json';
import { AuctionContractAddress } from '../config/env';

// Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
async function initializeProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(AuctionContractAddress, Auction.abi, signer);
};

export default initializeProvider;