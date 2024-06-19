export default function cutTime(dateString: Date) {
  const date = new Date(dateString);

  date.setHours(date.getHours() + 2);

  const dateInString = date.toISOString().split("T");

  return `${dateInString[0]} ${dateInString[1].slice(0, -5)}`;
}
