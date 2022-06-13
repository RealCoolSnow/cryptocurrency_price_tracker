let main;
let customStyles = {};

const demoContent = document.querySelector('#demo');

const save = document.querySelector('#save');
const reset = document.querySelector('#reset');

const allColors = document.querySelectorAll('input[type="color"]');

chrome.storage.local.get('main', e => {
  if (e.main) main = e.main;
  else return false;

  applyColorsToInputs();
  applyStylesToDemoContent();
});

allColors.forEach(element => {
    element.addEventListener('change', applyStylesToDemoContentEvent);
});

function applyStylesToDemoContentEvent(event) {
  const target = event.target;
  const element = target.dataset.element;
  const property = target.dataset.property;

  document.querySelectorAll(element).forEach(el => {
    el.style[property] = target.value;
  });
}

save.addEventListener('click', saveObject);
reset.addEventListener('click', resetStyles);

function saveObject() {
  allColors.forEach(element => {
    customStyles[element.dataset.element.replace('.', '')] = customStyles[element.dataset.element.replace('.', '')] || {};
    customStyles[element.dataset.element.replace('.', '')][element.dataset.property] = element.value;
  });

  chrome.storage.local.get('main', e => {
    main = e.main ? e.main : undefined;
    main['customStyles'] = customStyles;

    chrome.storage.local.set({ main });
  });
}

function resetStyles() {
  chrome.storage.local.get('main', e => {
    main = e.main ? e.main : undefined;
    if (main['customStyles']) {
      delete main['customStyles'];
      chrome.storage.local.set({ main }, () => location.reload());
    } else {
      location.reload();
    }
  });
}

function applyColorsToInputs() {
  let customStyles = main['customStyles'] ? main['customStyles'] : false;

  if (!customStyles) false;

  Object.keys(customStyles).forEach(key => {
    allColors.forEach(input => {
      if (input.dataset.element.replace('.', '') === key) {
        if (customStyles[input.dataset.element.replace('.', '')]) {
          if (customStyles[input.dataset.element.replace('.', '')][input.dataset.property]) input.value = customStyles[key][input.dataset.property];
        }
      }
    });
  });
}

function applyStylesToDemoContent() {
  let customStyles = main['customStyles'] ? main['customStyles'] : false;

  if (!customStyles) false;

  Object.keys(customStyles).forEach(key => {
    if (demo.querySelectorAll(`.${key}`)) {
      demo.querySelectorAll(`.${key}`).forEach(element => {
        element.style = Object.keys(customStyles[key]).map(property => {
          return `${property}: ${customStyles[key][property]};`
        }).join('');
      })
    }
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace){
  if (main) {
    chrome.storage.local.get(storage => {
      main.timestamp = storage.main.timestamp;
    });
  }
});