import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Container from "@/shared/ui/Container";

const items = [
	{
		question: "Чем вы можете быть полезны фармкомпании в Узбекистане?",
		answer: "Мы предоставляем полный спектр услуг по регистрации, маркетингу и продвижению фармацевтических препаратов.",
	},
	{
		question: "В чём отличие вашего консалтинга от маркетингового агентства?",
		answer: "Мы специализируемся исключительно на фармацевтическом рынке и обладаем глубокой экспертизой в этой области.",
	},
	{
		question: "Какие программы обучения вы проводите для медпредставителей?",
		answer: "Мы проводим тренинги по навыкам продаж, продуктовому обучению и эффективной коммуникации с врачами.",
	},
	{
		question: "Обучаете ли вы региональных менеджеров и руководителей полевых команд?",
		answer: "Да, у нас есть специализированные программы для управленческого персонала.",
	},
	{
		question: "Проводите ли вы обучение для маркетинг-отдела?",
		answer: "Конечно, мы обучаем стратегическому маркетингу, анализу рынка и управлению продуктовым портфелем.",
	},
	{
		question: "Вы помогаете со стратегией и адаптацией продуктового портфеля?",
		answer: "Да, мы проводим аудит портфеля и помогаем разработать стратегию его развития и адаптации под рынок.",
	},
	{
		question: "С какими компаниями вы работаете?",
		answer: "Мы работаем как с крупными международными компаниями, так и с локальными производителями.",
	},
];

const Faq = () => {
	return (
		<section className="py-15 md:py-30">
			<Container>
				<h2 className="mb-8 md:mb-15 font-semibold text-20 md:text-40 leading-100 tracking-neg-3 md:tracking-neg-2 text-center text-black">
					Вопросы и ответы
				</h2>
				<Accordion type="single" collapsible className="flex flex-col gap-2 md:gap-4">
					{items.map((item, index) => (
						<AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-[20px] px-5 md:px-8 border-none">
							<AccordionTrigger className="hover:no-underline py-3 md:py-4 h-full flex items-center">
								<span className="font-medium text-12 md:text-20 leading-106 tracking-neg-2 md:tracking-neg-1 text-black mr-4">
									{item.question}
								</span>
							</AccordionTrigger>
							<AccordionContent className="text-10! md:text-16! text-grey-primary pb-3 md:pb-4">{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Container>
		</section>
	);
};

export default Faq;
