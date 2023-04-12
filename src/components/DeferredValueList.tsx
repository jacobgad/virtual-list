import type { GenerateListItem } from "../utils";
import { formatList } from "../utils";
import { useDeferredValue, useMemo, useState } from "react";
import { getFilteredList } from "../utils";
import ListItem from "./ui/ListItem";
import TextInput from "./ui/TextInput";

type Props = {
	list: GenerateListItem[];
};

export default function DeferredValueList({ list }: Props) {
	const [searchTerm, setSearchTerm] = useState("");
	const [enabled, setEnabled] = useState(false);

	const deferredSearchTerm = useDeferredValue(searchTerm);

	const filteredList = useMemo(() => {
		return getFilteredList(list, deferredSearchTerm, (item) => [item.name]);
	}, [deferredSearchTerm, list]);

	const renderedList = useMemo(() => {
		return formatList(filteredList, enabled);
	}, [filteredList, enabled]);

	return (
		<section>
			<div className="flex justify-between">
				<h1>Deferred Value List</h1>
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
				The implementation builds on the synchronous list and adds React&#39;s useDeferredValue hook
				to effectively debounce the input and inform react to deprioritise the rendering of the
				filtered list.
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
