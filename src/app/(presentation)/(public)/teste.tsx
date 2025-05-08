"use client";

import type { UsersEntity } from "@/domain/entities/users";

export default function TesteComponente({ id, name, email, createdAt, updatedAt }: UsersEntity) {
	return (
		<div>
			<p>Id: {id}</p>
			<p>Nome: {name}</p>
			<p>Email: {email}</p>
			<p>Criado Em: {new Date(createdAt).toLocaleString("pt-BR")}</p>
			<p>Atualizado Em: {new Date(updatedAt).toLocaleString("pt-BR")}</p>
		</div>
	);
}
