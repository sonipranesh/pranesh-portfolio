import type { Metadata } from "next";
import "./globals.css";
import SplashCursor from "./components/SplashCursor";

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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined') { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0); }`,
          }}
        />
      </head>
      <body>
        <SplashCursor
          DENSITY_DISSIPATION={6}
          VELOCITY_DISSIPATION={2.5}
          CURL={2}
          SPLAT_RADIUS={0.1}
          SPLAT_FORCE={4500}
          RAINBOW_MODE={false}
          COLOR="#f4f1ea"
        />
        {children}
      </body>
    </html>
  );
}
