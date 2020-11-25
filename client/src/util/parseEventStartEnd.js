export default function parseEventStardEnd(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const localeStartDate = startDate.toLocaleDateString();
  const localeEndDate = endDate.toLocaleDateString();
  const startHourSplit = startDate.toLocaleTimeString().split(":");
  const startHour = `${startHourSplit[0]}:${startHourSplit[1]}h`;
  const endHourSplit = endDate.toLocaleTimeString().split(":");
  const endHour = `${endHourSplit[0]}:${endHourSplit[1]}h`;
  return `${localeStartDate} ${startHour} - ${localeEndDate} ${endHour}`;
}
