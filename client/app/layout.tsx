//this is my main layout.tsx file in my app router
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import Navbar from "./components/navigation/navbar";
import { ThemeProvider, useTheme } from "@/app/context/themeContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <html lang="en">
      <body className={`${inter.className} ${theme}`}>
        <ThemeProvider>
          <Navbar />
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
