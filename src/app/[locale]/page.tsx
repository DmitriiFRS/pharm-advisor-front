import { ContactSection } from "@/widgets/ContactSection";
import { FaqWithData } from "@/features/faq";
import About from "./(home)/_components/About";
import Advantages from "./(home)/_components/Advantages";
// import Advantages2 from "./(home)/_components/Advantages2";
// import Carousel from "./(home)/_components/Carousel";
import Courses from "./(home)/_components/Courses";
import HeroSection from "./(home)/_components/HeroSection";
import KnowledgeBase from "./(home)/_components/KnowledgeBase";
import Services from "./(home)/_components/Services";

export default function Home() {
	return (
		<>
			<HeroSection />
			<Advantages />
			<About />
			{/* <Advantages2 /> */}
			{/* <Carousel /> */}
			<Services />
			<Courses />
			<KnowledgeBase />
			<FaqWithData />
			<ContactSection siteSection="Блок с заявкой внизу сайта на главной странице" />
		</>
	);
}
