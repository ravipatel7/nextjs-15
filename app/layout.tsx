import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/context/Theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = SpaceGrotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Next.js 15 - DevFlow",
  description: "A better version of StackOverflow",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
          suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster position="top-right" richColors closeButton />
        </body>
      </SessionProvider>
    </html>
  );
};
export default RootLayout;
