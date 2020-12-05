export const months = [
  "Januar",
  "februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const isWeekend = (year, month, day) => {
  const dateOfDay = new Date(year, month, day).getDay();
  return dateOfDay === 0 || dateOfDay === 6;
};

export const weekendDaysOfMonth = (month: number, year: number) => {
  const daysInThisMonth = daysInMonth(year, month);
  const weekendDays = [];
  let currentWeekendDay: number;

  for (let i = 0; i++; i < 5) {
    if (isWeekend(year, month, i)) {
      currentWeekendDay = i;
      break;
    }
  }

  if (typeof currentWeekendDay !== "number") {
    currentWeekendDay = 5;
    weekendDays.push(currentWeekendDay);
  }

  if (currentWeekendDay === 5) {
    currentWeekendDay += 1;
    weekendDays.push(currentWeekendDay);
  }

  while (true) {
    if (currentWeekendDay + 6 > daysInThisMonth) {
      break;
    }
    currentWeekendDay += 6;
    weekendDays.push(currentWeekendDay);

    if (currentWeekendDay + 1 > daysInThisMonth) {
      break;
    }
    currentWeekendDay += 1;
    weekendDays.push(currentWeekendDay);
  }
  return weekendDays;
};
