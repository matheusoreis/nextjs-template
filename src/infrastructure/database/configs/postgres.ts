import { config } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

config();

const postgresDataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_DB_HOST ?? "127.0.0.1",
	port: Number(process.env.POSTGRES_DB_PORT) ?? 5432,
	username: process.env.POSTGRES_DB_USER ?? "postgres",
	password: process.env.POSTGRES_DB_PASS ?? "postgres5432",
	database: process.env.POSTGRES_DB_NAME ?? "postgres",
	schema: process.env.POSTGRES_DB_SCHEMA ?? "public",
	entities: ["src/infrastructure/database/entities/postgres/*.ts"],
	migrations: ["src/infrastructure/database/migrations/postgres/*.ts"],
	logging: true,
	synchronize: false,
};

export default new DataSource(postgresDataSourceOptions);
