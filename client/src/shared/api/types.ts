export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export enum HttpStatusCode {
	Ok = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 204,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	UnprocessableEntity = 422,
	InternalServerError = 500,
}

export interface ApiError {
	status?: number;
	message: string;
}

export interface AuthResponse {
	accessToken: string;
	tokenType: string;
	expiresIn: number;
	user: {
		id: number;
		name: string;
		email: string;
	};
}

export interface Meta {
	count: number;
	totalCount: number;
	perPage: number;
	currentPage: number;
	totalPages: number;
}
