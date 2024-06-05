document.addEventListener('DOMContentLoaded', function() {
    const menuCards = document.querySelectorAll('.menu-card.active');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultText = document.getElementById('result');
    const converterForm = document.getElementById('converter-form');
    const exchangeButton = document.getElementById('exchange-button');
    resultText.textContent = 'Devise de fonnance d\'Elios v1.1'
                        
    const currencies = {
        "USD": "Dollar américain",
        "EUR": "Euro",
        "JPY": "Yen japonais",
        "GBP": "Livre sterling",
        "AUD": "Dollar australien",
        "CAD": "Dollar canadien",
        "CHF": "Franc suisse",
        "CNY": "Yuan chinois",
        "SEK": "Couronne suédoise",
        "NZD": "Dollar néo-zélandais",
//     "BTC": "OFF : Bitcoin",
//   "ETH": "OFF : Ethereum",
//      "BNB": "OFF : Binance Coin",
//      "XRP": "OFF : Ripple",
//      "ADA": "OFF : Cardano",
//     "DOGE": "OFF : Dogecoin",
//      "DOT": "OFF : Polkadot",
//      "UNI": "OFF : Uniswap",
    };

    function populateCurrencySelectors() {
        Object.values(currencies).forEach(currencyName => {
            const option1 = document.createElement('option');
            option1.textContent = currencyName;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.textContent = currencyName;
            toCurrencySelect.appendChild(option2);
        });
    }

    function convertCurrency(event) {
        event.preventDefault();
        const fromCurrency = getKeyByValue(currencies, fromCurrencySelect.value);
        const toCurrency = getKeyByValue(currencies, toCurrencySelect.value);
        const amount = amountInput.value;

        if (!fromCurrency || !toCurrency || !amount) {
            resultText.textContent = 'Veuillez remplir tous les champs.';
            return;
        }

        fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des taux de change');
                }
                return response.json();
            })
            .then(data => {
                const rate = data.rates[toCurrency];
                if (rate) {
                    const conversionResult = amount * rate;
                    resultText.textContent = `${amount} ${fromCurrency} = ${conversionResult.toFixed(2)} ${toCurrency}`;
                } else {
                    resultText.textContent = 'Impossible de récupérer le taux de change.';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                resultText.textContent = 'Une erreur s\'est produite lors de la conversion: ' + error.message;
            });

            exchangeButton.addEventListener('click', function() {
                // Échangez les devises sélectionnées
                const temp = fromCurrencySelect.value;
                fromCurrencySelect.value = toCurrencySelect.value;
                toCurrencySelect.value = temp;
            });
    }

    // Initialiser les sélecteurs de devises
    populateCurrencySelectors();

    // Ajouter l'événement de soumission du formulaire
    converterForm.addEventListener('submit', convertCurrency);

    // Ajoutez les événements de clic aux cartes actives
    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            alert('Vous avez cliqué sur ' + this.id);
        });
    });
});

// Fonction utilitaire pour obtenir la clé par valeur dans un objet
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

