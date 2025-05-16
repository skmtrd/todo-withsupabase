import HeaderAuth from "@/components/header-auth";
import Sidebar from "@/components/layout/Sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex min-h-screen">
						<Sidebar />
						<main className="flex-1 p-5">
							<div className="flex justify-end items-center mb-4 space-x-2">
								<HeaderAuth />
								<ThemeSwitcher />
							</div>
							{children}
						</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
