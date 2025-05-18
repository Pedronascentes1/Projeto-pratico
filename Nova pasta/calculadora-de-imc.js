document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateIMC);
    }
    
    if (localStorage.getItem('currentUser')) {
        displayHistory();
    }
});

function calculateIMC() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }
    
    const imc = weight / (height * height);
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    
    let classification = '';
    let color = '';
    
    if (imc < 18.5) {
        classification = 'Magreza';
        color = '#FFC107';
    } else if (imc < 25) {
        classification = 'Normal';
        color = '#4CAF50';
    } else if (imc < 30) {
        classification = 'Sobrepeso';
        color = '#FF9800';
    } else if (imc < 35) {
        classification = 'Obesidade Grau I';
        color = '#F44336';
    } else if (imc < 40) {
        classification = 'Obesidade Grau II';
        color = '#D32F2F';
    } else {
        classification = 'Obesidade Grau III';
        color = '#B71C1C';
    }
    
    resultDiv.innerHTML = `
        <p>Seu IMC é: <strong>${imc.toFixed(1)}</strong></p>
        <p>Classificação: <strong style="color: ${color}">${classification}</strong></p>
    `;
    
    resultDiv.style.backgroundColor = ${color}20;
    resultDiv.style.borderLeft = 4px solid ${color};
    
    if (localStorage.getItem('currentUser')) {
        saveToHistory(imc.toFixed(1), classification);
    }
}

function saveToHistory(imc, classification) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const record = {
        date: new Date().toLocaleDateString(),
        imc: imc,
        classification: classification
    };
    
    if (!currentUser.history) {
        currentUser.history = [];
    }
    
    currentUser.history.push(record);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    displayHistory();
}

function displayHistory() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const historyList = document.getElementById('historyList');
    
    if (currentUser && currentUser.history && historyList) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('userArea').classList.remove('hidden');
        
        historyList.innerHTML = '';
        
        currentUser.history.forEach(record => {
            const li = document.createElement('li');
            li.style.marginBottom = '0.5rem';
            li.innerHTML = `
                <strong>${record.date}:</strong> IMC ${record.imc} (${record.classification})
            `;
            historyList.appendChild(li);
        });
    }
}