import React, { createContext, useContext, useState, ReactNode } from "react";

export const lightColors = {
  bg: "#f3f6fa",
  surface: "#ffffff",
  text: "#172136",
  muted: "#718096",
  line: "#e3e9f1",
  blue: "#2146c7",
  blueLight: "#e9edff",
  danger: "#ef535c",
  success: "#26a269",
  warning: "#f6a723",
  appBg: "#dfe5ef",
};

export const darkColors = {
  bg: "#0f1624",
  surface: "#171f2e",
  text: "#edf2ff",
  muted: "#8f9bb0",
  line: "#283246",
  blue: "#2146c7",
  blueLight: "#202d52",
  danger: "#ef535c",
  success: "#26a269",
  warning: "#f6a723",
  appBg: "#090e17",
};

export type Colors = typeof lightColors;

type ThemeContextType = {
  isDark: boolean;
  colors: Colors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}