import { isObject } from '@/shared/lib/common';
import { ApiError, HttpStatusCode } from '../types';

export const isBadRequest = (status: number): boolean => {
	return status === HttpStatusCode.BadRequest;
};

export const isNotAuthenticated = (status: number): boolean => {
	return status === HttpStatusCode.Unauthorized;
};

export const isNotFound = (status: number): boolean => {
	return status === HttpStatusCode.NotFound;
};

export const isNoContent = (status: number): boolean => {
	return status === HttpStatusCode.NoContent;
};

export const parseApiError = (error: unknown): ApiError => {
	if (
		isObject(error) &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return {
			status:
				'status' in error && typeof error.status === 'number'
					? error.status
					: 500,
			message: error.message,
		};
	}

	if (
		isObject(error) &&
		'data' in error &&
		isObject(error.data) &&
		'message' in error.data &&
		typeof error.data.message === 'string'
	) {
		return {
			status:
				'status' in error.data && typeof error.data.status === 'number'
					? error.data.status
					: 500,
			message: error.data.message,
		};
	}

	return {
		status: 500,
		message: 'An unexpected error occurred.',
	};
};
