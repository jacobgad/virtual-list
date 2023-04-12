import type { GenerateListItem } from "../utils";
import { formatList } from "../utils";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getFilteredList } from "../utils";
import ListItem from "./ui/ListItem";
import TextInput from "./ui/TextInput";

type Props = {
	list: GenerateListItem[];
};

export default function VirtualList({ list }: Props) {
	const parentRef = useRef(null);
	const [searchTerm, setSearchTerm] = useState("");

	const deferredSearchTerm = useDeferredValue(searchTerm);

	const filteredList = useMemo(() => {
		return getFilteredList(list, deferredSearchTerm, (item) => [item.name]);
	}, [deferredSearchTerm, list]);

	const renderedList = useMemo(() => {
		return formatList(filteredList);
	}, [filteredList]);

	const rowVirtualizer = useVirtualizer({
		count: renderedList.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 32,
		overscan: 25,
	});

	return (
		<section>
			<h1>Virtual List</h1>
			<p className="my-2 text-sm text-gray-500">
				The implementation builds on the deferred value list, but critically instead of rendering
				every list item, it virtualizes the list. At any point there are no more than 30 list items
				that are rendered to the screen. Virtualization is implemented with the{" "}
				<a href="https://tanstack.com/virtual/v3" className="font-semibold text-blue-600">
					Tanstack Virtual
				</a>{" "}
				library.
			</p>
			<TextInput
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
			/>
			<p className="mt-2 text-sm text-gray-500">
				Showing {filteredList.length} of {list.length} results
			</p>
			<div ref={parentRef} className="mt-2 max-h-60 overflow-auto rounded border py-2">
				<ul ref={parentRef} className="relative" style={{ height: rowVirtualizer.getTotalSize() }}>
					{rowVirtualizer.getVirtualItems().map((virtualItem) => (
						<ListItem
							key={virtualItem.key}
							disabled={filteredList.length === 0}
							className="absolute w-full"
							style={{
								height: virtualItem.size,
								transform: `translateY(${virtualItem.start}px)`,
							}}
						>
							{renderedList[virtualItem.index].name}
						</ListItem>
					))}
				</ul>
			</div>
		</section>
	);
}
