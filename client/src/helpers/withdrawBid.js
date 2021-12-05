import initializeProvider from './initializeProvider';
import fetchMyBid from './fetchMyBid';

async function withdraw(account) {
    if (!window.ethereum) return { err: true, myBid: 0 };
    const contract = await initializeProvider();
    // Wait for the smart contract to emit the LogWithdrawal event and update component state
    contract.on('LogWithdrawal', async _ => {
        const myBid = await fetchMyBid(account);
        return { err: false, myBid };
    });
    try {
        await contract.withdraw();
    } catch ({ message }) {
        console.log({ message });
        return { err: true, myBid: 0 };
    };
};

export default withdraw;