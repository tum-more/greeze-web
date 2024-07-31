import { ThemeProvider } from "./theme.provider";

type ThemeType = "light" | "dark" | "system";

type AppProviderProps = {
  defaultTheme?: ThemeType;
  children: React.ReactNode;
};

export function AppProvider({
  defaultTheme = "system",
  children,
}: AppProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
