import Image from "next/image";

import type { Media, OutsourceProgramItem } from "@/features/outsource";
import { cn } from "@/lib/utils";
import { getMediaUrl } from "@/shared/lib/media";
import Container from "@/shared/ui/Container";
import NotFoundContent from "@/shared/ui/NotFoundContent";

interface OutsourceProgramProps {
	programTitle: string;
	programImage: Media | null;
	programItems: readonly OutsourceProgramItem[];
	emptyLabel: string;
}

const OutsourceProgram = ({ programTitle, programImage, programItems, emptyLabel }: OutsourceProgramProps) => {
	const imageUrl = getMediaUrl(programImage?.url);

	return (
		<section
			className="bg-white px-3 pb-[30px] md:bg-[#f5f5f7] md:px-8 md:pb-6 pt-[60px] md:pt-[86px]"
			aria-labelledby="outsource-program-title"
		>
			<Container>
				<h2
					id="outsource-program-title"
					className="mx-auto text-center text-18 font-bold leading-none tracking-[-0.025em] md:max-w-[560px] md:text-outsource-program-title md:leading-[0.95]"
				>
					{programTitle}
				</h2>

				<div
					className={cn(
						"mt-7 grid rounded-[16px] border border-[#dedede] bg-white p-4 md:mt-16 md:rounded-[24px] lg:gap-14 lg:p-14",
						imageUrl && "lg:grid-cols-[minmax(0,1.09fr)_minmax(470px,0.91fr)]"
					)}
				>
					{imageUrl && (
						<div className="relative aspect-square overflow-hidden rounded-[12px] md:rounded-[18px] lg:aspect-[2248/2028]">
							<Image src={imageUrl} alt={programTitle} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
						</div>
					)}

					<div
						className={cn(
							"flex flex-col",
							imageUrl && "mt-8 lg:mt-0",
							programItems.length > 0 && "gap-[30px] lg:justify-between lg:gap-0 lg:py-1"
						)}
					>
						{programItems.length > 0 ? (
							programItems.map((item, index) => (
								<article key={item.id}>
									<p className="text-40 font-medium leading-none tracking-[-0.02em]" aria-hidden="true">
										{String(index + 1).padStart(2, "0")}
									</p>
									<h3 className="mt-5 text-17 font-bold leading-[1.05] tracking-[-0.025em] md:mt-7 md:text-20 md:leading-[1.02]">
										{item.title}
									</h3>
									<p className="mt-3 max-w-[550px] text-12 leading-[1.2] text-[#353535] md:mt-4 md:leading-[1.28]">
										{item.description}
									</p>
								</article>
							))
						) : (
							<NotFoundContent>{emptyLabel}</NotFoundContent>
						)}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default OutsourceProgram;
