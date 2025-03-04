import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MonBlog</div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Accueil
          </a>
          <a href="/articles" className="text-white hover:text-gray-300">
            Articles
          </a>
          <a href="/login" className="text-white hover:text-gray-300">
            Connexion
          </a>
          <a href="/register" className="text-white hover:text-gray-300">
            Inscription
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
