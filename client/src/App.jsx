import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
