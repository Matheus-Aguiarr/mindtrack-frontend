import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegisterPage } from "./pages/Register";

const queryClient = new QueryClient();

export function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}/>
            <Route element={<RegisterPage />} path="/register" />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  )
}
