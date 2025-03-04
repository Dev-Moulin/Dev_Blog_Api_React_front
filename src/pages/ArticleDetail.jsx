import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleService } from "../services/articles";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await ArticleService.getArticle(id);
        setArticle(data);
        setEditedArticle({ title: data.title, content: data.content });
        setLoading(false);
      } catch (err) {
        setError("Article non trouvé");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await ArticleService.deleteArticle(id);
        navigate("/articles");
      } catch (err) {
        setError("Impossible de supprimer l'article");
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedArticle = await ArticleService.updateArticle(
        id,
        editedArticle
      );
      setArticle(updatedArticle);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Impossible de mettre à jour l'article");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleEdit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={editedArticle.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contenu
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows="10"
                    value={editedArticle.content}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {article.title}
                  </h1>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={handleDelete}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {article.content}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Publié le{" "}
                      {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </div>
                    <button
                      onClick={() => navigate("/articles")}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      ← Retour aux articles
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
