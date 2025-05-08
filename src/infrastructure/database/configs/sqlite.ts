import { config } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

config();

const sqliteDataSourceOptions: DataSourceOptions = {
	type: "sqlite",
	database: process.env.SQLITE_DB_PATH ?? "database.sqlite",
	entities: ["src/infrastructure/database/entities/sqlite/*.ts"],
	migrations: ["src/infrastructure/database/migrations/sqlite/*.ts"],
	logging: true,
	synchronize: false,
};

export default new DataSource(sqliteDataSourceOptions);
