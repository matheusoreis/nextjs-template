import type { DatabaseResponse } from "@/domain/dtos/database-response";
import type { IUserRepository } from "@/domain/repositories/users";
import type { UsersEntity } from "@/infrastructure/database/entities/sqlite/user";

export class UserUseCase {
	constructor(private unitsRepository: IUserRepository) {}

	async fetch(): Promise<DatabaseResponse<UsersEntity[]>> {
		try {
			return {
				data: await this.unitsRepository.fetch(),
			};
		} catch (e) {
			const error = e instanceof Error ? e.message : "Erro ao buscar os usuários";
			return {
				error,
			};
		}
	}
}
