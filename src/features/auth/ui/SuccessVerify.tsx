import { Link } from "@/i18n/routing";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { CheckCircle2 } from "lucide-react";

export default function SuccessVerify() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
					<CheckCircle2 className="w-8 h-8 text-green-600" />
				</div>
				<h1 className="text-2xl font-bold">Аккаунт успешно подтвержден!</h1>
				<p className="text-gray-500 max-w-md">
					Спасибо за подтверждение почты. Теперь вы можете войти в свой аккаунт и пользоваться всеми возможностями платформы.
				</p>
			</div>

			<Link href="/">
				<PrimaryButton className="min-w-[200px]">Перейти на главную</PrimaryButton>
			</Link>
		</div>
	);
}
