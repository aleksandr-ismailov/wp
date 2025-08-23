'use client';

import {
	BaseQueryFn,
	FetchArgs,
	createApi,
	fetchBaseQuery,
	type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { camelize, decamelize, has, isString } from '../../lib/common';
import { serializeParams } from '../lib';
import { baseUrl } from './config';
import { CacheTag } from './types';

const baseQuery = fetchBaseQuery({
	baseUrl,
	paramsSerializer: serializeParams,
	credentials: 'include',
});

const baseQueryWithTransformResponse: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions = {}) => {
	const fetchArgs = isString(args)
		? args
		: { ...args, params: args.params ? decamelize(args.params) : undefined };
	const result = await baseQuery(fetchArgs, api, extraOptions);
	const { data, meta, error } = result;

	if (has('error', result)) {
		return { data: undefined, error };
	}

	return { meta, data: camelize(data as Record<string, unknown>) };
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithTransformResponse,
	endpoints: () => ({}),
	tagTypes: Object.values(CacheTag),
});
