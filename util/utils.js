import moment from "moment";

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

export function formatTime(departure, arrival) {
  var departureDate = new Date(Date.parse(departure));
  var arrivalDate = new Date(Date.parse(arrival));

  return `${departureDate.getHours()}:${departureDate.getMinutes()} - ${arrivalDate.getHours()}:${arrivalDate.getMinutes()}`;
}

export function formatDuration(duration) {
  return duration
    .replace("PT", "")
    .toLowerCase()
    .replace(/(\d+)/g, function (_, num) {
      return " " + num + " ";
    })
    .trim();
}

export function getLocationCode(query, location) {
  if (query.includes(location)) {
    return query
      .toLowerCase()
      .split(location)[1]
      .split(" ")
      .join("")
      .substring(0, 3)
      .toUpperCase();
  }
}

export function getTomorrowDate() {
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);
  return new Date(tomorrow).toISOString().substring(0, 10);
}

export function getOnDate(query, parm) {
  if (query.includes(parm)) {
    const date = query.toLowerCase().split(parm)[1];
    console.log(date);

    const today = new Date();
    const test = new Date(date);
    console.log(test.getUTCMonth());

    var now = moment(date)
      .format()
      .substring(0, 10)
      .replace("2001", moment().year());
    console.log(now);
  }
}
