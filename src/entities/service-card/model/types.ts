export interface ServiceCardProps {
	title: string;
	price: string;
	setIsApplicationModalOpen?: (value: boolean) => void;
	duration: string;
	description: string;
	features: string[];
	backgroundImage: string;
	className?: string;
}
