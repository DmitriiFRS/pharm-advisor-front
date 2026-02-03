import { ServiceCardProps } from "../model/types";
import Image from "next/image";
import GrayLine from "@/shared/ui/GrayLine";
import BlackButton from "@/shared/ui/BlackButton";

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, duration, description, features, backgroundImage, className }) => {
	return (
		<div className={`flex flex-col bg-white rounded-[20px] overflow-hidden shadow-sm h-full border border-[#EBEBEB] ${className}`}>
			{/* Header with Background */}
			<div className="relative h-[220px] p-6 flex flex-col justify-between">
				<Image src={backgroundImage} alt={title} fill className="object-cover absolute inset-0 z-0 p-[5px] rounded-[20px]" />
				{/* Overlay/Content */}
				<div className="relative z-10 h-full flex flex-col justify-between">
					<h3 className="text-white text-20 font-semibold leading-118">{title}</h3>
					<div className="flex flex-col-reverse justify-between gap-2.5 w-full xxs:flex-row xxs:items-end xxs:gap-0">
						<span className="text-white text-16 font-bold leading-100 xs:text-20">{price}</span>
						<div className="bg-white/90 backdrop-blur-sm px-[5px] py-1.5 rounded-[6px] max-w-[136px]">
							<span className="text-[#858585] text-11 font-medium">{duration}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Body */}
			<div className="p-3 pb-5 flex flex-col grow">
				<p className="text-[#858585] text-[14px] leading-140 min-h-[80px]">{description}</p>
				<GrayLine className="mt-2.5 mb-5" />

				<div className="mb-6">
					<h4 className="text-black-primary text-[14px] font-bold mb-3">В команде:</h4>
					<ul className="space-y-2.5">
						{features.map((feature, index) => (
							<li key={index} className="flex items-start gap-2.5">
								<div className="size-3.5 rounded-full bg-[#E2FAEF] flex items-center justify-center">
									<Image
										src="/assets/icons/common/green-checked.svg"
										alt="check"
										width={8}
										height={6}
										className="mt-0.5 shrink-0"
									/>
								</div>

								<span className="text-black-primary text-[13px] leading-130">{feature}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="mt-auto">
					<BlackButton />
				</div>
			</div>
		</div>
	);
};
