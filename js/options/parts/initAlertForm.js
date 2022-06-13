export function initAlertForm(event) {
  if (!event.target.classList.contains('alert-indicator')) return false;

  const target = event.target;
  const alertForm = document.querySelector('.alert-form');
  
  alertForm.querySelector('h3').textContent = 'Set alert for' + ' ' + target.closest('.coin').dataset.name;
  alertForm.querySelector('.above input').value = target.closest('.coin').dataset.alertAbove ? target.closest('.coin').dataset.alertAbove : '';
  alertForm.querySelector('.below input').value = target.closest('.coin').dataset.alertBelow ? target.closest('.coin').dataset.alertBelow : '';
  alertForm.dataset.coinId = target.closest('.coin').dataset.id;
  alertForm.querySelector('#delete').textContent = (target.closest('.coin').dataset.alertAbove || target.closest('.coin').dataset.alertBelow) ? 'Delete' : 'Close';

  // alertForm.querySelector('#submit').addEventListener('click', submitAlert.bind(null, main, target.closest('.coin'), alertForm));
  // alertForm.querySelector('#delete').addEventListener('click', deleteAlert.bind(null, main, target.closest('.coin'), alertForm));

  alertForm.style.display = 'block';
}

export function submitAlert(main) {
  const alertForm = document.querySelector('.alert-form');
  const coin = document.querySelector(`[data-id="${ alertForm.dataset.coinId }"]`);
  const selectValue = document.querySelector('.currency-selection select').options[document.querySelector('.currency-selection select').selectedIndex].value;
  const aboveValue = alertForm.querySelector('.above input').value;
  const belowValue = alertForm.querySelector('.below input').value;

  if (isNaN(aboveValue) || isNaN(belowValue)) {
    if (isNaN(aboveValue)) alertForm.querySelector('.above input').style.outline = '2px solid red';
    if (isNaN(belowValue)) alertForm.querySelector('.below input').style.outline = '2px solid red';
    return false;
  }

  if (aboveValue == '' && belowValue == '') {
    alertForm.querySelector('.above input').style.outline = '2px solid red';
    alertForm.querySelector('.below input').style.outline = '2px solid red';
    return false;
  }

  main['alerts'] = main['alerts'] || {};
  main['alerts'][coin.dataset.id.toLowerCase()] = main['alerts'][coin.dataset.id.toLowerCase()] || {};
  main['alerts'][coin.dataset.id.toLowerCase()].cur = selectValue;
  main['alerts'][coin.dataset.id.toLowerCase()].max = parseFloat(aboveValue);
  main['alerts'][coin.dataset.id.toLowerCase()].min = parseFloat(belowValue);
  
  chrome.storage.local.set({ main }, function() {
    coin.dataset.alertAbove = aboveValue ? parseFloat(aboveValue) : '';
    coin.dataset.alertBelow = belowValue ? parseFloat(belowValue) : '';
    alertForm.dataset.coinId = '';
    alertForm.querySelector('.above input').style.outline = '';
    alertForm.querySelector('.below input').style.outline = '';
    coin.querySelector('.alert-indicator img').src = '../img/alert.svg';
    coin.querySelector('.alert-indicator').classList.add('has-alert');

    alertForm.style.display = 'none';
  });
}

export function deleteAlert(main) {
  const alertForm = document.querySelector('.alert-form');
  const coin = document.querySelector(`[data-id="${ alertForm.dataset.coinId }"]`);

  if ( main.alerts ) {
    if ( main.alerts[coin.dataset.id.toLowerCase()] ) {
      delete main.alerts[coin.dataset.id.toLowerCase()];
    }
  }

  chrome.storage.local.set({ main }, function() {
    coin.dataset.alertAbove = '';
    coin.dataset.alertBelow = '';
    alertForm.dataset.coinId = '';
    alertForm.querySelector('.above input').style.outline = '';
    alertForm.querySelector('.below input').style.outline = '';
    coin.querySelector('.alert-indicator img').src = '../img/set_alert.svg';
    coin.querySelector('.alert-indicator').classList.remove('has-alert');

    alertForm.style.display = 'none';
  });
}