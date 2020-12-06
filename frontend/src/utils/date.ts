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

export const quarters = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

export const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const weekendDaysOfMonth = (month: number, year: number): number[] => {
  const isWeekend = (dateOfDay: number) => dateOfDay === 0 || dateOfDay === 6;
  const daysInThisMonth = daysInMonth(year, month);
  const dateOfFirstDay = new Date(year, month, 0).getDay();
  const weekendDays = [];

  let currentWeekendDay: number = 5;

  for (let i = 0; i++; i < 5) {
    if (isWeekend(dateOfFirstDay + i)) {
      currentWeekendDay = i;
      break;
    }
  }

  weekendDays.push(currentWeekendDay);

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

export const getCurrentQuarter = (date: Date): number[] => {
  var month = date.getMonth() + 1;
  return quarters[Math.ceil(month / 3) - 1];
};
