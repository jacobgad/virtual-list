import { useMemo, useState } from "react";
import { generateList } from "./utils";
import SynchronousList from "./components/SynchronousList";
import VirtualList from "./components/VirtualList";
import DeferredValueList from "./components/DeferredValueList";
import GithubButton from "./components/ui/GithubButton";

const MAX_LENGTH = 100000;

const list = generateList(MAX_LENGTH);

export default function App() {
	const [length, setLength] = useState(20000);

	const partialList = useMemo(() => {
		return list.slice(0, length);
	}, [length]);

	return (
		<main className="mx-auto max-w-2xl px-4 pb-24 pt-12">
			<div className="flex justify-between">
				<h1 className="text-xl">Rending large lists in react</h1>
				<GithubButton />
			</div>
			<div className="mt-4 space-y-2 text-justify text-sm text-gray-500">
				<p>
					This is a short demo to answer a few performance questions I had about rendering large
					lists in react. The main question is to test what list size does react&#39;s paint become
					the performance bottleneck as opposed to the filtering algorithm?
				</p>
				<p>
					You can see below that the slow down of the Synchronous and Deferred lists is not due to
					the efficiency of the filtering algorithm itself, but rather that they both need to render
					every list item to the DOM. You can test this yourself by disabling rendering and
					observing how the list is still being filtered live as you type in the search field.
				</p>
				<p>
					This means that by utilising Virtual Lists, we are able to reduce the complexity of
					rendering long lists from O(n) liner time, to O(1) constant time.
				</p>
				<p>
					<b>Disclaimer:</b> I would avoid changing the list size when rendering is enabled on the
					non-virtualized lists.
				</p>
			</div>

			<label className="my-6 flex items-center gap-2">
				<span>List length</span>
				<input
					type="range"
					name="list-length"
					id="list-length"
					min={1000}
					max={MAX_LENGTH}
					value={length}
					onChange={(e) => setLength(Number(e.target.value))}
					step={1000}
				/>
				<span className="inline-block">{length}</span>
			</label>

			<VirtualList list={partialList} />
			<hr className="my-8" />
			<DeferredValueList list={partialList} />
			<hr className="my-8" />
			<SynchronousList list={partialList} />
		</main>
	);
}
