import { HttpMethod } from '@/types/api';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { isNoContent, parseApiError } from './api-lib';
import { authOptions } from './auth';
import { camelizeKeys, decamelizeKeys, isNotNil, isObject } from './utils';

const WORDPRESS_API_BASE = process.env.WORDPRESS_URL || 'http://localhost:8888';

export const fetchData = async < TResponse extends object >(
	path: string,
	method: HttpMethod,
	body?: Record< string, unknown >,
	headers?: Record< string, string >
): Promise< TResponse > => {
	const session = ( await getServerSession( authOptions ) ) as Session | null;
	const hasBody = isNotNil( body ) && method !== 'GET';

	if ( ! session?.user?.username || ! session?.user?.password ) {
		throw new Error( 'No authentication credentials available' );
	}

	const basicAuth = btoa(
		`${ session.user.username }:${ session.user.password }`
	);

	const searchParams = new URLSearchParams();
	searchParams.set( 'rest_route', path );

	if ( method === 'GET' && body ) {
		Object.entries( body ).forEach( ( [ key, value ] ) => {
			if ( value !== undefined && value !== null ) {
				searchParams.set( key, String( value ) );
			}
		} );
	}

	const url = `${ WORDPRESS_API_BASE }/index.php?${ searchParams.toString() }`;

	const response = await fetch( url, {
		method,
		credentials: 'include',
		body: hasBody ? JSON.stringify( decamelizeKeys( body ) ) : undefined,
		headers: {
			...( hasBody && { 'Content-Type': 'application/json' } ),
			Authorization: `Basic ${ basicAuth }`,
			...( headers ?? {} ),
		},
	} );

	if ( ! response.ok ) {
		const data: unknown = await response.json();
		throw parseApiError( data );
	}

	if ( isNoContent( response.status ) ) {
		return {} as TResponse;
	}

	const data: unknown = await response.json();

	if ( ! isObject( data ) ) {
		throw new Error( 'API response is not an object' );
	}

	return camelizeKeys( data ) as TResponse;
};

export const fetchPublicData = async < TResponse extends object >(
	path: string,
	method: HttpMethod = 'GET',
	body?: Record< string, unknown >
): Promise< TResponse > => {
	const hasBody = isNotNil( body ) && method !== 'GET';

	const searchParams = new URLSearchParams();
	searchParams.set( 'rest_route', path );

	if ( method === 'GET' && body ) {
		Object.entries( body ).forEach( ( [ key, value ] ) => {
			if ( value !== undefined && value !== null ) {
				searchParams.set( key, String( value ) );
			}
		} );
	}

	const url = `${ WORDPRESS_API_BASE }/index.php?${ searchParams.toString() }`;

	const response = await fetch( url, {
		method,
		body: hasBody ? JSON.stringify( decamelizeKeys( body ) ) : undefined,
		headers: {
			...( hasBody && { 'Content-Type': 'application/json' } ),
		},
	} );

	if ( ! response.ok ) {
		const data: unknown = await response.json();
		throw parseApiError( data );
	}

	if ( isNoContent( response.status ) ) {
		return {} as TResponse;
	}

	const data: unknown = await response.json();

	if ( ! isObject( data ) ) {
		throw new Error( 'API response is not an object' );
	}

	return camelizeKeys( data ) as TResponse;
};
