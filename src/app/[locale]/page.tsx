import About from "./(home)/_components/About";
import Advantages from "./(home)/_components/Advantages";
import Advantages2 from "./(home)/_components/Advantages2";
import Carousel from "./(home)/_components/Carousel";
import Courses from "./(home)/_components/Courses";
import HeroSection from "./(home)/_components/HeroSection";
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
		</main>
	);
}
