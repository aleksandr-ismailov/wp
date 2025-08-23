import {
	decamelize,
	has,
	isNumber,
	isObject,
	isString,
} from '@/shared/lib/common';
import { stringify } from 'qs';
import { ApiError, HttpStatusCode } from './types';

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
	if (isObject(error) && has('message', error) && isString(error.message)) {
		return {
			status:
				has('status', error) && isNumber(error.status)
					? error.status
					: HttpStatusCode.InternalServerError,
			message: error.message,
		};
	}

	if (
		isObject(error) &&
		has('data', error) &&
		isObject(error.data) &&
		has('message', error.data) &&
		isString(error.data.message)
	) {
		return {
			status:
				has('status', error.data) && isNumber(error.data.status)
					? error.data.status
					: HttpStatusCode.InternalServerError,
			message: error.data.message,
		};
	}

	return {
		status: HttpStatusCode.InternalServerError,
		message: 'An unexpected error occurred.',
	};
};

export const serializeParams = (params: Record<string, unknown>): string => {
	const paramsInSnakeCase = decamelize(params);
	return stringify(paramsInSnakeCase, { arrayFormat: 'brackets' });
};
