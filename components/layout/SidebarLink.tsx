"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Bookmark,
	ChevronRight,
	ClipboardList,
	FilePenLine,
	FolderArchive,
	Heart,
	HelpCircle,
	Home,
	type LucideIcon,
	type LucideProps,
	MessageSquarePlus,
	SendHorizonal,
	UserCircle,
} from "lucide-react";

export const iconMap: { [key: string]: LucideIcon } = {
	home: Home,
	clipboardlist: ClipboardList,
	helpcircle: HelpCircle,
	heart: Heart,
	folderarchive: FolderArchive,
	bookmark: Bookmark,
	usercircle: UserCircle,
	sendhorizonal: SendHorizonal,
	filepenline: FilePenLine,
	messagesquareplus: MessageSquarePlus,
	chevronright: ChevronRight,
};

interface IconProps extends LucideProps {
	name: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
	const LucideIconComponent = iconMap[name.toLowerCase()];

	if (!LucideIconComponent) {
		return <HelpCircle {...props} />;
	}

	return <LucideIconComponent {...props} />;
};

export const SidebarLink = ({
	href,
	label,
	icon,
	onClick,
}: {
	href: string;
	label: string;
	icon: string;
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
			{...(onClick && { onClick })}
		>
			<Icon name={icon} className="w-5 h-5" />
			<span className="hidden md:inline ml-0 md:ml-3">{label}</span>
		</Link>
	);
};
