import { useEffect, useState } from 'react';
import './App.css';

import requestAccount from './helpers/requestAccount';
import fetchHighestBid from './helpers/fetchHighestBid';
import fetchMyBid from './helpers/fetchMyBid';
import fetchOwner from './helpers/fetchOwner';
import submitBid from './helpers/submitBid';
import withdrawBid from './helpers/withdrawBid';

const emptyAddress = '0x0000000000000000000000000000000000000000';

function App() {
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [myBid, setMyBid] = useState(0);
    const [isOwner, setIsOwner] = useState(false);
    const [highestBid, setHighestBid] = useState(0);
    const [highestBidder, setHighestBidder] = useState('');

    const updateBidNBidder = async() => {
        const { err, highestBidAmount, highestBidder } = await fetchHighestBid();
        if(err) return;
        setHighestBid(highestBidAmount);
        setHighestBidder(highestBidder);
    };

    const submit = async event => {
        event.preventDefault();
        const { err, myBid } = await submitBid(amount, account);
        if(!err) setMyBid(myBid);
        updateBidNBidder();
    };

    const withdraw = async() => {
        const { err, myBid } = await withdrawBid(amount);
        if(!err) setMyBid(myBid);
        updateBidNBidder();
    }

    useEffect(() => {
        (async() => {
            const account = await requestAccount();
            setAccount(account);
            const { err, isOwner } = await fetchOwner(account);
            if(!err) setIsOwner(isOwner);
            const { error, myBid } = await fetchMyBid(account);
            if(!error) setMyBid(myBid);
            updateBidNBidder();
        })();
    }, []);

    return (
        <div id="app">
            { isOwner ? (
                <input type="button" onClick={ withdraw } value='Withdraw'/>
            ) : ( "" )
            }
            <div id="body">
                <p>Connected Account: { account }</p>
                <p>My Bid: { myBid }</p>
                <p>Auction Highest Bid Amount: { highestBid }</p>
                <p>
                    Auction Highest Bidder:{' '} {
                        highestBidder === emptyAddress ? 'null' :
                            highestBidder === account ? 'Me' : highestBidder
                    }
                </p>
                { !isOwner ? (
                    <form onSubmit={ submit }>
                        <input value={ amount }
                            onChange={ event => setAmount(event.target.value) }
                            name="Bid Amount"
                            type="number"
                            placeholder="Enter Bid Amount"
                        />
                        <button type="submit">Submit</button>
                    </form>
                ) : "" }
            </div>
        </div>
    );
}

export default App;