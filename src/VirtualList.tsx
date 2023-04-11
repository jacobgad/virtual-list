import type { ListItem } from "./utils";
import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getFilteredList } from "./utils";

type Props = {
	list: ListItem[];
};

export default function VirtualList({ list }: Props) {
	const parentRef = useRef(null);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredList = useMemo(() => {
		return getFilteredList(list, searchTerm, (item) => [item.name]);
	}, [searchTerm, list]);

	const rowVirtualizer = useVirtualizer({
		count: filteredList.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 32,
		overscan: 25,
	});

	return (
		<section>
			<h1>Virtual List</h1>

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
			<div ref={parentRef} className="mt-2 max-h-60 overflow-auto rounded border py-2">
				<ul
					ref={parentRef}
					className="relative"
					style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
				>
					{rowVirtualizer.getVirtualItems().map((virtualItem) => (
						<li
							key={virtualItem.key}
							className="absolute w-full px-4 py-1 hover:bg-blue-100"
							style={{
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`,
							}}
						>
							{filteredList[virtualItem.index]?.name}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
