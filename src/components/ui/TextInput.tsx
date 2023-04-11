import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

type Props = VariantProps<typeof textInputStyles> &
	Omit<React.ComponentPropsWithoutRef<"input">, "type">;

const textInputStyles = cva("mt-2 w-full rounded border px-4 py-1");

export default function TextInput(inputProps: Props) {
	return <input {...inputProps} type="text" className={textInputStyles()} />;
}
