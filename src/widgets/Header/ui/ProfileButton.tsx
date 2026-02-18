import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NProgress from "nprogress";
import cabinet from "@/assets/icons/common/header-cabinet.svg";
import { UserData } from "@/entities/user";

interface Props {
	onAuthRequired: () => void;
}

export const ProfileButton = ({ onAuthRequired }: Props) => {
	const { me } = useContext(UserData);
	const router = useRouter();

	const handleClick = () => {
		if (me) {
			NProgress.start();
			router.push("/profile");
		} else {
			onAuthRequired();
		}
	};

	return (
		<button onClick={handleClick} className="h-10 min-h-10 w-10 min-w-10 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]">
			<Image src={cabinet} alt="Cabinet" width={30} height={30} className="size-[15px]" />
		</button>
	);
};
