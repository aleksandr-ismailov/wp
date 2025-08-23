import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

export const camelize = (data: Record<string, unknown>) =>
	camelcaseKeys(data, { deep: true });

export const decamelize = (data: Record<string, unknown>) =>
	decamelizeKeys(data, { deep: true });
