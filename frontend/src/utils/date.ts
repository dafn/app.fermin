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

/**
 * for 2021
 */
export const norwegianHolydays = {
  0: [1],
  1: [],
  2: [],
  3: [1, 2, 4, 5],
  4: [1, 13, 17, 23, 24],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [31],
  10: [],
  11: [24, 25, 26, 31],
};

export const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const weekendDaysOfMonth = (year: number, month: number): number[] => {
  const isWeekend = (day: number) => day === 0 || day === 6;
  const daysInThisMonth = daysInMonth(year, month);
  const weekendDays = [];

  let currentWeekendDay = 5;

  for (let i = 0; i < 5; i++) {
    if (isWeekend(new Date(year, month, i).getDay())) {
      currentWeekendDay = i;
      break;
    }
  }

  while (true) {
    weekendDays.push(currentWeekendDay);
    currentWeekendDay += 1;

    weekendDays.push(currentWeekendDay);
    currentWeekendDay += 6;

    if (currentWeekendDay > daysInThisMonth) {
      break;
    }
  }

  return weekendDays;
};

export const getCurrentQuarter = (date: Date): number[] => {
  var month = date.getMonth() + 1;
  return quarters[Math.ceil(month / 3) - 1];
};
