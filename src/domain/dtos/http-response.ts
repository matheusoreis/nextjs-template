export interface HttpResponseDto<T> {
	data?: T;
	error?: string | string[] | undefined;
}
