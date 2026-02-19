import React from "react";

interface NotFoundContentProps {
	children: React.ReactNode;
}

const NotFoundContent = ({ children }: NotFoundContentProps) => {
	return (
		<div className="flex justify-center items-center py-10 w-full">
			<p className="text-16 md:text-18 text-gray-primary font-medium text-center">{children}</p>
		</div>
	);
};

export default NotFoundContent;
