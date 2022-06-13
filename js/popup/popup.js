import { marketCap } from './parts/marketCap.js';
import { coins } from './parts/coins.js'
import { customStyles } from './parts/customStyles.js';
import { update } from './parts/updates.js';
import { timeDifference } from '../utils/utils.js';

let main;
let arr = ['bitcoin-btc'];

const container = document.querySelector('.container');
const spinner = document.querySelector('.spinner');

chrome.storage.local.get(['main', 'arr'], data => {
  try {
    if (data.main) {
      main = data.main;

      if(data.arr) arr = data.arr;

      if((timeDifference(main)) < 360) {
        // renderuj koine
        coins.render(main, arr);

        // renderuj market cap
        marketCap.render(main, container);

        spinner.style.display = 'none';
        container.style.opacity = 1;

        // prikazi vreme od predhodnog azuriranja rezultata
        update.check(main);
        
        // primeni stilove koje je postavio korisnik
        customStyles.apply(main);

        // ispravka greske na MAC operativnim sistemima
        chrome.runtime.getPlatformInfo(function(e){
          if(e.os === 'mac'){
            setTimeout(() => {
              document.body.style.width = `${document.body.clientWidth + 1}px`;
            }, 300);
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
    
chrome.storage.onChanged.addListener(function(changes, namespace){
  location.reload();
});
