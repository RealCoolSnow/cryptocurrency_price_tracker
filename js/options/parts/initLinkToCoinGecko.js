export function initLinkToCoinGecko(main) {
  const radioButtons = Array.from(document.querySelectorAll('.radio-wrapper input'));

  radioButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.id === 'yes' ? main['link'] = true : main['link'] = false;
      chrome.storage.local.set({ main });
    });
  });
}