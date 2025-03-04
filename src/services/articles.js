import { AuthService } from "./auth";

const API_URL = "http://localhost:3000/api/v1";

export const ArticleService = {
  async getAllArticles() {
    const response = await fetch(`${API_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer les articles");
    }

    return response.json();
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

    return response.json();
  },

  async createArticle(articleData) {
    const response = await fetch(`${API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      throw new Error("Impossible de créer l'article");
    }

    return response.json();
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

    return response.json();
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
