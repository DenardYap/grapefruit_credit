export function getISO8601Date() {
  const date = new Date(new Date().toISOString());
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDate = date.toLocaleString(undefined, options);

  return formattedDate;
}
