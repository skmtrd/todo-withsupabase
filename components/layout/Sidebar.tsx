import { SideBarAction } from "@/components/layout/SideBarAction";
import { SidebarLink } from "@/components/layout/SidebarLink";

const navItems = [
	{ href: "/todo", label: "タイムライン", icon: "Home" },
	{ href: "/tasks", label: "課題共有", icon: "ClipboardList" },
	{ href: "/questions", label: "質問スペース", icon: "MessageSquarePlus" },
];

const activityItems = [
	{ href: "/liked-posts", label: "いいねしたポスト", icon: "Heart" },
	{ href: "/registered-tasks", label: "登録した課題", icon: "FolderArchive" },
	{
		href: "/bookmarked-questions",
		label: "ブックマークした質問",
		icon: "Bookmark",
	},
];

const actionButtons = [
	{
		label: "ポスト",
		icon: "SendHorizonal",
		onClick: () => console.log("Post action"),
	},
	{
		label: "課題",
		icon: "FilePenLine",
		onClick: () => console.log("Task action"),
	},
	{
		label: "質問",
		icon: "MessageSquarePlus",
		onClick: () => console.log("Question action"),
	},
];

export default function Sidebar() {
	return (
		<aside className="w-16 md:w-72 py-2 px-3 md:px-4 space-y-3 border-r border-foreground-500 flex flex-col transition-all duration-300 ease-in-out">
			<nav className="space-y-1">
				{navItems.map((item) => (
					<SidebarLink
						key={item.label}
						href={item.href}
						label={item.label}
						icon={item.icon}
					/>
				))}
			</nav>

			<hr className="border-foreground-500" />

			<nav className="space-y-1">
				{activityItems.map((item) => (
					<SidebarLink
						key={item.label}
						href={item.href}
						label={item.label}
						icon={item.icon}
					/>
				))}
			</nav>

			<hr className="border-foreground-500" />

			<SidebarLink
				href="/profile/edit"
				label="プロフィール"
				icon="UserCircle"
			/>
			<div className="space-y-2 px-0 md:px-1 flex flex-col items-center">
				{actionButtons.map((button) => (
					<SideBarAction
						key={button.label}
						label={button.label}
						icon={button.icon}
					/>
				))}
			</div>
		</aside>
	);
}
