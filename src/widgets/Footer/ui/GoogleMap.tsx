export const GoogleMap = () => {
	return (
		<div className="w-full h-[400px] grayscale filter">
			<iframe
				width="100%"
				height="100%"
				frameBorder="0"
				scrolling="no"
				marginHeight={0}
				marginWidth={0}
				src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Tashkent,%20Yakkasaray%20district,%20Abdulla%20Kahhar%20street,%209th%20passage,%20house%2016a+(Pharm%20Advisor)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
			></iframe>
		</div>
	);
};
