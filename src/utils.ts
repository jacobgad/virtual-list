import { faker } from "@faker-js/faker";

export type ListItem = ReturnType<typeof generateList>[number];

export function generateList(length: number) {
	const list = [];
	for (let i = 0; i < length; i++) {
		list.push({ id: i, name: faker.name.fullName() });
	}
	return list;
}

export function getFilteredList<T>(
	list: Array<T>,
	search: string,
	getSearchableFields: (item: T) => string[]
) {
	const keywords = search
		.toLocaleLowerCase()
		.split(" ")
		.filter((s) => s !== "");

	if (keywords.length === 0) return list;

	return list.filter((item) => {
		const words = getSearchableFields(item).join(" ").toLocaleLowerCase().split(" ");
		return keywords.every((kw) => words.some((w) => w.startsWith(kw)));
	});
}
