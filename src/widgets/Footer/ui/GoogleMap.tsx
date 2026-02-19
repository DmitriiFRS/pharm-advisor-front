export const GoogleMap = ({ link }: { link: string }) => {
	let src =
		"https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Tashkent,%20Yakkasaray%20district,%20Abdulla%20Kahhar%20street,%209th%20passage,%20house%2016a+(Pharm%20Advisor)&t=&z=15&ie=UTF8&iwloc=B&output=embed";

	const coords = link.match(/@(-?[\d\.]+),(-?[\d\.]+)/);

	if (coords) {
		const [, lat, lon] = coords;
		src = `https://maps.google.com/maps?q=${lat},${lon}&hl=ru&z=15&output=embed`;
	}

	return (
		<div className="w-full h-[400px] grayscale filter">
			<iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src={src}></iframe>
		</div>
	);
};
