"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import Navbar from "@/components/ui/navbar";
import CartInit from "@/components/CartInit";
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <html
      lang="en"
      className={theme || "dark"}
      style={{ colorScheme: theme || "dark" }}
    >
      <body>
      <Provider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <SessionProvider>
          
              <CartInit />
              {children}
          
          </SessionProvider>
        </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
