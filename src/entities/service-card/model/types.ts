export interface ServiceCardProps {
	name: string;
	price: string;
	onOpenClick?: (title: string) => void;
	label: string;
	description: string;
	serviceFeatures: string[];
	media: { url: string };
	className?: string;
}
