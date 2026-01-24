import FeedbackForm from "@/features/feedback-form/ui/FeedbackForm";
import Container from "@/shared/ui/Container";
import Image from "next/image";

export const ContactSection = () => {
	return (
		<section className="pb-15 md:pb-30">
			<Container>
				<div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">
					<div className="w-full lg:max-w-[486px] pt-0 lg:pt-10">
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-black-primary">Остались вопросы?</h2>
						<p className="text-grey-primary mb-8 text-base md:text-lg">
							Оставьте ваши контактные данные и мы свяжемся с вами по любым интересующим вопросам.
						</p>
						<FeedbackForm />
					</div>
					<div className="relative w-full aspect-343/260 lg:w-[592px] lg:h-[560px] rounded-[20px] overflow-hidden shrink-0">
						<Image src="/assets/images/homepage/doctor.webp" alt="doctor" fill className="object-cover" />
					</div>
				</div>
			</Container>
		</section>
	);
};
