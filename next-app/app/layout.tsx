import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranesh Soni — AI Product Owner & Builder",
  description: "Pranesh Soni — AI Product Owner & Builder. Building AI capabilities for life sciences and turning complex workflows into working prototypes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
