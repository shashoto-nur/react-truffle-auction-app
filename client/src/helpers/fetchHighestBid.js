import { formatEther } from '@ethersproject/units';
import initializeProvider from './initializeProvider';

async function fetchHighestBid() {
    if (!window.ethereum) return { err: true, highestBidAmount: 0, highestBidder: 0 };
    const contract = await initializeProvider();
    try {
        const highestBid = await contract.fetchHighestBid();
        const { bidAmount, bidder } = highestBid;

        // Convert bidAmount from Wei to Ether and round value to 4 decimal places
        const highestBidAmount = parseFloat(formatEther(bidAmount.toString())).toPrecision(4);
        const highestBidder = bidder.toLowerCase();
        return { err: false, highestBidAmount, highestBidder };
    } catch ({ message }) {
        console.log({ message });
        return { err: true, highestBidAmount: 0, highestBidder: 0 };
    };
};

export default fetchHighestBid;