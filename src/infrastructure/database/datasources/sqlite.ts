import { UsersEntity } from "@/infrastructure/database/entities/sqlite/user";
import { config } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

config();

const sqliteDataSourceOptions: DataSourceOptions = {
	type: "sqlite",
	database: process.env.SQLITE_DB_PATH ?? "database.sqlite",
	entities: [UsersEntity],
	logging: true,
	synchronize: false,
};

export default new DataSource(sqliteDataSourceOptions);
