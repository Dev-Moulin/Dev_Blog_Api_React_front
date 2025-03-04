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
      throw new Error("Échec de la connexion");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.user;
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
      throw new Error("Échec de l'inscription");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.user;
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
