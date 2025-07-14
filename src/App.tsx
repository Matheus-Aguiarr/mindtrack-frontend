import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegisterPage } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { SubjectDetails } from "./pages/SubjectDetails";
import { ThemeProvider } from "./components/theme-provider";
import { Profile } from "./pages/Profile";

const queryClient = new QueryClient();

export function App() {
  return (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />}/>
              <Route element={<RegisterPage />} path="/register" />
              <Route element={<Dashboard />} path="/dashboard"/>
              <Route element={<SubjectDetails />} path="/subject/:id" />
              <Route element={<Profile />} path="/profile" />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
  )
}
