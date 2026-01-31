import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Control, Controller, FieldError, Path, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	error?: FieldError;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
}

const CommonPhoneInput = <T extends FieldValues>({ control, name, label, error, placeholder, className, inputClassName }: Props<T>) => {
	return (
		<div className={`w-full ${className || ""}`}>
			{label && <label className="block text-11 text-black-primary mb-2">{label}</label>}
			<div className="w-full">
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value } }) => (
						<PhoneInput
							country={"uz"}
							placeholder={placeholder}
							value={value}
							onChange={(phone) => onChange(`+${phone}`)}
							inputClass={`!w-full !h-11 !border-t-0 !border-x-0 !border-b !border-[#E6E6E6] !bg-transparent !pl-[48px] !pr-4 !py-3 !text-12 !text-black-primary !placeholder-[#9E9E9E] !outline-none !rounded-none focus:!border-black-primary !transition-colors ${
								error ? "!border-red-500" : ""
							} ${inputClassName}`}
							buttonClass="!border-b !border-[#E6E6E6] !bg-transparent !rounded-none !border-t-0 !border-l-0 !border-r-0"
							dropdownClass="!bg-white !shadow-none !rounded-lg"
						/>
					)}
				/>
			</div>
			{error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
		</div>
	);
};

export default CommonPhoneInput;
