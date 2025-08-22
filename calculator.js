// ===== CALCULATRICE PROFESSIONNELLE =====

// Variables globales
let displayValue = '';
let currentInput = '';
let operator = null;
let waitingForSecondOperand = false;
let memoryValue = 0;
let isScientificMode = false;
let currentTheme = 'light';
let calculationHistory = [];

// Constantes mathématiques
const PI = Math.PI;
const E = Math.E;

// ===== FONCTIONS DE BASE =====

function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        displayValue = value;
        waitingForSecondOperand = false;
    } else {
        // Empêcher plusieurs points décimaux
        if (value === '.' && displayValue.includes('.')) return;
        // Empêcher les zéros en début de nombre (sauf pour les décimales)
        if (value === '0' && displayValue === '0') return;
        if (displayValue === '0' && value !== '.') {
            displayValue = value;
        } else {
            displayValue += value;
        }
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') {
        currentInput = parseFloat(displayValue);
    } else if (operator && !waitingForSecondOperand) {
        calculateResult();
        currentInput = parseFloat(displayValue);
    }
    
    operator = op;
    waitingForSecondOperand = true;
    updateHistoryDisplay();
    updateDisplay();
}

function calculateResult() {
    if (operator === null || waitingForSecondOperand) {
        return;
    }
    
    const secondOperand = parseFloat(displayValue);
    let result;
    
    switch (operator) {
        case '+':
            result = currentInput + secondOperand;
            break;
        case '-':
            result = currentInput - secondOperand;
            break;
        case '*':
            result = currentInput * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                showError('Division par zéro impossible!');
                clearDisplay();
                return;
            }
            result = currentInput / secondOperand;
            break;
        default:
            return;
    }
    
    // Ajouter au historique
    addToHistory(`${currentInput} ${operator} ${secondOperand} = ${result}`);
    
    displayValue = result.toString();
    operator = null;
    currentInput = '';
    waitingForSecondOperand = false;
    updateDisplay();
    clearHistoryDisplay();
}

function clearDisplay() {
    displayValue = '';
    currentInput = '';
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
    clearHistoryDisplay();
}

function clearEntry() {
    displayValue = '';
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') displayValue = '0';
    updateDisplay();
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    displayElement.value = displayValue || '0';
}

// ===== FONCTIONS SCIENTIFIQUES =====

function squareRoot() {
    const value = parseFloat(displayValue);
    if (value < 0) {
        showError('Impossible de calculer la racine d\'un nombre négatif');
        return;
    }
    const result = Math.sqrt(value);
    addToHistory(`√(${value}) = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function square() {
    const value = parseFloat(displayValue);
    const result = value * value;
    addToHistory(`${value}² = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function power() {
    if (operator === null) {
        currentInput = parseFloat(displayValue);
        operator = '^';
        waitingForSecondOperand = true;
        updateHistoryDisplay();
        updateDisplay();
    } else if (operator === '^' && !waitingForSecondOperand) {
        const secondOperand = parseFloat(displayValue);
        const result = Math.pow(currentInput, secondOperand);
        addToHistory(`${currentInput}^${secondOperand} = ${result}`);
        displayValue = result.toString();
        operator = null;
        currentInput = '';
        waitingForSecondOperand = false;
        updateDisplay();
        clearHistoryDisplay();
    }
}

function factorial() {
    const value = parseInt(parseFloat(displayValue));
    if (value < 0) {
        showError('Factorielle non définie pour les nombres négatifs');
        return;
    }
    if (value > 170) {
        showError('Nombre trop grand pour le calcul de factorielle');
        return;
    }
    
    let result = 1;
    for (let i = 2; i <= value; i++) {
        result *= i;
    }
    
    addToHistory(`${value}! = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function sin() {
    const value = parseFloat(displayValue);
    const result = Math.sin(value * Math.PI / 180); // Conversion en radians
    addToHistory(`sin(${value}°) = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function cos() {
    const value = parseFloat(displayValue);
    const result = Math.cos(value * Math.PI / 180);
    addToHistory(`cos(${value}°) = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function tan() {
    const value = parseFloat(displayValue);
    const result = Math.tan(value * Math.PI / 180);
    addToHistory(`tan(${value}°) = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function log() {
    const value = parseFloat(displayValue);
    if (value <= 0) {
        showError('Logarithme non défini pour les nombres ≤ 0');
        return;
    }
    const result = Math.log10(value);
    addToHistory(`log(${value}) = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function percentage() {
    const value = parseFloat(displayValue);
    const result = value / 100;
    addToHistory(`${value}% = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function reciprocal() {
    const value = parseFloat(displayValue);
    if (value === 0) {
        showError('Division par zéro impossible');
        return;
    }
    const result = 1 / value;
    addToHistory(`1/${value} = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function absolute() {
    const value = parseFloat(displayValue);
    const result = Math.abs(value);
    addToHistory(`|${value}| = ${result}`);
    displayValue = result.toString();
    updateDisplay();
}

function pi() {
    displayValue = PI.toString();
    updateDisplay();
}

// ===== FONCTIONS MÉMOIRE =====

function memoryClear() {
    memoryValue = 0;
    showNotification('Mémoire effacée');
}

function memoryRecall() {
    displayValue = memoryValue.toString();
    updateDisplay();
}

function memoryAdd() {
    const value = parseFloat(displayValue);
    memoryValue += value;
    showNotification(`Ajouté à la mémoire: ${value}`);
}

function memorySubtract() {
    const value = parseFloat(displayValue);
    memoryValue -= value;
    showNotification(`Soustrait de la mémoire: ${value}`);
}

// ===== GESTION DE L'HISTORIQUE =====

function addToHistory(calculation) {
    const timestamp = new Date().toLocaleTimeString();
    const historyItem = {
        id: Date.now(),
        calculation: calculation,
        timestamp: timestamp
    };
    
    calculationHistory.unshift(historyItem);
    if (calculationHistory.length > 50) {
        calculationHistory.pop(); // Garder seulement les 50 derniers calculs
    }
    
    updateHistoryList();
    saveHistoryToLocalStorage();
}

function updateHistoryDisplay() {
    const historyDisplay = document.getElementById('historyDisplay');
    if (operator && currentInput !== '') {
        historyDisplay.textContent = `${currentInput} ${operator}`;
    } else {
        historyDisplay.textContent = '';
    }
}

function clearHistoryDisplay() {
    const historyDisplay = document.getElementById('historyDisplay');
    historyDisplay.textContent = '';
}

function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    calculationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>${item.calculation}</div>
            <small>${item.timestamp}</small>
        `;
        historyItem.onclick = () => loadCalculationFromHistory(item);
        historyList.appendChild(historyItem);
    });
}

function loadCalculationFromHistory(item) {
    // Extraire le résultat du calcul
    const result = item.calculation.split(' = ')[1];
    displayValue = result;
    updateDisplay();
    showNotification('Calcul chargé depuis l\'historique');
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryList();
    saveHistoryToLocalStorage();
    showNotification('Historique effacé');
}

function exportHistory() {
    if (calculationHistory.length === 0) {
        showNotification('Aucun historique à exporter');
        return;
    }
    
    const csvContent = calculationHistory.map(item => 
        `${item.timestamp},${item.calculation}`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,Calcul\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculatrice_historique_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Historique exporté en CSV');
}

// ===== GESTION DES THÈMES =====

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn.querySelector('i');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    localStorage.setItem('calculator-theme', currentTheme);
    showNotification(`Thème ${currentTheme === 'dark' ? 'sombre' : 'clair'} activé`);
}

// ===== GESTION DES MODES =====

function switchToStandardMode() {
    isScientificMode = false;
    document.getElementById('scientificButtons').style.display = 'none';
    document.getElementById('standardMode').classList.add('active');
    document.getElementById('scientificMode').classList.remove('active');
    showNotification('Mode standard activé');
}

function switchToScientificMode() {
    isScientificMode = true;
    document.getElementById('scientificButtons').style.display = 'block';
    document.getElementById('scientificMode').classList.add('active');
    document.getElementById('standardMode').classList.remove('active');
    showNotification('Mode scientifique activé');
}

// ===== UTILITAIRES =====

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== PERSISTANCE DES DONNÉES =====

function saveHistoryToLocalStorage() {
    try {
        localStorage.setItem('calculator-history', JSON.stringify(calculationHistory));
    } catch (e) {
        console.warn('Impossible de sauvegarder l\'historique:', e);
    }
}

function loadHistoryFromLocalStorage() {
    try {
        const saved = localStorage.getItem('calculator-history');
        if (saved) {
            calculationHistory = JSON.parse(saved);
            updateHistoryList();
        }
    } catch (e) {
        console.warn('Impossible de charger l\'historique:', e);
    }
}

function loadThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        const themeBtn = document.getElementById('themeToggle');
        const icon = themeBtn.querySelector('i');
        
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== ÉVÉNEMENTS CLAVIER =====

function handleKeyPress(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        setOperation(key);
    } else if (key === '*') {
        setOperation('*');
    } else if (key === '/') {
        setOperation('/');
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
}

// ===== INITIALISATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Charger les données sauvegardées
    loadHistoryFromLocalStorage();
    loadThemeFromLocalStorage();
    
    // Initialiser l'affichage
    updateDisplay();
    
    // Ajouter les event listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('standardMode').addEventListener('click', switchToStandardMode);
    document.getElementById('scientificMode').addEventListener('click', switchToScientificMode);
    
    // Support clavier
    document.addEventListener('keydown', handleKeyPress);
    
    // Mode standard par défaut
    switchToStandardMode();
    
    console.log('🚀 Calculatrice Pro initialisée avec succès!');
});

// ===== ANIMATIONS CSS =====

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);