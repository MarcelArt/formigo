import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function standardDateTime(date: string): string {
	return new Date(date).toLocaleString('en-GB');
}