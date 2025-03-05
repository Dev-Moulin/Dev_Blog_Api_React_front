import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.getToken();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/articles");
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/articles" className="text-white hover:text-gray-200">
              Articles
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/articles/new"
                  className="text-white hover:text-gray-200"
                >
                  Nouvel Article
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md border border-transparent hover:border-white"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
