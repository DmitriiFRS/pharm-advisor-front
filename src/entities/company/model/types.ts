export interface IContacts {
	address: string;
	email: string;
	phone: string;
	instagramLink: string;
	telegramLink: string;
	googleMapsLink: string;
}

export interface IContactsResponse {
	data: IContacts;
	meta: null;
}
