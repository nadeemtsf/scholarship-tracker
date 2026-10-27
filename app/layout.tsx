import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scholarships — Nadim",
  description: "Your applications, documents and next steps. All in one place.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Scholarships", statusBarStyle: "default" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
