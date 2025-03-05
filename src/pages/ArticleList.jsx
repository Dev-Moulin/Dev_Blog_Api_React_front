import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArticleService } from "../services/articles";
import { AuthService } from "../services/auth";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = AuthService.getToken();
  const currentUserId = localStorage.getItem("userId");

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

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await ArticleService.deleteArticle(id);
        // Mettre à jour la liste des articles après la suppression
        setArticles(articles.filter((article) => article.id !== id));
      } catch (err) {
        setError("Impossible de supprimer l'article");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl text-gray-900 dark:text-gray-100">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Articles
          </h1>
          {isAuthenticated && (
            <Link
              to="/articles/new"
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Nouvel Article
            </Link>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aucun article disponible
            </p>
            {!isAuthenticated && (
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <Link
                  to="/login"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Connectez-vous
                </Link>{" "}
                ou{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
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
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {article.content.substring(0, 150)}
                    {article.content.length > 150 ? "..." : ""}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Link
                        to={`/articles/${article.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        Lire la suite
                      </Link>
                      {isAuthenticated &&
                        article.user_id === parseInt(currentUserId) && (
                          <>
                            <Link
                              to={`/articles/${article.id}`}
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                            >
                              Modifier
                            </Link>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                              Supprimer
                            </button>
                          </>
                        )}
                    </div>
                    {article.user && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
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
