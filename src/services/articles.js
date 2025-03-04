import { AuthService } from "./auth";

const API_URL = "http://localhost:3000/api/v1";

export const ArticleService = {
  async getAllArticles() {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Impossible de récupérer les articles");
      }

      const data = await response.json();
      console.log("Réponse de l'API articles:", data);

      // La réponse est de la forme {status, data} où data contient les articles
      if (data && data.data && Array.isArray(data.data)) {
        return data.data;
      }

      // Si on ne trouve pas la structure attendue, on retourne un tableau vide
      console.warn("Format de réponse inattendu:", data);
      return [];
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
      throw error;
    }
  },

  async getArticle(id) {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Article non trouvé");
    }

    const data = await response.json();
    return data.data; // Retourner data.data car l'API renvoie {status, data}
  },

  async createArticle(articleData) {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
        body: JSON.stringify({ article: articleData }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Impossible de créer l'article");
      }

      const data = await response.json();
      console.log("Article créé:", data);
      return data.data; // Retourner data.data car l'API renvoie {status, data}
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
      throw error;
    }
  },

  async updateArticle(id, articleData) {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      throw new Error("Impossible de mettre à jour l'article");
    }

    const data = await response.json();
    return data.data; // Retourner data.data car l'API renvoie {status, data}
  },

  async deleteArticle(id) {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de supprimer l'article");
    }
  },
};
