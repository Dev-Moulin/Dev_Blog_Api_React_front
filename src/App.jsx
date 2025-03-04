import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticleList from "./pages/ArticleList";
import ArticleCreate from "./pages/ArticleCreate";
import ArticleDetail from "./pages/ArticleDetail";
import { AuthService } from "./services/auth";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AuthService.isAuthenticated();
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Afficher un état de chargement pendant la vérification
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/articles"
          element={
            <PrivateRoute>
              <ArticleList />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/new"
          element={
            <PrivateRoute>
              <ArticleCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <PrivateRoute>
              <ArticleDetail />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/articles" />} />
      </Routes>
    </div>
  );
};

export default App;
