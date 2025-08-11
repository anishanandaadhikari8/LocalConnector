export const toIso = (d: Date) => d.toISOString();
export const addHours = (d: Date, h: number) => new Date(d.getTime() + h * 60 * 60 * 1000);
export const addMinutes = (d: Date, m: number) => new Date(d.getTime() + m * 60 * 1000);


