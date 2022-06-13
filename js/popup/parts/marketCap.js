import { mapPrice } from '../../shared/shared.js';
import { roundNumber } from '../../utils/utils.js';

export const marketCap = {
  render(main, container) {
    try {
      const marketCapDiv = document.createElement('div');
            marketCapDiv.className = 'market-cap';

      const marketCapSpan = document.createElement('span');
            marketCapSpan.className = 'market-cap-span';

      if (main.convert) {
        const marketCapConvert = 'total_market_cap_' + main.convert.toLowerCase();

        if(main.market_cap[marketCapConvert]) {
          marketCapSpan.textContent = 'Total Market Cap: ' + mapPrice[main.convert.toLowerCase()] + main.market_cap[marketCapConvert].toLocaleString();
          marketCapDiv.appendChild(marketCapSpan);
          container.insertBefore(marketCapDiv, container.firstElementChild);
        }
      } else {
        marketCapSpan.textContent = 'Total Market Cap: ' + '$' + main.market_cap['total_market_cap_usd'].toLocaleString();
        marketCapDiv.appendChild(marketCapSpan);
        container.insertBefore(marketCapDiv, container.firstElementChild);
      }
    } catch (error) {
      console.log(error);
    }
  }
};