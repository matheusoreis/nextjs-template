import { UsersEntity } from "@/infrastructure/database/entities/mariadb/user";
import { config } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

config();

const mariaDbDataSourceOptions: DataSourceOptions = {
	type: "mariadb",
	host: process.env.MARIA_DB_HOST || "127.0.0.1",
	port: Number(process.env.MARIA_DB_PORT) || 3306,
	username: process.env.MARIA_DB_USER || "mariadb",
	password: process.env.MARIA_DB_PASS || "mariadb3306",
	database: process.env.MARIA_DB_NAME || "mariadb",
	entities: [UsersEntity],
	logging: true,
	synchronize: false,
};

export const MariaDbDataSource = new DataSource(mariaDbDataSourceOptions);
