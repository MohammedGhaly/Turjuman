import { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>> | (() => void);
}

const initialState: ThemeContextType = {
  theme: "light",
  setTheme: () => {},
};

const ThemeContext = createContext(initialState);

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("'ThemeContext' is used outside 'ThemeProvider'");
  return context;
}

export { ThemeProvider, useTheme };
