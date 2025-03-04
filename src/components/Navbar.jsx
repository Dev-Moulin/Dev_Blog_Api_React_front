import React from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/auth";

const Navbar = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MonBlog</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Accueil
          </Link>
          <Link to="/articles" className="text-white hover:text-gray-300">
            Articles
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Connexion
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                Inscription
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/articles/new"
                className="text-white hover:text-gray-300"
              >
                Nouvel Article
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
