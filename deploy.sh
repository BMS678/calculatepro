#!/bin/bash

# 🚀 Script de Déploiement - BMS Calculator Pro
# Développé par OpimaCode

set -e

# Configuration
PROJECT_NAME="bms-calculator-pro"
DEPLOY_DIR="/var/www/bms-calculator-pro"
BACKUP_DIR="/var/backups/bms-calculator-pro"
GIT_REPO="https://github.com/votre-username/bms-calculator-pro.git"
BRANCH="main"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    if ! command -v git &> /dev/null; then
        error "Git n'est pas installé"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        error "npm n'est pas installé"
        exit 1
    fi
    
    success "Tous les prérequis sont satisfaits"
}

# Création des répertoires
create_directories() {
    log "Création des répertoires de déploiement..."
    
    sudo mkdir -p "$DEPLOY_DIR"
    sudo mkdir -p "$BACKUP_DIR"
    sudo chown -R $USER:$USER "$DEPLOY_DIR"
    sudo chown -R $USER:$USER "$BACKUP_DIR"
    
    success "Répertoires créés avec succès"
}

# Sauvegarde de l'ancienne version
backup_current() {
    if [ -d "$DEPLOY_DIR/dist" ]; then
        log "Sauvegarde de la version actuelle..."
        
        BACKUP_NAME="backup-$(date +'%Y%m%d-%H%M%S')"
        cp -r "$DEPLOY_DIR/dist" "$BACKUP_DIR/$BACKUP_NAME"
        
        success "Sauvegarde créée: $BACKUP_NAME"
    fi
}

# Clone/Mise à jour du code source
update_source() {
    log "Mise à jour du code source..."
    
    if [ -d "$DEPLOY_DIR/source" ]; then
        cd "$DEPLOY_DIR/source"
        git fetch origin
        git reset --hard origin/$BRANCH
        success "Code source mis à jour"
    else
        cd "$DEPLOY_DIR"
        git clone -b $BRANCH "$GIT_REPO" source
        success "Code source cloné"
    fi
}

# Installation des dépendances
install_dependencies() {
    log "Installation des dépendances..."
    
    cd "$DEPLOY_DIR/source"
    npm ci --production=false
    
    success "Dépendances installées"
}

# Build du projet
build_project() {
    log "Build du projet..."
    
    cd "$DEPLOY_DIR/source"
    npm run build
    
    success "Build terminé"
}

# Déploiement des fichiers
deploy_files() {
    log "Déploiement des fichiers..."
    
    # Copie des fichiers de build
    cp -r "$DEPLOY_DIR/source/dist"/* "$DEPLOY_DIR/"
    
    # Permissions
    sudo chown -R www-data:www-data "$DEPLOY_DIR"
    sudo chmod -R 755 "$DEPLOY_DIR"
    
    success "Fichiers déployés"
}

# Test de l'application
test_deployment() {
    log "Test du déploiement..."
    
    if [ -f "$DEPLOY_DIR/index.html" ]; then
        success "Application déployée avec succès"
        
        # Test de connectivité
        if command -v curl &> /dev/null; then
            HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ || echo "000")
            if [ "$HTTP_STATUS" = "200" ]; then
                success "Application accessible via HTTP"
            else
                warning "Application non accessible via HTTP (Status: $HTTP_STATUS)"
            fi
        fi
    else
        error "Échec du déploiement"
        exit 1
    fi
}

# Nettoyage des anciennes sauvegardes
cleanup_old_backups() {
    log "Nettoyage des anciennes sauvegardes..."
    
    # Garder seulement les 5 dernières sauvegardes
    cd "$BACKUP_DIR"
    ls -t | tail -n +6 | xargs -r rm -rf
    
    success "Anciennes sauvegardes supprimées"
}

# Redémarrage des services
restart_services() {
    log "Redémarrage des services..."
    
    if command -v systemctl &> /dev/null; then
        sudo systemctl reload nginx
        success "Nginx rechargé"
    fi
}

# Affichage des informations de déploiement
show_deployment_info() {
    log "Informations de déploiement:"
    echo "  📁 Répertoire de déploiement: $DEPLOY_DIR"
    echo "  📦 Répertoire de sauvegarde: $BACKUP_DIR"
    echo "  🌐 URL de l'application: http://$(hostname -f)"
    echo "  📅 Date de déploiement: $(date)"
    echo "  🔄 Branche déployée: $BRANCH"
    echo "  👤 Utilisateur de déploiement: $USER"
}

# Fonction principale
main() {
    echo "🚀 Déploiement de BMS Calculator Pro"
    echo "====================================="
    echo ""
    
    check_prerequisites
    create_directories
    backup_current
    update_source
    install_dependencies
    build_project
    deploy_files
    test_deployment
    cleanup_old_backups
    restart_services
    show_deployment_info
    
    echo ""
    success "Déploiement terminé avec succès ! 🎉"
}

# Gestion des erreurs
trap 'error "Erreur lors du déploiement. Vérifiez les logs."; exit 1' ERR

# Exécution du script principal
main "$@"
