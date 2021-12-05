
// Displays a prompt for the user to select which accounts to connect
async function requestAccount() {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return account[0];
};

export default requestAccount;