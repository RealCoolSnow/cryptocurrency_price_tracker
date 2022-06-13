import { mapPrice } from '../../shared/shared.js'

const container = document.querySelector('.container');

let changeClass;

export const coins = {
  render(main, arr) {
    main.coins
              .filter(coin => {
                return arr.includes(coin.name.toLowerCase().split(' ').join('-') + '-' + coin.symbol.toLowerCase());
              })
              .sort((a, b) => a['market_cap_rank'] - b['market_cap_rank'])
              .forEach(coin => {
                // renderuj koin
                this.coin(main, coin);
              });
  },

  coin(main, coin) {
    try {
      // napravi div sa klasom coin i dodaj ga na container
      let coinWrapper = document.createElement('div');
      coinWrapper.className = 'coin';
      coinWrapper.addEventListener('click',() => {
        //chrome.storage.local.set({current_symbol:coin.symbol.toLowerCase()})
        chrome.runtime.sendMessage({ action: "set_current", symbol: coin.symbol.toLowerCase() }, (response) => {
          // use the response here
        });
      })
      this.upOrDown(coin);

      coinWrapper.innerHTML = `
        <div class="first-col">
            ${ this.name(main, coin) }
            ${ this.btcPrice(coin) }
        </div>
        <div class="second-col">
            ${ this.coinPrice(main, coin) }
        </div>
        <div class="third-col">
            ${ this.priceChange(coin) }
        </div>
      `;

      container.appendChild(coinWrapper);
    } catch (error) {
      console.log(error);
    }
  },

  name(main, coin) {
    if (main['link']) return this.link(coin);
    return this.noLink(coin);
  },

  link(coin) {
    return `
        <a class="coin-name link" href="${ 'https://www.coingecko.com/en/coins/' + coin.id }" target="_blank">
          ${ coin.name + ' ' + coin.symbol.toUpperCase() }<!--
          --><img src="../img/link.png\"">
        </a>
    `;
  },

  noLink(coin) {
    return `
      <span class="coin-name">
          ${ coin.name + ' ' + coin.symbol.toUpperCase() }
      </span>
    `;
  },

  btcPrice(coin) {
    if (coin.name.toLowerCase() !== 'bitcoin' && coin.current_price_btc) {
      return `
        <span class="coin-btc-price">
          ${ '฿ ' + parseFloat(coin.current_price_btc).toFixed(8) }
        </span>
      `;
    }
    return '';
  },

  coinPrice(main, coin) {
    let fiat = main.convert ? main.convert.toLowerCase() : 'usd';
    let price = parseFloat(coin[`current_price_${ fiat }`]);
      
    if (fiat === 'idr') container.classList.add('wide');
  
    document.querySelector('.fiat').textContent = fiat.toUpperCase() + ' PRICE';
  
    return `
      <span class="coin-price">
        ${ price ? this.roundFiatPrice(fiat, price) : '/' }
      </span>
    `;
  },

  roundFiatPrice(fiat, price) {
      return price.toString().charAt(0) == '0' ? mapPrice[fiat] + price.toFixed(8) : mapPrice[fiat] + price.toFixed(4);
  },

  priceChange(coin) {
    if ( coin.price_change_percentage_24h ) {
  
        let changeValue;
  
        if (typeof coin.price_change_percentage_24h === 'string') changeValue = parseFloat(coin.price_change_percentage_24h).toFixed(2) + '%';
        if (typeof coin.price_change_percentage_24h === 'number') changeValue = coin.price_change_percentage_24h.toFixed(2) + '%';
  
        return `
            <span class="${ 'change ' + changeClass }">
                ${ changeValue }
            </span>
        `;
    }
    return '';
  },

  upOrDown(coin) {
    try {
      if (typeof coin.price_change_percentage_24h === 'string') changeClass = coin.price_change_percentage_24h.indexOf('-') != -1 ? 'down' : 'up';
      if (typeof coin.price_change_percentage_24h === 'number') changeClass = coin.price_change_percentage_24h < 0 ? 'down' : 'up';
    } catch (error) {
      console.log(error);
    }
  }
}