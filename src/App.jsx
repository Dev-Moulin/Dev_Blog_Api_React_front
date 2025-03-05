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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Chargement...
        </p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route
          path="/articles/new"
          element={
            <PrivateRoute>
              <ArticleCreate />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/articles" />} />
      </Routes>
    </div>
  );
};

export default App;
