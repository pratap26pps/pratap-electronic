"use client";  

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import Navbar from "@/components/ui/navbar";
 
export default function RootLayout({ children }) {
  const { theme } = useTheme();  

  return (
    <html lang="en" className={theme || "dark"} style={{ colorScheme: theme || "dark" }}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         < Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
