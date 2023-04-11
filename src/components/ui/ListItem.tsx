import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

type Props = VariantProps<typeof listItemStyles> & React.ComponentPropsWithoutRef<"li">;

const listItemStyles = cva("px-4 py-1", {
	variants: {
		disabled: {
			true: "text-gray-500",
			false: "hover:bg-blue-100",
		},
	},
	defaultVariants: {
		disabled: false,
	},
});

export default function ListItem({ disabled, ...liProps }: Props) {
	return (
		<li {...liProps} className={listItemStyles({ disabled, className: liProps.className })}>
			{liProps.children}
		</li>
	);
}
