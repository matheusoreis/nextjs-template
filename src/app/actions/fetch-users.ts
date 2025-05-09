import type { DatabaseResponse } from "@/domain/dtos/database-response";
import type { UsersEntity } from "@/infrastructure/database/entities/sqlite/user";
import { UserRepository } from "@/infrastructure/repositories/users";
import { UserUseCase } from "../usecases/users";

export async function fetchUsersAction(): Promise<DatabaseResponse<UsersEntity[]>> {
	const useCase = new UserUseCase(new UserRepository());
	const response = await useCase.fetch();

	if (response.error) {
		return {
			error: response.error,
		};
	}

	return { data: response.data };
}
