const isDateRange = (date: string): boolean => date.indexOf("BET") === 0;

const parseDateRange = (dateRange: string): [number, number] => {
  const [, fromStr, , toStr] = dateRange.split(" ");
  return [parseInt(fromStr, 10), parseInt(toStr, 10)];
};

export const getIsBornBeforeEnd = (endDate: number, dateOfBirth?: string) => {
  if (!dateOfBirth) {
    return true;
  }
  if (!isDateRange(dateOfBirth)) {
    return parseInt(dateOfBirth, 10) <= endDate;
  }
  const [minDate] = parseDateRange(dateOfBirth);
  return minDate <= endDate;
};

export const getIsAliveAfterStart = (startDate: number, dateOfDeath?: string) => {
  if (!dateOfDeath || dateOfDeath === "1") {
    return true;
  }
  if (!isDateRange(dateOfDeath)) {
    return parseInt(dateOfDeath, 10) >= startDate;
  }
  const [,maxDate] = parseDateRange(dateOfDeath);
  return maxDate >= startDate;
};