export const generateTimes = (start: number, end: number) => {
  const times: string[] = [];
  for (let hour = start; hour <= end; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return times;
};

export const defaultAvailability = [
  ...generateTimes(8, 11), // manhã
  ...generateTimes(14, 17), // tarde
];
