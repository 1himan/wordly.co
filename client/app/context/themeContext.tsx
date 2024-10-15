"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Provide a default value for the ThemeContext
const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string | null>(null); // Initially set theme to `null`

  useEffect(() => {
    // Get the stored theme from localStorage or default to 'dark'
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme); // Set theme after client hydration
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme); // Update localStorage whenever theme changes
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // If the theme is still `null`, render nothing to avoid mismatched HTML during hydration
  if (theme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);