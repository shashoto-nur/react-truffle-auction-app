import { formatEther } from '@ethersproject/units';
import initializeProvider from './initializeProvider';

async function fetchMyBid(account) {
    if (!window.ethereum) return { error: true, myBid: 0 };
    const contract = await initializeProvider();
    try {
        const bid = await contract.bids(account);
        const myBid = parseFloat(formatEther(bid.toString())).toPrecision(4);
        return { error: false, myBid };
    } catch ({ message }) {
        console.log({ message });
        return { error: true, myBid: 0 };
    };
};

export default fetchMyBid