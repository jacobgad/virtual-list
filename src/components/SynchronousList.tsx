import type { GenerateListItem } from "../utils";
import { formatList } from "../utils";
import { useMemo, useState } from "react";
import { getFilteredList } from "../utils";
import ListItem from "./ui/ListItem";
import TextInput from "./ui/TextInput";

type Props = {
	list: GenerateListItem[];
};

export default function SynchronousList({ list }: Props) {
	const [searchTerm, setSearchTerm] = useState("");
	const [enabled, setEnabled] = useState(false);

	const filteredList = useMemo(() => {
		return getFilteredList(list, searchTerm, (item) => [item.name]);
	}, [searchTerm, list]);

	const renderedList = useMemo(() => {
		return formatList(filteredList, enabled);
	}, [filteredList, enabled]);

	return (
		<section>
			<div className="flex justify-between">
				<h1>Synchronous List</h1>
				<label className="flex items-center gap-2 text-sm">
					<span>Enable Rendering</span>
					<input
						type="checkbox"
						name="synchronous-enabled"
						id="synchronous-enabled"
						checked={enabled}
						onChange={(e) => setEnabled(e.target.checked)}
						className="rounded-sm"
					/>
				</label>
			</div>
			<p className="my-2 text-sm text-gray-500">
				The implementation is to wrap the filtered list with a Rect useMemo hook and have the
				controlled input value in the dependency array.
			</p>

			<TextInput
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
			/>
			<p className="mt-2 text-sm text-gray-500">
				Showing {filteredList.length} of {list.length} results
			</p>
			<ul className="mt-2 max-h-60 overflow-auto rounded border py-2">
				{renderedList.map((item) => (
					<ListItem key={item.id} disabled={!enabled || filteredList.length === 0}>
						{item.name}
					</ListItem>
				))}
			</ul>
		</section>
	);
}
