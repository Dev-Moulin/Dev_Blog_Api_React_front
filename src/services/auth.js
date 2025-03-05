const API_URL = "http://localhost:3001";

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
      throw new Error(error.status?.message || "Échec de la connexion");
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      // Extraire l'ID de l'utilisateur du token JWT
      const tokenData = JSON.parse(atob(data.token.split(".")[1]));
      const userId = tokenData.sub;
      localStorage.setItem("userId", userId);

      // Restaurer le thème de l'utilisateur
      const userTheme = localStorage.getItem(`theme_${userId}`);
      if (userTheme) {
        if (userTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", userTheme);
      }

      return data.data;
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
      throw new Error(error.status?.message || "Échec de l'inscription");
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      // Extraire l'ID de l'utilisateur du token JWT
      const tokenData = JSON.parse(atob(data.token.split(".")[1]));
      const userId = tokenData.sub;
      localStorage.setItem("userId", userId);

      // Sauvegarder le thème actuel pour le nouvel utilisateur
      const currentTheme = localStorage.getItem("theme") || "light";
      localStorage.setItem(`theme_${userId}`, currentTheme);

      return data.data;
    } else {
      throw new Error("Token non reçu du serveur");
    }
  },

  logout() {
    const userId = localStorage.getItem("userId");
    const currentTheme = localStorage.getItem("theme");

    // Sauvegarder le thème actuel pour l'utilisateur avant la déconnexion
    if (userId && currentTheme) {
      localStorage.setItem(`theme_${userId}`, currentTheme);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Nettoyer d'autres données si nécessaire
    localStorage.removeItem("user");

    // Restaurer le thème par défaut ou le dernier thème utilisé
    const defaultTheme = localStorage.getItem("theme") || "light";
    if (defaultTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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
