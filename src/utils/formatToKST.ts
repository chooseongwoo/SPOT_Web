import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function formatToKST(date: string | Date, format: string) {
  return dayjs(date).tz("Asia/Seoul").format(format);
}
