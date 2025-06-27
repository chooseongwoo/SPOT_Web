export default function formatDateKSTForDB(date: string | number | Date): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' });
}
