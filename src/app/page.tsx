import { authOptions } from "@/auth/options";
import ItemList from "@/components/ItemList";
import { processExcelResult } from "@/utils/spreadsheets";

import { getServerSession } from "next-auth";
import { headers } from "next/dist/client/components/headers";

const getItems = async () => {
	const headersList = headers();

	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/google/sheets`, {
		headers: {
			Cookie: headersList.get("cookie") as string,
		},
	});

	const jsonResponse = await response.json();
	return processExcelResult(jsonResponse.values);
};

export default async function Home() {
	const session = getServerSession(authOptions);
	const items = await getItems();

	return (
		<main className="h-full">
			<ItemList items={items} />
		</main>
	);
}
