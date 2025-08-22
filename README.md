# 🧮 BMS Calculator Pro - RDC Edition

Une calculatrice web professionnelle avec des fonctionnalités avancées, un design moderne et une expérience utilisateur exceptionnelle, développée par **OpimaCode** pour le marché congolais.

![BMS Calculator Pro](src/assets/logo.svg)

## ✨ Fonctionnalités

### 💰 **Système de Monétisation (Adapté RDC)**
- **Dons et support** : Orange Money (0847305825), Vodacom M-Pesa (0820098808)
- **Publicité discrète** : Bannières pour vos services
- **Analytics avancés** : Suivi des performances et revenus
- **Système de récompenses** : Niveaux Supporter, Patron, Sponsor
- **Conformité locale** : Respect des réglementations RDC
- **Paiement mobile** : Intégration native avec les opérateurs locaux

### 🎯 **Mode Standard**
- Opérations de base : addition, soustraction, multiplication, division
- Gestion des nombres décimaux
- Bouton Clear (C) et Clear Entry (CE)
- Retour arrière (Backspace)
- Support clavier complet

### 🔬 **Mode Scientifique**
- **Fonctions trigonométriques** : sin, cos, tan (en degrés)
- **Fonctions mathématiques** : racine carrée, carré, puissance, factorielle
- **Logarithmes** : log base 10
- **Pourcentages** et réciproque (1/x)
- **Valeur absolue** et constante π
- **Calculs avancés** avec gestion des erreurs

### 💾 **Système de Mémoire**
- **MC** : Effacer la mémoire
- **MR** : Rappeler la valeur en mémoire
- **M+** : Ajouter à la mémoire
- **M-** : Soustraire de la mémoire

### 📚 **Historique des Calculs**
- Sauvegarde automatique des 50 derniers calculs
- Affichage avec horodatage
- Clic pour recharger un calcul précédent
- Export en format CSV, JSON ou TXT
- Persistance locale (localStorage)

### 🎨 **Interface Moderne Premium**
- **Thème clair/sombre** avec persistance
- Design responsive et adaptatif
- Animations fluides et transitions
- Icônes Font Awesome
- Interface intuitive et professionnelle
- **Effets visuels avancés** : glassmorphism, particules, cursor personnalisé

### ⌨️ **Support Clavier**
- **Chiffres** : 0-9
- **Opérateurs** : +, -, *, /
- **Entrée** : Enter ou =
- **Effacer** : Escape
- **Retour arrière** : Backspace

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Node.js (pour le développement)

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

### Utilisation
1. Ouvrez votre navigateur à l'adresse affichée (généralement `http://localhost:8080`)
2. Utilisez la souris ou le clavier pour effectuer vos calculs
3. Basculez entre les modes Standard et Scientifique
4. Changez de thème avec le bouton lune/soleil
5. Consultez l'historique et exportez vos calculs

## 🛠️ Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Styling** : CSS Variables, Grid, Flexbox, Animations avancées
- **Icônes** : Font Awesome 6
- **Serveur de développement** : Live Server
- **Stockage** : LocalStorage pour la persistance
- **Effets visuels** : Glassmorphism, Particules, Cursor personnalisé
- **Monétisation** : Orange Money, Vodacom M-Pesa, Analytics, Conformité RDC

## 📱 Responsive Design

L'application s'adapte automatiquement à tous les écrans :
- **Desktop** : Interface complète avec toutes les fonctionnalités
- **Tablet** : Adaptation automatique de la taille des boutons
- **Mobile** : Interface optimisée pour les écrans tactiles

## 🔧 Configuration

### Variables CSS Personnalisables
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #f093fb;
    --accent-color: #4facfe;
    --success-color: #43e97b;
    --warning-color: #fa709a;
    --danger-color: #ff6b6b;
    /* ... autres couleurs */
}
```

### Thèmes
- **Clair** : Interface lumineuse et moderne
- **Sombre** : Interface sombre pour les environnements peu éclairés
- **Automatique** : Adaptation selon les préférences système

## 📊 Fonctionnalités Avancées

### Gestion des Erreurs
- Division par zéro
- Racine carrée de nombres négatifs
- Factorielle de nombres trop grands
- Logarithme de nombres ≤ 0

### Optimisations
- Limitation de l'historique à 50 calculs
- Sauvegarde automatique des préférences
- Gestion efficace de la mémoire
- Animations fluides et performantes

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Font Awesome** pour les icônes
- **Math.js** pour l'inspiration des fonctions mathématiques
- **CSS Grid** pour la mise en page moderne
- **OpimaCode** pour le développement et la conception

## 📞 Support et Contact

Si vous rencontrez des problèmes ou avez des suggestions :

- **📧 Email** : brunokarume2@gmail.com
- **👨‍💻 Développeur** : OpimaCode
- **🌐 Site web** : https://opimacode.com

## 💰 Monétisation

Pour configurer le système de monétisation et commencer à générer des revenus :

- **📖 Guide complet** : [MONETIZATION_GUIDE.md](MONETIZATION_GUIDE.md)
- **⚙️ Configuration** : `src/config/monetization-config.js`
- **🔧 Scripts** : `src/scripts/monetization.js`

---

**Développé avec ❤️ par OpimaCode pour offrir la meilleure expérience calculatrice possible**

**© 2024 OpimaCode - Tous droits réservés**