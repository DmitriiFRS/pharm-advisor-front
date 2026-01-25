import Container from "@/shared/ui/Container";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { KnowledgeBaseGrid } from "@/widgets/KnowledgeBaseGrid";

export default function KnowledgeBasePage() {
	return (
		<main className="pt-20 pb-10">
			<Container>
				<Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "База знаний" }]} className="" />
				<h1 className="text-3xl font-bold mt-5 md:mt-6">База знаний</h1>
				<KnowledgeBaseGrid />
			</Container>
		</main>
	);
}
