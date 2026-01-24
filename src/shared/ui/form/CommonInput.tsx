import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: FieldError;
}

const CommonInput: React.FC<Props> = ({ label, error, className, ...props }) => {
	return (
		<div className="w-full">
			{label && <label className="block text-xs md:text-sm text-black-primary mb-2">{label}</label>}
			<input
				className={`w-full h-11 border-b border-[#E6E6E6]  px-4 py-3 text-sm md:text-base text-black-primary placeholder:text-[#9E9E9E] outline-none focus:border-black-primary transition-colors ${
					error ? "border-red-500" : ""
				} ${className}`}
				{...props}
			/>
			{error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
		</div>
	);
};

export default CommonInput;
