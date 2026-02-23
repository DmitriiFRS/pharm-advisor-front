export interface ServiceCardProps {
	title: string;
	price: string;
	onOpenClick?: (title: string) => void;
	duration: string;
	description: string;
	features: string[];
	backgroundImage: string;
	className?: string;
}
