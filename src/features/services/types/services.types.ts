export interface IService {
	id: number;
	name: string;
	description: string;
	label: string;
	price: string;
	serviceFeatures: string[];
	media: {
		url: string;
	};
}

export interface IServicesData {
	data: IService[];
	meta: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}
