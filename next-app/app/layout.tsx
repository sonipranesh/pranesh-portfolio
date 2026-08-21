import type { Metadata, Viewport } from "next";
import "./globals.css";
import SplashCursor from "./components/SplashCursor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08080a",
};

export const metadata: Metadata = {
  title: "Pranesh Soni — AI Product Owner & Builder",
  description: "Pranesh Soni — AI Product Owner & Builder. Building AI capabilities for life sciences and turning complex workflows into working prototypes.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pranesh Soni",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#08080a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined') {
              if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
              if (location.hash) { history.replaceState(null, '', location.pathname); }
              window.scrollTo(0, 0);
              window.addEventListener('pageshow', function() {
                if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
                if (location.hash) { history.replaceState(null, '', location.pathname); }
                window.scrollTo(0, 0);
              });
            }`,
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
