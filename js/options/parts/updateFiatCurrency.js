export function updateFiatCurrency(main) {
  const convert = main.convert;
  const allCurrencies = Array.from(document.querySelectorAll('.currency-selection option'));
  const fiatCurrencies = allCurrencies.filter(option => option.value !== 'btc');

  fiatCurrencies.forEach(option => {
    if (main.convert) {
      option.value = convert.toLowerCase();
      option.textContent = convert.toUpperCase();
    } else {
      option.value = 'usd';
      option.textContent = 'USD';
    }
  });
}