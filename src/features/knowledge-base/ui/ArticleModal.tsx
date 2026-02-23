"use client";

import { Article } from "@/features/knowledge-base/model/types";
import Image from "next/image";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import AuthModal from "@/features/auth/ui/AuthModal";
import { UserData } from "@/entities/user/model/UserContext";

interface Props {
	article: Article;
}

const ArticleModal: React.FC<Props> = ({ article }) => {
	const { me } = useContext(UserData);
	const t = useTranslations("homepage.knowledgeBase");
	const imageUrl = article.media?.url ? process.env.NEXT_PUBLIC_MEDIA_URL + article.media?.url : "/assets/images/placeholder.webp";
	const fileUrl = article.pdf?.url ? process.env.NEXT_PUBLIC_MEDIA_URL + article.pdf?.url : null;

	const extractYouTubeId = (url?: string | null) => {
		if (!url) return null;
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};
	const youtubeId = extractYouTubeId(article.youtubeLink);

	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	const handleDownload = async () => {
		if (!me) {
			setIsAuthModalOpen(true);
			return;
		}
		if (fileUrl) {
			try {
				const response = await fetch(fileUrl);
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", article.title + ".pdf");
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(url);
			} catch (error) {
				console.error("Download failed:", error);
				window.open(fileUrl, "_blank");
			}
		}
	};

	return (
		<>
			<DialogContent className="max-w-[calc(100vw-32px)] md:max-w-[700px] lg:max-w-[900px] w-full p-6 md:p-10 gap-0 overflow-y-auto max-h-[90vh]">
				<DialogHeader className="sr-only">
					<DialogTitle>{article.title}</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col md:flex-row gap-6 md:gap-10">
					{/* Image Column */}
					<div className="shrink-0 w-full md:w-[280px] lg:w-[340px]">
						{youtubeId ? (
							<div
								className="relative w-full aspect-340/360 rounded-[16px] overflow-hidden cursor-pointer group"
								onClick={() => setIsVideoModalOpen(true)}
							>
								<Image
									src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
									alt={article.title}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									unoptimized
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
									<div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
										<Play className="w-8 h-8 text-black fill-black ml-1" />
									</div>
								</div>
							</div>
						) : (
							<div className="relative w-full aspect-340/360 rounded-[16px] overflow-hidden">
								<Image src={imageUrl} alt={article.title} fill className="object-cover" unoptimized />
							</div>
						)}
					</div>

					{/* Content Column */}
					<div className="flex flex-col grow gap-6">
						<div className="flex flex-col gap-4">
							<h3 className="text-[20px] font-medium leading-[138%] tracking-neg-1 text-black">{article.title}</h3>
							<div
								className="text-[14px] font-normal leading-[120%] text-[#808080] whitespace-pre-wrap prose prose-sm max-w-none"
								dangerouslySetInnerHTML={{ __html: article.content }}
							/>
						</div>

						<div className="mt-auto pt-4 flex justify-end">
							<PrimaryButton onClick={handleDownload} className="w-auto! px-6 h-[44px]" disabled={!fileUrl}>
								{t("download")}
							</PrimaryButton>
						</div>
					</div>
				</div>
			</DialogContent>
			<AuthModal isOpen={isAuthModalOpen} onClose={setIsAuthModalOpen} />

			{youtubeId && (
				<Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
					<DialogContent className="max-w-[calc(100vw-32px)] md:max-w-[800px] w-full p-0 gap-0 overflow-hidden bg-black border-none">
						<DialogHeader className="sr-only">
							<DialogTitle>{article.title} Video</DialogTitle>
						</DialogHeader>
						<div className="relative w-full aspect-video">
							<iframe
								src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
								className="absolute top-0 left-0 w-full h-full border-none"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title={article.title}
							></iframe>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default ArticleModal;
