# VueJust

## Description


VueJust est une application web implementant differentes fonctionnalites de base s'apparentant à un mini-framework.

- Gestion utilisateur
    - authentification [à double cookies](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3)
    - création de compte (confirmation par email)
    - récupération de mot de passe
    - autorisation par rôle utilisateur
- Multilingue
    - multilingue application (intégré ou non au système de routes)
    - multilingue API (messages d'erreurs etc ...)
- Fixtures

## Architecture
Le projet est composé d'une API node.js utilisant le framework express.js et d'une application utilisateur utilisant Vue.js.

```
├── src 
│   ├── app (application Vue.js)
│   └── server (API express.js)
├── .env
└── docker-compose.yaml
```

## Installation

Use the package manager [yarn](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
