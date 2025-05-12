import { useEffect, useMemo, useState } from "react";

const useRemainTime = (open_at: string | null) => {
  const openAt = useMemo(() => (open_at ? new Date(open_at) : null), [open_at]);

  const [remainTime, setRemainTime] = useState<number | null>(() => {
    if (!openAt) return null;
    const now = new Date();
    const diff = openAt.getTime() - now.getTime();
    return diff > 0 ? diff : null;
  });

  const isLocked = remainTime !== null && remainTime > 0;

  useEffect(() => {
    if (!openAt || remainTime === null) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = openAt.getTime() - now.getTime();
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
