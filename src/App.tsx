import { useMemo, useState } from "react";
import { generateList } from "./utils";
import SynchronousList from "./components/SynchronousList";
import VirtualList from "./components/VirtualList";

const MAX_LENGTH = 100000;

const list = generateList(MAX_LENGTH);

export default function App() {
	const [length, setLength] = useState(20000);

	const partialList = useMemo(() => {
		return list.slice(0, length);
	}, [length]);

	return (
		<main className="mx-auto max-w-2xl px-4 py-6">
			<label className="mb-4 flex items-center gap-2">
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

			<VirtualList list={partialList} />
			<hr className="my-8" />
			<SynchronousList list={partialList} />
		</main>
	);
}
