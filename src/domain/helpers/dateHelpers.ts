export const convertDateToString = (
  day: number,
  month: number,
  year: number
): string =>
  `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
