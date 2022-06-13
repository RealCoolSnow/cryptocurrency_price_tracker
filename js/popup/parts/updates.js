import { timeDifference as td, secondToDate } from "../../utils/utils.js";

const container = document.querySelector(".container");
// napravi countdown
const countdown = document.createElement("span");
countdown.className = "countdown";
// napravi span element koji ce prikazivati poslednje vreme pristupa
const lastUpdate = document.createElement("span");
lastUpdate.className = "last-update";

let timeDifference;

export const update = {
  check(main) {
    try {
      container.appendChild(countdown);
      countdown.appendChild(lastUpdate);
      lastUpdate.onclick = function () {
        chrome.runtime.sendMessage({ action: "update" }, (response) => {
          // use the response here
        });
      };
      setInterval(() => {
        timeDifference = td(main);
        lastUpdate.textContent = secondToDate(timeDifference) + " ago";
        this.removeClass();
        /*
          if (timeDifference < 15) {
            lastUpdate.textContent = 'just now';
            this.removeClass();
          }
          else if (timeDifference > 15 && timeDifference < 30) {
            lastUpdate.textContent = '15 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 30 && timeDifference < 45) {
            lastUpdate.textContent = '30 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 45 && timeDifference < 60) {
            lastUpdate.textContent = '45 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 60 && timeDifference < 90) {
            lastUpdate.textContent = '1 minute ago';
            this.removeClass();
          }
          else if (timeDifference > 90 && timeDifference < 120) {
            lastUpdate.textContent = '1 minute 30 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 120 && timeDifference < 150) {
            lastUpdate.textContent = '2 minutes ago';
            this.removeClass();
          }
          else if (timeDifference > 150 && timeDifference < 180) {
            lastUpdate.textContent = '2 minutes 30 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 180 && timeDifference < 210) {
            lastUpdate.textContent = '3 minutes ago';
            this.removeClass();
          }
          else if (timeDifference > 210 && timeDifference < 240) {
            lastUpdate.textContent = '3 minutes 30 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 240 && timeDifference < 270) {
            lastUpdate.textContent = '4 minutes ago';
            this.removeClass();
          }
          else if (timeDifference > 270 && timeDifference < 301) {
            lastUpdate.textContent = '4 minutes 30 seconds ago';
            this.removeClass();
          }
          else if (timeDifference > 301 && timeDifference < 360) {
            lastUpdate.textContent = '5 minutes ago';
            this.removeClass();
          }
          else if (timeDifference > 360) {
            lastUpdate.textContent = 'Results are not updated!';
            lastUpdate.style.color = 'red';
            this.removeClass();
          }
          else {
            lastUpdate.classList.add('blur');
          }*/
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  },

  removeClass() {
    if (lastUpdate.classList.contains("blur")) {
      lastUpdate.classList.remove("blur");
    }
  },
};
