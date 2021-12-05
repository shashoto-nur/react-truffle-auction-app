import { parseEther } from '@ethersproject/units';
import initializeProvider from './initializeProvider';
import fetchMyBid from './fetchMyBid';

async function submitBid(amount, account) {
    if (!window.ethereum) return { err: true, myBid: 0 };
    const contract = await initializeProvider();
    try {
        // User inputs amount in terms of Ether, convert to Wei before sending to the contract.
        const wei = parseEther(amount);
        await contract.makeBid({ value: wei });
        // Wait for the smart contract to emit the LogBid event then update component state
        contract.on('LogBid', async(_, __) => {
            const myBid = await fetchMyBid(account);
            return { err: false, myBid };
        });
    } catch ({ message }) {
        console.log({ message });
        return { err: true, myBid: 0 };
    };
};

export default submitBid;