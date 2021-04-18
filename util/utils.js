import moment from "moment";

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
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
  var today = moment();
  var tomorrow = today.add(1, "day");
  return moment().add(1, "day").format("YYYY-MM-DD");
}

export function getOnDate(query, parm) {
  if (query.includes(parm)) {
    const today = moment();
    const date = query.toLowerCase().split(parm)[1];

    // extract the short date like May 31 and convert to valide date so we can parse to graphql
    // by check the date is is after today
    const isInFuture = moment(date).isAfter(today);
    const formatDate = moment(date).format("YYYY-MM-DD").substring(0, 10);
    const isValidDate = moment(formatDate).isValid();

    if (!isValidDate) {
      console.log("Date is not valid!");
      return;
    }

    if (!isInFuture) {
      return formatDate.replace(formatDate.substring(0, 4), moment().year());
    } else {
      return formatDate;
    }
  }
}
