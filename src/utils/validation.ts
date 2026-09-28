export const isValidPhone = (value: string) => /^[6-9]\d{9}$/.test(value);

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);