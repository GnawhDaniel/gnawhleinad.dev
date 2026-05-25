export function formatDateCST(date: Date, delimiter: string = "-", time: boolean = true): string {
  const cst = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Chicago" }),
  );

  const yyyy = cst.getFullYear();
  const mm = String(cst.getMonth() + 1).padStart(2, "0");
  const dd = String(cst.getDate()).padStart(2, "0");

  let hours = cst.getHours();
  const minutes = String(cst.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const HH = String(hours)

  if (time) {
    return `${yyyy}${delimiter}${mm}${delimiter}${dd} @ ${HH}:${minutes}${ampm}`;
  }
  return `${yyyy}${delimiter}${mm}${delimiter}${dd}`;
}