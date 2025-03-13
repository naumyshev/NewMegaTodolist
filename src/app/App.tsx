import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "@/common/hooks"
import { selectThemeMode } from "./app-selectors.ts"
import { Header } from "@/common/components/Header/Header.tsx"
import { Main } from "@/app/Main.tsx"
import { getTheme } from "@/common/theme"

export type FilterValues = "all" | "active" | "completed"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
