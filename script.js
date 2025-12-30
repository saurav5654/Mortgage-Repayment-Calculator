document.getElementById('mortgage-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const term = parseFloat(document.getElementById('term').value) * 12; // months
  const rate = parseFloat(document.getElementById('rate').value) / 100 / 12; // monthly decimal
  const type = document.querySelector('input[name="type"]:checked').value;

  let monthlyPayment = 0;
  let totalRepayment = 0;

  if (type === 'repayment') {
    // Standard Mortgage Formula
    const x = Math.pow(1 + rate, term);
    monthlyPayment = (amount * x * rate) / (x - 1);
    totalRepayment = monthlyPayment * term;
  } else {
    // Interest Only
    monthlyPayment = amount * rate;
    totalRepayment = (monthlyPayment * term) + amount;
  }

  // Display results
  document.getElementById('monthly-result').innerText = `£${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('total-result').innerText = `£${totalRepayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  // Toggle UI states
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('completed-state').classList.remove('hidden');
});

// Clear Button Logic
document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('mortgage-form').reset();
  document.getElementById('empty-state').classList.remove('hidden');
  document.getElementById('completed-state').classList.add('hidden');
});