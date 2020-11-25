export default function parseMillisToHours(millis) {
  const seconds = millis / 1000;
  const minutes = seconds / 60;
  let minutesDisplay = minutes % 60;
  let hoursDisplay = parseInt(minutes / 60);

  if (hoursDisplay < 10) {
    hoursDisplay = addLeadingZero(hoursDisplay);
  }

  if (minutesDisplay < 10) {
    minutesDisplay = addLeadingZero(minutesDisplay);
  }

  return `${hoursDisplay}:${minutesDisplay}`;
}

function addLeadingZero(number) {
  return `0${number}`;
}
