let inputValue;
let coinID;

export function filterCoins(coinsWrapper) {
  const buttons = document.querySelectorAll('.coins-filter button');

  coinsWrapper.forEach(coin => {
    inputValue = this.value.toUpperCase();
    coinID = coin.id.toUpperCase().split('-').join(' ');

    if (!(coinID.startsWith(inputValue) || coinID.slice(coinID.lastIndexOf(' ') + 1).startsWith(inputValue))){
      coin.style.display = 'none';
    } else {
      coin.style.display = '';
    }
  });

  buttons.forEach(button => {
    if (button.id == 'all') button.classList.add('active');
    else button.classList.remove('active');
  });
}

export function initButtonsFilter() {
  const coinsWrapper = document.querySelectorAll('.coins-wrapper .coin');
  const buttons = document.querySelectorAll('.coins-filter button');

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      if (button.classList.contains('active')) {
        return true;
      } else {
        buttons.forEach(function(button) {
          button.classList.remove('active');
        });

        coinsWrapper.forEach(coin => {
          if (this.id == 'all') coin.style.display = '';
          else if (this.id == 'selected' && coin.dataset.checked) coin.style.display = '';
          else if (this.id == 'with-alert' && (coin.dataset.alertAbove || coin.dataset.alertBelow)) coin.style.display = '';
          else coin.style.display = 'none';
        });

        button.classList.add('active');
      }
      document.querySelector('.search-wrapper input').value = '';
    });
  });
}