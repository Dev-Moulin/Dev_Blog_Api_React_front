const API_URL = "http://localhost:3000";

export const AuthService = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: credentials }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Échec de la connexion");
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data.user;
    } else {
      throw new Error("Token non reçu du serveur");
    }
  },

  async register(credentials) {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: credentials }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Échec de l'inscription");
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data.user;
    } else {
      throw new Error("Token non reçu du serveur");
    }
  },

  logout() {
    localStorage.removeItem("token");
    // Nettoyer d'autres données si nécessaire
    localStorage.removeItem("user");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  async isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Vérifier si le token est valide en faisant une requête à l'API
      const response = await fetch(`${API_URL}/api/v1/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Si le token n'est pas valide, déconnecter l'utilisateur
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error);
      return false;
    }
  },
};
