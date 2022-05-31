import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { DarkTheme, LightTheme } from "../themes";

type ThemeContextProps = {
	children: ReactNode;
};

interface IThemeContextData {
	themeName: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
	return useContext(ThemeContext);
};

export const AppThemeProvider = ({ children }: ThemeContextProps) => {
	const [themeName, setThemeName] = useState<"light" | "dark">("light");
	const toggleTheme = useCallback(() => {
		setThemeName((oldThemeName) => (oldThemeName === "light" ? "dark" : "light"));
	}, []);
	const theme = useMemo(() => {
		if (themeName === "light") return LightTheme;
		return DarkTheme;
	}, [themeName]);

	return (
		<ThemeContext.Provider value={{ themeName, toggleTheme }}>
			<ThemeProvider theme={theme}>
				<Box
					width="100vw"
					height="100vh"
					bgcolor={theme.palette.background.default}
				>
					{children}
				</Box>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};
