import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleService } from "../services/articles";
import { AuthService } from "../services/auth";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuthenticated = AuthService.getToken();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("Début du chargement des articles");
        const response = await ArticleService.getAllArticles();
        console.log("Articles reçus:", response);

        // S'assurer que articles est un tableau
        const articlesArray = Array.isArray(response) ? response : [];
        console.log("Articles formatés:", articlesArray);

        setArticles(articlesArray);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des articles:", err);
        setError(err.message || "Impossible de charger les articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          {isAuthenticated && (
            <Link
              to="/articles/new"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Nouvel Article
            </Link>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun article disponible</p>
            {!isAuthenticated && (
              <p className="mt-4 text-gray-600">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Connectez-vous
                </Link>{" "}
                ou{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  inscrivez-vous
                </Link>{" "}
                pour créer votre premier article !
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {article.content.substring(0, 150)}
                    {article.content.length > 150 ? "..." : ""}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Lire la suite
                    </Link>
                    {article.user && (
                      <span className="text-sm text-gray-500">
                        par {article.user.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
