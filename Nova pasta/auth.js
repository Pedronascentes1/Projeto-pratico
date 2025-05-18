document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('currentUser')) {
        displayHistory();
    }
    
    const loginBtn = document.getElementById('loginBtn');
    const registerLink = document.getElementById('registerLink');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (registerLink) registerLink.addEventListener('click', handleRegister);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        displayHistory();
        alert('Login realizado com sucesso!');
    } else {
        alert('E-mail ou senha incorretos.');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const email = prompt('Digite seu e-mail:');
    if (!email) return;
    
    const name = prompt('Digite seu nome:');
    if (!name) return;
    
    const password = prompt('Digite uma senha:');
    if (!password) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }
    
    const newUser = {
        name: name,
        email: email,
        password: password,
        history: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    displayHistory();
    alert('Cadastro realizado com sucesso! Você já está logado.');
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('userArea').classList.add('hidden');
    alert('Você foi desconectado.');
}

function displayHistory() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const historyList = document.getElementById('historyList');
    
    if (currentUser && historyList) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('userArea').classList.remove('hidden');
        
        historyList.innerHTML = '';
        
        if (currentUser.history && currentUser.history.length > 0) {
            currentUser.history.forEach(record => {
                const li = document.createElement('li');
                li.style.marginBottom = '0.5rem';
                li.innerHTML = `
                    <strong>${record.date}:</strong> IMC ${record.imc} (${record.classification})
                `;
                historyList.appendChild(li);
            });
        } else {
            historyList.innerHTML = '<li>Nenhum registro de IMC encontrado.</li>';
        }
    }
}