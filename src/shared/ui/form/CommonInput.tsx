import { InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: FieldError;
	labelClassName?: string;
	withPasswordToggle?: boolean;
}

const CommonInput: React.FC<Props> = ({ label, error, className, labelClassName, withPasswordToggle, type, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	const inputType = withPasswordToggle && type === "password" ? (showPassword ? "text" : "password") : type;

	return (
		<div className="w-full relative">
			{label && <label className={`block text-11 text-black-primary mb-2 ${labelClassName}`}>{label}</label>}
			<div className="relative">
				<input
					{...props}
					type={inputType}
					className={`w-full h-11 border-b border-[#E6E6E6] rounded-[5px] px-4 py-3 text-sm md:text-base text-black-primary placeholder:text-[#9E9E9E] outline-none focus:border-black-primary transition-colors ${
						error ? "border-red-500" : ""
					} ${className} ${withPasswordToggle ? "pr-10" : ""}`}
				/>
				{withPasswordToggle && type === "password" && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				)}
			</div>

			{error && <span className="text-red-500 text-xs mt-1 block">{error.message}</span>}
		</div>
	);
};

export default CommonInput;
