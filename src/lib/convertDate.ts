export function convertDate(date: Date, locale: string = "en-US"): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }
  return date.toLocaleString(locale, options)
}
