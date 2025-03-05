# Blog Frontend

Interface utilisateur React pour notre application de blog.

## Technologies utilisées

- React 18
- React Router 6
- Tailwind CSS
- Fetch API pour les requêtes HTTP

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- L'API backend doit tourner sur le port 3001

## Installation

1. Cloner le repository

```bash
git clone <votre-repo>
cd blog-front
```

2. Installer les dépendances

```bash
npm install
```

3. Lancer l'application en développement

```bash
npm start
```

L'application sera accessible sur http://localhost:3000

## Fonctionnalités

- Authentification (inscription/connexion)
- Liste des articles
- Création d'articles
- Modification d'articles (pour les propriétaires)
- Suppression d'articles (pour les propriétaires)
- Interface responsive avec Tailwind CSS

## Structure du projet

```
src/
├── components/        # Composants réutilisables
├── pages/            # Pages/Routes principales
├── services/         # Services API
├── App.jsx           # Composant racine
└── index.jsx         # Point d'entrée
```

## Scripts disponibles

- `npm start` - Lance l'application en mode développement
- `npm test` - Lance les tests
- `npm run build` - Crée une version de production
- `npm run eject` - Éjecte la configuration CRA (irréversible)

## Configuration de l'environnement

L'application utilise les variables d'environnement suivantes :

- `REACT_APP_API_URL` - URL de l'API (par défaut: http://localhost:3001)

## Styles

Le projet utilise Tailwind CSS pour le styling. La configuration se trouve dans :

- `tailwind.config.js`
- `postcss.config.js`

## Tests

Les tests sont écrits avec Jest et React Testing Library.
Pour lancer les tests :

```bash
npm test
```

## Build de production

Pour créer une version de production :

```bash
npm run build
```

Le build sera créé dans le dossier `build/`.

## Déploiement

Instructions pour le déploiement à venir...

## Contribution

1. Forker le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Pusher vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## Bonnes pratiques

- Utiliser les composants fonctionnels et les hooks
- Suivre les conventions de nommage React
- Documenter les composants et les fonctions importantes
- Écrire des tests pour les nouvelles fonctionnalités

## Communication avec l'API

### Services API

Le frontend utilise des services dédiés pour communiquer avec l'API :

1. **AuthService** (`src/services/auth.js`) :

```javascript
// Exemple de login
const response = await fetch("http://localhost:3001/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ user: credentials }),
});
```

2. **ArticleService** (`src/services/articles.js`) :

```javascript
// Exemple de récupération d'articles
const response = await fetch("http://localhost:3001/api/v1/articles", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### Gestion des Tokens

- Le token JWT est stocké dans `localStorage`
- Ajouté automatiquement aux headers des requêtes authentifiées
- Vérifié à chaque requête protégée

### Flux de Communication

1. **Authentification** :

   - L'utilisateur remplit le formulaire de connexion
   - Le frontend envoie les credentials à `/login`
   - L'API renvoie un token JWT
   - Le token est stocké dans `localStorage`

2. **Requêtes Authentifiées** :

   - Le token est récupéré du `localStorage`
   - Ajouté dans le header `Authorization`
   - L'API valide le token
   - Renvoie les données ou une erreur 401

3. **Gestion des Erreurs** :
   - 401 : Redirection vers login
   - 404 : Page d'erreur
   - 500 : Message d'erreur utilisateur

### Exemple de Cycle Complet

```javascript
// 1. Login
const token = await AuthService.login(credentials);

// 2. Création d'article
const newArticle = await ArticleService.createArticle({
  title: "Titre",
  content: "Contenu",
});

// 3. Récupération des articles
const articles = await ArticleService.getAllArticles();
```

## Vérifier l'Authentification dans le Navigateur

Pour vérifier l'état de l'authentification et le token JWT dans le navigateur :

1. Ouvrez les DevTools (F12 ou Clic droit > Inspecter)
2. Allez dans l'onglet "Application"
3. Dans le panneau de gauche, développez "Local Storage"
4. Cliquez sur "http://localhost:3000"

Vous devriez voir les éléments suivants :

- `token` : Votre token JWT actuel
- `userId` : L'ID de l'utilisateur connecté
- `theme` : Le thème actuel de l'application

Pour tester l'authentification :

1. Déconnectez-vous (le token devrait disparaître)
2. Connectez-vous (un nouveau token devrait apparaître)
3. Vérifiez que vous pouvez :
   - Voir les articles sans être connecté
   - Créer/Modifier/Supprimer des articles uniquement en étant connecté
   - Modifier/Supprimer uniquement vos propres articles
