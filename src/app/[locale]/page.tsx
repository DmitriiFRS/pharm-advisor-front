import { ContactSection } from "@/widgets/ContactSection";
import About from "./(home)/_components/About";
import Advantages from "./(home)/_components/Advantages";
import Advantages2 from "./(home)/_components/Advantages2";
import Carousel from "./(home)/_components/Carousel";
import Courses from "./(home)/_components/Courses";
import Faq from "./(home)/_components/Faq";
import HeroSection from "./(home)/_components/HeroSection";
import KnowledgeBase from "./(home)/_components/KnowledgeBase";
import Services from "./(home)/_components/Services";

export default function Home() {
	return (
		<main>
			<HeroSection />
			<Advantages />
			<About />
			<Advantages2 />
			<Carousel />
			<Services />
			<Courses />
			<KnowledgeBase />
			<Faq />
			<ContactSection />
		</main>
	);
}
