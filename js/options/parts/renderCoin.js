export function renderCoin(alerts, selectedCoins, coin, index) {
  const coinElement = document.createElement('div');
    coinElement.id = coin.name.toLowerCase().split(' ').join('-') + '-' + coin.symbol.toLowerCase();
    coinElement.className = 'coin';
    coinElement.dataset.id = coin.id;
    coinElement.dataset.name = coin.name;
    if ( alerts?.[coinElement.dataset.id]?.max ) coinElement.dataset.alertAbove = alerts[coinElement.dataset.id]?.max;
    if ( alerts?.[coinElement.dataset.id]?.min ) coinElement.dataset.alertBelow = alerts[coinElement.dataset.id]?.min;
  coinElement.dataset.checked = selectedCoins.includes(coinElement.id) ? 'checked' : '';

  const checkBoxWrapper = document.createElement('div');
    checkBoxWrapper.className = 'checkbox-wrapper';
  coinElement.appendChild(checkBoxWrapper);

  const checkBox = document.createElement('input');
    checkBox.id = `item-${index}`;
    checkBox.type = 'checkbox';
    checkBox.checked = coinElement.dataset.checked;
  checkBoxWrapper.appendChild(checkBox);

  const labelWrapper = document.createElement('div');
    labelWrapper.className = 'label-wrapper';
  coinElement.appendChild(labelWrapper);

  const label = document.createElement('label');
    label.htmlFor = `item-${index}`;
    label.innerHTML = `<span><b>${coin.name}</b> ${coin.symbol.toUpperCase()}</span>`;
  labelWrapper.appendChild(label);

  const alertIndicatorWrapper = document.createElement('div');
    alertIndicatorWrapper.classList = 'alert-indicator-wrapper';
  coinElement.appendChild(alertIndicatorWrapper);

  const alertIndicator = document.createElement('button');
    alertIndicator.classList = 'alert-indicator';
    if ( coinElement.dataset.alertAbove || coinElement.dataset.alertBelow ) alertIndicator.classList = 'alert-indicator has-alert';
  alertIndicatorWrapper.appendChild(alertIndicator);

  const alertImage = document.createElement('img');
    if ( !coinElement.dataset.alertAbove && !coinElement.dataset.alertBelow ) alertImage.src = '../img/set_alert.svg';
    else alertImage.src = '../img/alert.svg';
  alertIndicator.appendChild(alertImage);

  return coinElement;
}