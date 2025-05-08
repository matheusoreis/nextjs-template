import type { HttpResponseDto } from "@/domain/dtos/http-response";
import { consumer } from "./consumer";

function handleRequestError<T>(axiosError: unknown): HttpResponseDto<T> {
	if (isAxiosError(axiosError) && axiosError.response) {
		const { message } = axiosError.response.data;

		return {
			error: Array.isArray(message) ? message : [message],
		};
	}

	return {
		error: "Unknown error",
	};
}

function isAxiosError(error: unknown): error is { response: { data: any } } {
	return (
		typeof error === "object" &&
		error !== null &&
		"response" in error &&
		typeof (error as any).response === "object"
	);
}

const http = async <T>(
	method: "get" | "post" | "patch" | "delete",
	url: string,
	options: {
		query?: Record<string, string | number | boolean | undefined>;
		token?: string;
		body?: any;
	} = {},
): Promise<HttpResponseDto<T>> => {
	const response: HttpResponseDto<T> = {};

	try {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		if (options.token) {
			headers.Authorization = `Bearer ${options.token}`;
		}

		const axiosOptions = {
			headers,
			params: options.query,
		};

		let res: any;
		if (method === "get" || method === "delete") {
			res = await consumer[method]<T>(url, axiosOptions);
		} else {
			res = await consumer[method]<T>(url, options.body, axiosOptions);
		}

		response.data = res.data;
	} catch (error: unknown) {
		response.error = handleRequestError<T>(error).error;
	}

	return response;
};

export function fetchData<T>(
	url: string,
	options?: { query?: any; token?: string },
) {
	return http<T>("get", url, options);
}

export function postData<T>(
	url: string,
	options?: { body?: any; token?: string },
) {
	return http<T>("post", url, options);
}

export function updateData<T>(
	url: string,
	options?: { body?: any; token?: string },
) {
	return http<T>("patch", url, options);
}

export function deleteData<T>(
	url: string,
	options?: { query?: any; token?: string },
) {
	return http<T>("delete", url, options);
}
