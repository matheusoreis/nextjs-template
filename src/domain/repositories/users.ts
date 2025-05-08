import type { UsersEntity } from "@/infrastructure/database/entities/sqlite/user";

export interface IUserRepository {
	fetch(): Promise<UsersEntity[]>;
}
