export function timeDifference(main) {
  return Math.floor((new Date().getTime() - main.timestamp) / 1000);
}

export function sleep(time) {
  return new Promise((resolve, reject) => setTimeout(resolve, time));
}

export function roundNumber(number) {
  if (typeof number === "number") return Math.round(number);
  return Math.round(parseFloat(number));
}

export function limitString(str, limit) {
  return str.length >= limit ? `${str.substring(0, limit)}...` : str;
}

export function secondToDate(result) {
  var h = Math.floor(result / 3600);
  var m = Math.floor((result / 60) % 60);
  var s = Math.floor(result % 60);
  if (h > 0) return h + "h" + m + "m" + s + "s";
  else if (m > 0) return m + "m" + s + "s";
  else return s + "s";
}
