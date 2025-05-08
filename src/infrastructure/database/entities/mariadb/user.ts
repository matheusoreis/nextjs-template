import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UsersEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "name", type: "varchar", length: 255 })
	name: string;

	@Column({ name: "email", type: "varchar", length: 255, unique: true })
	email: string;

	@Column({ name: "password", type: "varchar", length: 255 })
	password: string;

	@CreateDateColumn({ name: "created_at", type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamp" })
	updatedAt: Date;
}
