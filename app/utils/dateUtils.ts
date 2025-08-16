// utils/dateUtils.ts

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper function to get the days in a month
export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
export const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

// Format date as "DayOfWeek, Month Day, Year"
export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
