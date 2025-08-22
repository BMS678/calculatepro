# 🤝 Guide de Contribution - BMS Calculator Pro

Merci de votre intérêt pour contribuer à **BMS Calculator Pro** ! Ce guide vous aidera à comprendre comment participer au développement de ce projet.

## 📋 Table des Matières

- [Comment Contribuer](#comment-contribuer)
- [Structure du Projet](#structure-du-projet)
- [Standards de Code](#standards-de-code)
- [Processus de Contribution](#processus-de-contribution)
- [Rapport de Bugs](#rapport-de-bugs)
- [Demande de Fonctionnalités](#demande-de-fonctionnalités)
- [Questions et Support](#questions-et-support)

## 🚀 Comment Contribuer

### Types de Contributions Acceptées

- 🐛 **Correction de bugs** : Signalez et corrigez des problèmes
- ✨ **Nouvelles fonctionnalités** : Ajoutez des outils et capacités
- 📱 **Améliorations UI/UX** : Améliorez l'interface et l'expérience utilisateur
- 📚 **Documentation** : Améliorez la documentation et les guides
- 🌍 **Localisation** : Ajoutez de nouvelles langues
- 🧪 **Tests** : Ajoutez ou améliorez les tests
- 🔧 **Optimisations** : Améliorez les performances et la qualité du code

## 📁 Structure du Projet

```
bms-calculator-pro/
├── src/                    # Code source principal
│   ├── assets/            # Images, logos, icônes
│   ├── config/            # Fichiers de configuration
│   ├── pc/                # Version PC optimisée
│   ├── mobile/            # Version mobile optimisée
│   ├── scripts/           # JavaScript principal
│   └── styles/            # Feuilles de style CSS
├── docs/                  # Documentation
├── tests/                 # Tests unitaires et d'intégration
├── examples/              # Exemples d'utilisation
└── README.md              # Documentation principale
```

## 📝 Standards de Code

### JavaScript
- Utilisez ES6+ (const, let, arrow functions, etc.)
- Suivez les conventions de nommage camelCase
- Ajoutez des commentaires JSDoc pour les fonctions complexes
- Gérez les erreurs de manière appropriée

### CSS
- Utilisez des variables CSS pour les couleurs et dimensions
- Suivez la méthodologie BEM pour les classes
- Optimisez pour la responsivité mobile-first
- Utilisez Flexbox et Grid pour les layouts

### HTML
- Utilisez une sémantique HTML5 appropriée
- Incluez des attributs alt pour les images
- Assurez l'accessibilité (ARIA labels, navigation clavier)
- Validez le HTML

## 🔄 Processus de Contribution

### 1. Fork et Clone
```bash
# Fork le projet sur GitHub
# Clone votre fork localement
git clone https://github.com/votre-username/bms-calculator-pro.git
cd bms-calculator-pro

# Ajoutez le dépôt original comme remote upstream
git remote add upstream https://github.com/opimacode/bms-calculator-pro.git
```

### 2. Créez une Branche
```bash
# Créez une branche pour votre fonctionnalité
git checkout -b feature/nom-de-votre-fonctionnalite

# Ou pour une correction de bug
git checkout -b fix/description-du-bug
```

### 3. Développez et Testez
- Développez votre fonctionnalité
- Testez sur différents navigateurs et appareils
- Assurez-vous que le code respecte les standards
- Ajoutez des tests si applicable

### 4. Commit et Push
```bash
# Ajoutez vos modifications
git add .

# Créez un commit descriptif
git commit -m "feat: ajoute la fonctionnalité X pour améliorer Y"

# Poussez vers votre fork
git push origin feature/nom-de-votre-fonctionnalite
```

### 5. Créez une Pull Request
- Allez sur GitHub et créez une Pull Request
- Utilisez le template fourni
- Décrivez clairement vos changements
- Incluez des captures d'écran si applicable

## 🐛 Rapport de Bugs

### Avant de Signaler un Bug
1. Vérifiez que le bug n'a pas déjà été signalé
2. Testez sur la dernière version
3. Vérifiez sur différents navigateurs/appareils

### Informations à Inclure
- **Description** : Décrivez clairement le problème
- **Étapes de reproduction** : Comment reproduire le bug
- **Comportement attendu** : Ce qui devrait se passer
- **Comportement actuel** : Ce qui se passe réellement
- **Environnement** : Navigateur, OS, version
- **Captures d'écran** : Si applicable

## ✨ Demande de Fonctionnalités

### Avant de Demander une Fonctionnalité
1. Vérifiez que la fonctionnalité n'existe pas déjà
2. Considérez si elle s'aligne avec la vision du projet
3. Vérifiez qu'elle n'est pas dans la roadmap

### Informations à Inclure
- **Description** : Décrivez la fonctionnalité souhaitée
- **Cas d'usage** : Quand et comment l'utiliser
- **Avantages** : Pourquoi cette fonctionnalité est utile
- **Alternatives** : Solutions existantes ou alternatives
- **Mockups** : Si applicable

## ❓ Questions et Support

### Où Obtenir de l'Aide
- 📖 **Documentation** : Consultez le README.md et les guides
- 🐛 **Issues GitHub** : Recherchez dans les issues existantes
- 💬 **Discussions** : Utilisez la section Discussions GitHub
- 📧 **Contact** : brunokarume2@gmail.com

### Ressources Utiles
- [Guide de Démarrage Rapide](README.md#-démarrage-rapide)
- [Guide de Monétisation](MONETIZATION_GUIDE.md)
- [Documentation des API](docs/API.md)
- [Guide de Déploiement](docs/DEPLOYMENT.md)

## 🏆 Reconnaissance

Toutes les contributions sont appréciées ! Les contributeurs seront mentionnés dans :
- Le fichier CONTRIBUTORS.md
- La page "À propos" de l'application
- Les notes de version
- Le site web du projet

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous la licence MIT du projet.

---

**Merci de contribuer à BMS Calculator Pro ! 🎉**

*Développé avec ❤️ par OpimaCode*
