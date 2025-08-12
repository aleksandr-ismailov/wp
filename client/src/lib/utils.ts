import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isNotNil = <T>(value: T | null | undefined): value is T => {
	return value != null;
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

export const camelize = (str: string): string => {
	return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const camelizeKeys = (
	obj: Record<string, unknown>
): Record<string, unknown> => {
	if (!isObject(obj)) return obj;

	const result: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(obj)) {
		const camelKey = camelize(key);

		if (Array.isArray(value)) {
			result[camelKey] = value.map((item) =>
				isObject(item) ? camelizeKeys(item) : item
			);
		} else if (isObject(value)) {
			result[camelKey] = camelizeKeys(value);
		} else {
			result[camelKey] = value;
		}
	}

	return result;
};

export const decamelize = (str: string): string => {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const decamelizeKeys = (
	obj: Record<string, unknown>
): Record<string, unknown> => {
	if (!isObject(obj)) return obj;

	const result: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(obj)) {
		const snakeKey = decamelize(key);

		if (Array.isArray(value)) {
			result[snakeKey] = value.map((item) =>
				isObject(item) ? decamelizeKeys(item) : item
			);
		} else if (isObject(value)) {
			result[snakeKey] = decamelizeKeys(value);
		} else {
			result[snakeKey] = value;
		}
	}

	return result;
};
