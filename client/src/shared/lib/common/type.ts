import { is, isNil } from 'ramda';

export { isNil, isNotNil } from 'ramda';

export const isString = is(String);
export const isNumber = is(Number);
export const isArray = is(Array);

export const isObject = (value: unknown): value is Record<string, unknown> =>
	is(Object)(value) && !isNil(value) && !isArray(value);

export { has } from 'ramda';
