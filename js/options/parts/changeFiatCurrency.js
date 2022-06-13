import { updateFiatCurrency } from './updateFiatCurrency.js';

export function changeFiatCurrency(main) {
  let fiatCurrencies = document.querySelectorAll('.fiat-wrapper .fiat');
  
  if (main.convert) {
    fiatCurrencies.forEach(function(e) {
      if (e.textContent == main.convert) {
        e.classList.add('active');
      }
    });
    updateFiatCurrency(main);
  }

  fiatCurrencies.forEach(function(e){
    e.addEventListener('click', function() {
        if (e.classList.contains('active')) {
          e.classList.toggle('active');
        } else {
          fiatCurrencies.forEach(function(e) {
            e.classList.remove('active');
          });
          e.classList.add('active');
        }

      let selected =  document.querySelector('.fiat-wrapper .fiat.active');

      main.convert = selected ? selected.textContent : false;

      updateFiatCurrency(main);

      chrome.storage.local.set({ convert: main.convert }, function() {
        chrome.storage.local.set({ main });
      });
    });
  });
}