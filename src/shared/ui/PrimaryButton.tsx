interface Props {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
}

const PrimaryButton: React.FC<Props> = ({ className, children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`cursor-pointer h-10 max-w-45 w-full p-2.5 rounded-[8px] bg-primary-gradient text-10 leading-100 text-white font-medium transition-all duration-300 hover:shadow-[0_4px_14px_0_rgba(233,65,144,0.39)] hover:scale-[1.02] active:scale-95 hover:brightness-105 ${className}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
