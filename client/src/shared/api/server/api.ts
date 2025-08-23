import { camelize, decamelize, isNotNil } from '@/shared/lib/common';
import { getServerSession } from 'next-auth';
import { isNoContent, parseApiError, serializeParams } from '../lib';
import { HttpMethod } from '../types';
import { authOptions } from './auth-config';

export interface FetchDataOptions {
	path: string;
	method: HttpMethod;
	body?: Record<string, unknown>;
	params?: Record<string, unknown>;
	headers?: Record<string, string>;
}

export const fetchData = async <TResponse>(
	options: FetchDataOptions
): Promise<TResponse> => {
	const { path, method, body, params, headers } = options;
	const session = await getServerSession(authOptions);
	const hasBody = isNotNil(body) && method !== 'GET';

	const baseUrl =
		process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'http://localhost:8888';
	const url = new URL(path, baseUrl);

	if (params) {
		url.search = serializeParams(params);
	}

	const authHeaders: Record<string, string> = {};
	if (session?.accessToken) {
		authHeaders.Authorization = `Bearer ${session.accessToken}`;
	}

	try {
		const requestHeaders = {
			Accept: 'application/json',
			...(hasBody && { 'Content-Type': 'application/json' }),
			...authHeaders,
			...headers,
		};

		const response = await fetch(url.toString(), {
			method,
			credentials: 'include',
			body: hasBody ? JSON.stringify(decamelize(body)) : undefined,
			headers: requestHeaders,
		});

		if (!response.ok) {
			const contentType = response.headers.get('content-type');
			const responseText = await response.text();

			// TODO: refactor this
			let errorData: unknown;
			try {
				if (contentType?.includes('application/json')) {
					errorData = JSON.parse(responseText);
				} else {
					errorData = {
						status: response.status,
						message: 'Server error',
					};
				}
			} catch {
				errorData = {
					status: response.status,
					message: 'Server error',
				};
			}

			throw parseApiError(errorData);
		}

		if (isNoContent(response.status)) {
			return {} as TResponse;
		}

		const contentType = response.headers.get('content-type');
		if (!contentType?.includes('application/json')) {
			throw new Error('Invalid response type');
		}

		const responseText = await response.text();

		try {
			const data = JSON.parse(responseText);
			return camelize(data as Record<string, unknown>) as TResponse;
		} catch {
			throw new Error('Failed to parse response');
		}
	} catch (e) {
		throw e;
	}
};
