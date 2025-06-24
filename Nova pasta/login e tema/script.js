// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'home.html';
    } else if (!currentUser && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }

    // Configura tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    updateThemeButton();

    // Carrega histórico se estiver na home
    if (document.getElementById('historico')) {
        loadHistory(currentUser);
    }
});

// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulação de autenticação 
        if (username && password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'home.html';
        } else {
            document.getElementById('loginError').textContent = 'Usuário/senha inválidos.';
        }
    });
}

// Logout
if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Tema Dark/Light
if (document.getElementById('themeToggle')) {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.className);
    updateThemeButton();
}

function updateThemeButton() {
    const button = document.getElementById('themeToggle');
    if (button) {
        button.textContent = document.body.classList.contains('dark-mode') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    }
}

// Calculadora de IMC
if (document.getElementById('imcForm')) {
    document.getElementById('imcForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);
        const imc = (peso / (altura * altura)).toFixed(2);

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<p>Seu IMC: <strong>${imc}</strong></p>`;

        // Salva no histórico
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const history = JSON.parse(localStorage.getItem(`imcHistory_${currentUser}`) || '[]');
            history.push({
                peso,
                altura,
                imc,
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem(`imcHistory_${currentUser}`, JSON.stringify(history));
            loadHistory(currentUser);
        }
    });
}

function loadHistory(username) {
    const historyDiv = document.getElementById('historico');
    const history = JSON.parse(localStorage.getItem(`imcHistory_${username}`) || []);
    
    if (history.length === 0) {
        historyDiv.innerHTML = '<p>Nenhum cálculo registrado.</p>';
    } else {
        historyDiv.innerHTML = history.map(item => `
            <div class="history-item">
                <p>${item.date}: ${item.peso}kg / ${item.altura}m → IMC: ${item.imc}</p>
            </div>
        `).join('');
    }
}
