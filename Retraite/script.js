document.addEventListener('DOMContentLoaded', function() {
    const retirementForm = document.getElementById('retirement-form');
    const resultDiv = document.getElementById('result');

    retirementForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const currentAge = parseInt(document.getElementById('current-age').value);
        const retirementAge = parseInt(document.getElementById('retirement-age').value);
        const currentSavings = parseFloat(document.getElementById('current-savings').value);
        const annualSavings = parseFloat(document.getElementById('annual-savings').value);
        const annualReturn = parseFloat(document.getElementById('annual-return').value) / 100;

        const yearsToRetirement = retirementAge - currentAge;
        let futureSavings = currentSavings;

        for (let i = 0; i < yearsToRetirement; i++) {
            futureSavings += annualSavings;
            futureSavings += futureSavings * annualReturn;
        }

        resultDiv.textContent = `Montant estimé de l'épargne à la retraite: ${futureSavings.toFixed(2)} €`;
    });
});
