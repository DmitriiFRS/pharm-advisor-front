interface Props {
	className?: string;
}

const GrayLine: React.FC<Props> = ({ className }) => {
	return <div className={`h-px w-full bg-black-primary opacity-[0.15] ${className}`} />;
};

export default GrayLine;
