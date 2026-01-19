interface Props {
	className?: string;
	children: React.ReactNode;
}

const PrimaryButton: React.FC<Props> = ({ className, children }) => {
	return (
		<button
			className={`cursor-pointer h-10 max-w-45 w-full p-2.5 rounded-[8px] bg-primary-gradient text-10 leading-100 font-medium ${className}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
