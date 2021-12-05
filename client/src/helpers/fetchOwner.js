import initializeProvider from './initializeProvider';

async function fetchOwner(account) {
    if (!window.ethereum) return { err: true, isOwner: null };
    const contract = await initializeProvider();
    try {
        const owner = await contract.getOwner();
        const isOwner = owner.toLowerCase() === account;
        return { err: false, isOwner };
    } catch ({ message }) {
        console.log({ message });
        return { err: true, isOwner: null };
    };
};

export default fetchOwner;