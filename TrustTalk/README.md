# Application de chat peer-to-peer avec WebRTC : TrustTalk

## Description
Ce projet est une application de chat en temps réel utilisant une architecture réseau peer-to-peer activée par WebRTC pour une communication directe entre les clients. Le serveur de signalisation, construit avec Node.js et WebSocket, facilite la configuration initiale de la connexion entre les clients. L'application garantit qu'une fois qu'une connexion peer-to-peer est établie, toutes les données (en particulier les messages de chat) sont échangées directement entre les clients, réduisant ainsi la latence et la charge du serveur.

## Architecture

### Front-end
- **Framework**: React
- **Bibliothèque UI**: Semantic UI React
- **Fichiers Clés**:
  - `App.js`: Point d'entrée principal, gère le contexte pour la connexion et le canal WebRTC.
  - `Container.js`: Enveloppe le composant Chat avec les fournisseurs de contexte nécessaires.
  - `Chat.js`: Fonctionnalité de chat principale, gère la connexion WebSocket et les connexions entre pairs WebRTC.
  - `MessageBox.js`: Affiche les messages de chat et le champ de saisie.
  - `UsersList.js`: Affiche une liste des utilisateurs en ligne et permet de se connecter à eux.

### Back-end
- **Langage**: JavaScript
- **Framework**: Node.js
- **Bibliothèque WebSocket**: ws
- **Responsabilités Clées**:
  - Maintenir une liste des clients connectés.
  - Informer les clients des nouvelles connexions.
  - Transmettre les offres et les réponses de connexion.
  - Échanger des candidats ICE.
  - Informer les utilisateurs lorsqu'un client se déconnecte.

## Structure du Code

```
TrustTalk
├── public
│   ├── index.html
│   ├── manifest.json
├── src
│   ├── App.js
│   ├── index.js
│   ├── Container.js
│   ├── Chat.js
│   ├── MessageBox.js
│   ├── UsersList.js
├── signaling-server.js
├── .gitignore
├── README.md
└── package.json
```

## Organisation du Code Source
- `src`: Contient tous les composants front-end React.
- `server`: Contient le serveur de signalisation WebSocket Node.js.
- `public`: Fichiers statiques pour l'application React.
- `README.md`: Documentation du projet.
- `package.json`: Dépendances du projet et scripts.

## Synchronisation avec Git
- Utilisez `git clone <repository-url>` pour cloner le dépôt.
- Commits réguliers avec des messages significatifs.
- Stratégie de branches pour le développement de fonctionnalités, les corrections de bugs et les versions.

## Sécurité
### Back-end
- Validation des Entrées: Assurez-vous que toutes les entrées sont désinfectées pour éviter les attaques par injection.
- Sécurité WebSocket: Gérez les connexions WebSocket de manière sécurisée pour éviter les accès non autorisés et les violations de données.
### Front-end
- Protection contre les Scripts Intercalés (XSS):
  - Désinfectez les entrées utilisateur et échappez les sorties dans les composants React.
  - Utilisez les mécanismes de protection intégrés de React contre XSS.
- Gestion de l'Identité et de l'Accès:
  - Mettez en œuvre des mécanismes d'authentification et d'autorisation des utilisateurs.
  - Utilisez des méthodes sécurisées pour la connexion des utilisateurs et la gestion des sessions.

## Compatibilité Multiplateforme
L'application est conçue pour être compatible avec différents navigateurs Web et appareils:
- Navigateurs: Chrome, Firefox, Safari, Edge
- Appareils: Ordinateurs de bureau, tablettes, smartphones

## Conception Responsive
Utilise Semantic UI React pour des composants d'interface utilisateur réactifs et adaptatifs.
Testé pour la compatibilité sur différents tailles et résolutions d'écran.

## Test de Compatibilité
- Test régulier sur différents navigateurs et appareils.
- Utilisation d'outils comme BrowserStack pour les tests multi-navigateurs.

## Documentation
### Documentation du Code
- Commentaires: Commentaires en ligne expliquant la fonctionnalité du code.
- JSdoc: Pour documenter les fonctions, les paramètres et les valeurs de retour.

### Guides de Configuration et de Déploiement
#### Installation:
- Cloner le dépôt.
- Exécutez `npm install` pour installer les dépendances.

#### Lancement du Serveur:
- Naviguez vers le répertoire du serveur 'signaling-server'.
- Exécutez `node signaling-server.js` pour démarrer le serveur de signalisation.

#### Démarrage du Front-end:
- Naviguez vers le répertoire racine 'TrustTalk'.
- Exécutez `npm start` pour lancer l'application React.

#### Déploiement:
- Assurez-vous que toutes les dépendances sont installées.
- Déployez le serveur Node.js sur un service cloud (par exemple, Heroku, AWS).
- Déployez l'application React en utilisant un service d'hébergement de site statique (par exemple, Netlify, Vercel).