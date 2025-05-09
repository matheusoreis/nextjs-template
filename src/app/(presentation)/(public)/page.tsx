"use server";

import { fetchUsersAction } from "@/app/actions/fetch-users";
import TesteComponente from "./teste";

export default async function HomePage() {
	const usersData = await fetchUsersAction();

	if (usersData.error) {
		return <p>{usersData.error}</p>;
	}

	return (
		<>
			{usersData.data?.map((u) => {
				return (
					<TesteComponente
						key={u.id}
						id={u.id}
						name={u.name}
						email={u.email}
						createdAt={u.createdAt}
						updatedAt={u.updatedAt}
					/>
				);
			})}
		</>
	);
}
