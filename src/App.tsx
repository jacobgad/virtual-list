import { useMemo, useState } from "react";
import { generateList } from "./utils";
import SynchronousList from "./SynchronousList";
import VirtualList from "./VirtualList";

const MAX_LENGTH = 100000;

const list = generateList(MAX_LENGTH);

export default function App() {
	const [length, setLength] = useState(20000);

	const partialList = useMemo(() => {
		return list.slice(0, length);
	}, [length]);

	return (
		<main className="mx-auto my-6 max-w-2xl">
			<label className="flex items-center gap-2">
				<span>Total Items</span>
				<input
					type="range"
					name="list-length"
					id="list-length"
					min={0}
					max={MAX_LENGTH}
					value={length}
					onChange={(e) => setLength(Number(e.target.value))}
					step={1000}
				/>
				<span className="inline-block">{length}</span>
			</label>

			<SynchronousList list={partialList} />
			<VirtualList list={partialList} />
		</main>
	);
}
