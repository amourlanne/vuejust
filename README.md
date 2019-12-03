# VueJust

VueJust est une application web implémentant différentes fonctionnalités de base. VueJust s'apparente à un mini-framework.

VueJust contient les fonctionnalités suivantes:
- Gestion utilisateur
    - authentification [à double cookies](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3)
    - création de compte (confirmation par email)
    - récupération de mot de passe
    - autorisation (pages et ressources) par rôle utilisateur
- Multilingue
    - multilingue application (intégré ou non au système de routes)
    - multilingue API (messages d'erreurs etc ...)
- Fixtures
- Environnement de développement (Hot reloading)
- Tests

## Architecture
Le projet est composé d'une API [Node.js](https://nodejs.org/en/) utilisant le framework [express.js](https://expressjs.com/fr/) et d'une application utilisateur utilisant [Vue.js](https://vuejs.org/).

La base de données ([MariaDB](https://mariadb.org/) + PHPMyAdmin), le serveur de mail ([maildev](https://github.com/maildev/maildev)) et le serveur de sessions ([Redis](https://redis.io/)) se mettent en place à l'aide de docker et nottament du fichier docker-compose.

```
├── src 
│   ├── app (application utilisateur Vue.js)
│   └── server (API express.js)
├── .env
└── docker-compose.yaml
```
## Pre-requis
- votre gestionnaire de paquets preferré ([yarn](https://yarnpkg.com/lang/fr/) ou [npm](https://www.npmjs.com/))
- [Docker](https://www.docker.com/) ou (base de données + serveur de mail)

## Installation

#### Récuperer le dépôt
```git
git clone git@github.com:amourlanne/vuejust.git
```

#### Installer les dépendances

Dans `src/server` et `src/app`
```bash
yarn # ou 'npm install'
```

## Configuration
Les applicatifs docker se configurent dans le fichier `.env` à la racine du dépôt.
La configuration de l'ORM se fait dans le fichier `ormconfig.json` dans `src/server`.

## Utilisation

### Lancer l'architecture logicielle externe

```bash
docker-compose up -d --build
```
### Lancer les applications en developpement
Lancer l'API dans `src/server` et l'application utilisateur dans `src/app`
```bash
yarn start
```
### Build en production
Build l'API dans `src/server` et l'application utilisateur dans `src/app`
```bash
yarn build
```

## Utilisation avancée

### Migrations
L'application utilise la librairie [typeorm](https://github.com/typeorm/typeorm) pour le mapping des entites (dans `src/server`).
#### Generer une migration
```bash
yarn migration:generate 'migration-name' # ou npm run migration:generate 'migration-name'
```

#### Lancer les migrations

```bash
yarn migration # ou npm run migration
```

### Fixtures
L'application utilise la librairie [typeorm-fixtures](https://github.com/RobinCK/typeorm-fixtures) pour les fixtures (dans `src/server`).
```bash
yarn fixtures # ou npm run fixtures
```

### Tests

Lancer les tests de l'API dans `src/server` et de l'application utilisateur dans `src/app`

```bash
yarn test # ou npm run test
```

## Technologies

### API
- [express](https://github.com/expressjs/express)
- [routing-controllers](https://github.com/typestack/routing-controllers)
- [typeorm](https://github.com/typeorm/typeorm)
- [typeorm-fixtures](https://github.com/RobinCK/typeorm-fixtures)

### Application utilisateur
- [Vue.js](https://vuejs.org/)
- [datatable.net](https://datatables.net/)

## Contribution
Les demandes de modifications sont les bienvenues. Pour les changements majeurs, veuillez ouvrir une question pour discuter de ce que vous aimeriez changer.

Assurez-vous de mettre à jour les tests selon les besoins.

## License
[MIT](https://choosealicense.com/licenses/mit/)
