import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticleList from "./pages/ArticleList";
import ArticleCreate from "./pages/ArticleCreate";
import ArticleDetail from "./pages/ArticleDetail";
import { AuthService } from "./services/auth";

const PrivateRoute = ({ children }) => {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
