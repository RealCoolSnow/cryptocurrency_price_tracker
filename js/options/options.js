import { initLinkToCoinGecko } from './parts/initLinkToCoinGecko.js';
import { changeFiatCurrency } from './parts/changeFiatCurrency.js';
import { filterCoins, initButtonsFilter } from './parts/filterCoins.js';
import { renderCoin } from './parts/renderCoin.js';
import { checkCoin } from './parts/checkCoin.js';
import { initAlertForm, submitAlert, deleteAlert } from './parts/initAlertForm.js';

let main = {};
let selectedCoins = [ 'bitcoin-btc' ];

function appendCoinsToFragment(accumulator, currentValue, currentIndex) {
  accumulator.appendChild(renderCoin(main?.alerts, selectedCoins, currentValue, currentIndex));
  return accumulator;
}

chrome.storage.local.get(['main', 'arr'], storage => {

  if (!storage.main) return false;
  if (storage.arr) selectedCoins = storage.arr;
  
  main = storage.main;

  if ( main['link'] ) document.querySelector('.radio-wrapper #yes').checked = true;

  initLinkToCoinGecko(main);
  changeFiatCurrency(main);
  
  document.querySelector('.coins-wrapper').appendChild(main.coins.reduce(appendCoinsToFragment, document.createDocumentFragment()));
  
  document.querySelector('.container').classList.remove('loading');
  
  document.querySelector('.coins-wrapper').addEventListener('click', checkCoin.bind(null, selectedCoins));
  document.querySelector('.coins-wrapper').addEventListener('click', initAlertForm);
  document.getElementById('submit').addEventListener('click', submitAlert.bind(document.getElementById('submit'), main));
  document.getElementById('delete').addEventListener('click', deleteAlert.bind(document.getElementById('delete'), main));
  document.querySelector('.search-wrapper input').addEventListener('keyup', filterCoins.bind(document.querySelector('.search-wrapper input'), document.querySelectorAll('.coins-wrapper .coin')));
  initButtonsFilter();

});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (Object.keys(main).length) {
    chrome.storage.local.get(storage => {
      main.timestamp = storage.main.timestamp;
    });
  }
});