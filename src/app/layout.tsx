import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Next DDD App",
	description: "Aplicativo Next usando arquitetura DDD.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="br" suppressHydrationWarning>
			<body className={`${poppins.variable} antialiased`}>
				<main>{children}</main>
			</body>
		</html>
	);
}
