export function checkCoin(selectedCoins, event) {

  if (!event.target.matches('input[type="checkbox"]')) return false;

  event.target.closest('.coin').dataset.checked = event.target.checked ? 'checked' : '';

  if (event.target.checked) selectedCoins.push(event.target.closest('.coin').id);
  else selectedCoins.splice(selectedCoins.indexOf(event.target.closest('.coin').id), 1);

  chrome.storage.local.set({ 'arr': selectedCoins });
  
}