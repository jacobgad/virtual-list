import type { ListItem } from "./utils";
import { useDeferredValue, useMemo, useState } from "react";
import { getFilteredList } from "./utils";

type Props = {
	list: ListItem[];
};

export default function SynchronousList({ list }: Props) {
	const [searchTerm, setSearchTerm] = useState("");
	const [enabled, setEnabled] = useState(false);

	const deferredSearchTerm = useDeferredValue(searchTerm);

	const filteredList = useMemo(() => {
		return getFilteredList(list, deferredSearchTerm, (item) => [item.name]);
	}, [deferredSearchTerm, list]);

	const enabledList: ListItem[] = enabled
		? filteredList
		: [{ id: 0, name: "Rendering is disabled" }];

	return (
		<main className="mx-auto my-6 max-w-2xl">
			<div className="flex justify-between">
				<h1>Synchronous List</h1>
				<label>
					<span className="mr-2">Enable Rendering</span>
					<input
						type="checkbox"
						name="synchronous-enabled"
						id="synchronous-enabled"
						checked={enabled}
						onChange={(e) => setEnabled(e.target.checked)}
					/>
				</label>
			</div>

			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
				className="selected:border-blue-400 mt-2 w-full rounded border px-4 py-1"
			/>
			<p className="mt-2 text-sm text-gray-500">
				Showing {filteredList.length} of {list.length} results
			</p>
			<ul className="mt-2 max-h-60 overflow-auto rounded border py-2">
				{enabledList.map((item) => (
					<li key={item.id} className="px-4 py-1 hover:bg-blue-100">
						{item.name}
					</li>
				))}
			</ul>
		</main>
	);
}
