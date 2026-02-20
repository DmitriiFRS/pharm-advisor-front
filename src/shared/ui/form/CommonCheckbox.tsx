import { Control, Controller, FieldError, Path, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface Props<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	error?: FieldError;
	className?: string;
	children?: React.ReactNode;
}

const CommonCheckbox = <T extends FieldValues>({ control, name, error, className, children }: Props<T>) => {
	return (
		<div className={`flex flex-col gap-1 mt-1 ${className || ""}`}>
			<div className="flex items-start space-x-3">
				<Controller
					name={name}
					control={control}
					render={({ field }) => <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} className="mt-1" />}
				/>
				{children && (
					<label
						htmlFor={name}
						className="text-11 cursor-pointer leading-150 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#212121]"
					>
						{children}
					</label>
				)}
			</div>
			{error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
		</div>
	);
};

export default CommonCheckbox;
