export default function parseHoursToMillis(hours) {
  if (hours.match("[0-9]{2}:[0-9]{2}")) {
    const hoursSplit = hours.split(":");
    const nHours = parseInt(hoursSplit[0]);
    const nMinutes = parseInt(hoursSplit[1]);

    const millis = (nHours * 3600 + nMinutes * 60) * 1000;
    return millis;
  } else {
    return 0;
  }
}
