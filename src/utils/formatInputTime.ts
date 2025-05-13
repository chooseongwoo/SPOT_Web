const formatInputTime = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  const parts = [digits.slice(0, 2), digits.slice(2, 4)];
  return parts.filter(Boolean).join(":");
};

export default formatInputTime;
