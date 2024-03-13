export function convertDate(date: Date, locale: string = "es"): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString(locale, options)
}
