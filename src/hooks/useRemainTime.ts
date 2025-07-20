import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const useRemainTime = (open_at: string | null) => {
  const openAt = useMemo(
    () => (open_at ? dayjs(open_at).tz("Asia/Seoul") : null),
    [open_at]
  );

  const [remainTime, setRemainTime] = useState<number | null>(() => {
    if (!openAt) return null;
    const now = dayjs().tz("Asia/Seoul");
    const diff = openAt.diff(now);
    return diff > 0 ? diff : null;
  });

  const isLocked = remainTime !== null && remainTime > 0;

  useEffect(() => {
    if (!openAt || remainTime === null) return;

    const interval = setInterval(() => {
      const now = dayjs().tz("Asia/Seoul");
      const diff = openAt.diff(now);

      if (diff <= 0) {
        clearInterval(interval);
        setRemainTime(null);
      } else {
        setRemainTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [openAt, remainTime]);

  return { remainTime, isLocked };
};

export default useRemainTime;