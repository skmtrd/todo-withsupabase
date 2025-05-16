"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarProfileLink = ({
	href,
	label,
	avatar_url,
	onClick,
}: {
	href: string;
	label: string;
	avatar_url: string;
	onClick?: () => void;
}) => {
	const pathname = usePathname();
	return (
		<Link
			key={label}
			href={href}
			className={`flex items-center justify-center md:justify-start space-x-0 md:space-x-3 md:py-2.5 md:px-3 p-2 rounded-md text-sm font-medium transition-colors
              ${
								pathname === href
									? "bg-gray-100 dark:bg-gray-800"
									: "hover:bg-gray-100 dark:hover:bg-gray-800/80"
							}`}
		>
			<Avatar className="w-5 h-5">
				<AvatarImage src={avatar_url} />
				<AvatarFallback>
					<UserCircle className="w-5 h-5" />
				</AvatarFallback>
			</Avatar>
			<span className="hidden md:inline ml-0 md:ml-3">{label}</span>
		</Link>
	);
};
