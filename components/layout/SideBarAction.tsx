"use client";

import { Icon } from "./SidebarLink";

export const SideBarAction = ({
	label,
	icon,
}: {
	label: string;
	icon: string;
}) => {
	return (
		<button
			key={label}
			type="button"
			className="w-auto md:w-10/12 aspect-square md:aspect-auto flex items-center justify-center space-x-0 md:space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 md:py-2 md:px-3 rounded-md text-sm transition-colors"
		>
			<Icon name={icon} className="w-5 h-5" />
			<span className="hidden md:inline mls-0 md:ml-2">{label}</span>
		</button>
	);
};
