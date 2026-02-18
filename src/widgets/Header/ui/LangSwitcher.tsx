import Image from "next/image";
import uzflag from "@/assets/icons/common/header-uz.svg";
import ruflag from "@/assets/icons/common/header-ru.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLangSwitcher } from "@/shared/lib/hooks/useLangSwitcher";

export const LangSwitcher = () => {
	const { currentLocale, switchLocale } = useLangSwitcher();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-10 min-h-10 w-10 min-w-10 flex items-center justify-center bg-[#F5F5F7] rounded-[8px] outline-none">
					<Image src={currentLocale === "uz" ? uzflag : ruflag} alt="Language" width={30} height={30} className="size-[15px]" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-16">
				<DropdownMenuItem onClick={() => switchLocale("ru")} className="flex justify-center cursor-pointer">
					<Image src={ruflag} alt="Russian" width={24} height={24} className="size-[14px]" />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => switchLocale("uz")} className="flex justify-center cursor-pointer">
					<Image src={uzflag} alt="Uzbek" width={24} height={24} className="size-[14px]" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
