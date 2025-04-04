"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import Navbar from "@/components/ui/navbar";

export default function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <html
      lang="en"
      className={theme || "dark"}
      style={{ colorScheme: theme || "dark" }}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
