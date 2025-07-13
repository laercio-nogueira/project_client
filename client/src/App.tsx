import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useSelector } from "react-redux";
import ClientPage from "./pages/ClientPage/ClientPage";
import ClientSelectedPage from "./pages/ClientPage/ClientSelectedPage";

function ProtectedRoute() {
  const name = useSelector((state: any) => state.user.name);
  if (!name) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/clients-selected" element={<ClientSelectedPage />} />
        </Route>

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
