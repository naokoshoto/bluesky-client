export function abbriviateNumber(value: number) {
  const sign = value < 0 ? "-" : "";
  const number = Math.abs(value);

  if (number < 1000) {
    return `${sign}${number}`;
  }

  if (number < 1000000) {
    return `${sign}${Math.floor(number / 100) / 10}k`;
  }

  return `${sign}${Math.floor(number / 100000) / 10}m`;
}

export function getInitials(name: string) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter((n) => /^[A-Z]/i.test(n))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return initials;
}
