import { UsersEntity } from "@/infrastructure/database/entities/sqlite/user";
import type { IUserRepository } from "@/domain/repositories/users";
import dataSource from "@/infrastructure/database/datasources/sqlite";

export class UserRepository implements IUserRepository {
	async fetch(): Promise<UsersEntity[]> {
		const db = await dataSource.initialize();

		try {
			return await db.getRepository(UsersEntity).find();
		} catch (error) {
			throw new Error(`Não foi possível buscar as unidades. Erro: ${error}`);
		} finally {
			await db.destroy();
		}
	}
}
