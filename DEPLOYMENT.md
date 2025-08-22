# 🚀 Guide de Déploiement - BMS Calculator Pro

Ce guide vous explique comment déployer **BMS Calculator Pro** sur différentes plateformes.

## 📋 Table des Matières

- [Prérequis](#prérequis)
- [Déploiement Local](#déploiement-local)
- [Déploiement GitHub Pages](#déploiement-github-pages)
- [Déploiement Netlify](#déploiement-netlify)
- [Déploiement Vercel](#déploiement-vercel)
- [Déploiement Sur Serveur](#déploiement-sur-serveur)
- [Configuration de Production](#configuration-de-production)
- [Monitoring et Maintenance](#monitoring-et-maintenance)

## 🔧 Prérequis

### Outils Requis
- **Node.js** : Version 16.x ou supérieure
- **npm** : Version 8.x ou supérieure
- **Git** : Version 2.x ou supérieure
- **Navigateur moderne** : Chrome 90+, Firefox 88+, Safari 14+

### Vérification
```bash
# Vérifiez les versions
node --version
npm --version
git --version
```

## 🏠 Déploiement Local

### 1. Installation des Dépendances
```bash
# Clonez le projet
git clone https://github.com/votre-username/bms-calculator-pro.git
cd bms-calculator-pro

# Installez les dépendances
npm install
```

### 2. Démarrage du Serveur de Développement
```bash
# Démarrez le serveur local
npm start

# Ou avec live-server directement
npx live-server src --port=3000
```

### 3. Accès à l'Application
- **Version Web** : http://localhost:3000
- **Version PC** : http://localhost:3000/pc/
- **Version Mobile** : http://localhost:3000/mobile/

## 🌐 Déploiement GitHub Pages

### 1. Configuration du Dépôt
```bash
# Assurez-vous que votre dépôt est public
# Ou configurez GitHub Pages pour les dépôts privés
```

### 2. Configuration GitHub Actions
Le fichier `.github/workflows/ci.yml` est déjà configuré pour le déploiement automatique.

### 3. Activation de GitHub Pages
1. Allez dans **Settings** > **Pages**
2. Sélectionnez **GitHub Actions** comme source
3. Configurez le domaine personnalisé si nécessaire

### 4. Déploiement Automatique
- Chaque push sur la branche `main` déclenche le déploiement
- Le site est accessible à : `https://votre-username.github.io/bms-calculator-pro`

## ☁️ Déploiement Netlify

### 1. Connexion à Netlify
1. Connectez-vous à [netlify.com](https://netlify.com)
2. Cliquez sur **New site from Git**

### 2. Configuration du Dépôt
```bash
# Repository : votre-username/bms-calculator-pro
# Branch : main
# Build command : npm run build
# Publish directory : dist
```

### 3. Variables d'Environnement
```bash
NODE_ENV=production
NODE_VERSION=18
```

### 4. Déploiement
- Netlify déploie automatiquement à chaque push
- URL : `https://votre-site.netlify.app`

## ⚡ Déploiement Vercel

### 1. Installation de Vercel CLI
```bash
npm i -g vercel
```

### 2. Connexion et Déploiement
```bash
# Connectez-vous à Vercel
vercel login

# Déployez le projet
vercel

# Suivez les instructions
```

### 3. Configuration
```bash
# vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "src/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/$1"
    }
  ]
}
```

## 🖥️ Déploiement Sur Serveur

### 1. Serveur VPS/Dédié
```bash
# Connexion SSH
ssh user@votre-serveur.com

# Installation des outils
sudo apt update
sudo apt install nginx nodejs npm git

# Clone du projet
git clone https://github.com/votre-username/bms-calculator-pro.git
cd bms-calculator-pro

# Installation des dépendances
npm install

# Build de production
npm run build
```

### 2. Configuration Nginx
```nginx
# /etc/nginx/sites-available/bms-calculator
server {
    listen 80;
    server_name votre-domaine.com;
    root /var/www/bms-calculator-pro/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache pour les assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### 3. Activation du Site
```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/bms-calculator /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

## ⚙️ Configuration de Production

### 1. Variables d'Environnement
```bash
# .env.production
NODE_ENV=production
API_URL=https://api.votre-domaine.com
ANALYTICS_ID=GA_MEASUREMENT_ID
MONETIZATION_ENABLED=true
```

### 2. Optimisations de Performance
```javascript
// Service Worker pour le cache
// Compression des assets
// Lazy loading des composants
// Minification du code
```

### 3. Sécurité
```bash
# Headers de sécurité
# HTTPS obligatoire
# CSP (Content Security Policy)
# Rate limiting
```

## 📊 Monitoring et Maintenance

### 1. Outils de Monitoring
- **Google Analytics** : Suivi des utilisateurs
- **Sentry** : Gestion des erreurs
- **Uptime Robot** : Surveillance de disponibilité
- **Lighthouse** : Audit de performance

### 2. Maintenance Régulière
```bash
# Mise à jour des dépendances
npm audit
npm update

# Vérification des performances
npm run lighthouse

# Sauvegarde des données
npm run backup
```

### 3. Mise à Jour
```bash
# Pull des dernières modifications
git pull origin main

# Installation des nouvelles dépendances
npm install

# Build et redéploiement
npm run build
sudo systemctl restart nginx
```

## 🚨 Dépannage

### Problèmes Courants

#### Erreur 404 sur les Routes
```nginx
# Vérifiez la configuration Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Problèmes de Cache
```bash
# Videz le cache du navigateur
# Vérifiez les headers de cache
# Utilisez des noms de fichiers avec hash
```

#### Erreurs de Build
```bash
# Vérifiez les versions Node.js
# Nettoyez le cache npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Pour toute question sur le déploiement :
- 📧 **Email** : brunokarume2@gmail.com
- 🐛 **Issues GitHub** : [Créer une issue](https://github.com/votre-username/bms-calculator-pro/issues)
- 📚 **Documentation** : Consultez le README.md

---

**Bon déploiement ! 🚀**

*Développé avec ❤️ par OpimaCode*
