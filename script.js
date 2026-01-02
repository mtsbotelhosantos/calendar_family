const aniversariantes = [
    { nome: "Joelisa", dia: 6, mes: 0 },
    { nome: "Solange", dia: 9, mes: 0 },
    { nome: "Silmara 🪽", dia: 9, mes: 0 },
    { nome: "Renata", dia: 14, mes: 0 },
    { nome: "Lindolfo 🪽", dia: 15, mes: 0 },
    { nome: "Geisiel", dia: 29, mes: 0 },
    { nome: "Erica", dia: 4, mes: 2 },
    { nome: "Beijamira", dia: 20, mes: 2 },
    { nome: "Elizeu", dia: 5, mes: 3 },
    { nome: "Ester", dia: 9, mes: 3 },
    { nome: "Felipe", dia: 21, mes: 3 },
    { nome: "Henrique (SP)", dia: 27, mes: 3 },
    { nome: "Andreia", dia: 30, mes: 3 },
    { nome: "José (SP)", dia: 1, mes: 4 },
    { nome: "Weber", dia: 1, mes: 4 },
    { nome: "Matheus", dia: 12, mes: 4 },
    { nome: "Quéren", dia: 12, mes: 4 },
    { nome: "João Lucas", dia: 18, mes: 4 },
    { nome: "Gilmar", dia: 20, mes: 4 },
    { nome: "Nelise", dia: 22, mes: 4 },
    { nome: "Bianca", dia: 27, mes: 4 },
    { nome: "Antônio", dia: 13, mes: 5 },
    { nome: "Alex", dia: 16, mes: 5 },
    { nome: "Alice", dia: 17, mes: 5 },
    { nome: "Bella", dia: 5, mes: 6 },
    { nome: "Zaqueu", dia: 17, mes: 6 },
    { nome: "Luciane", dia: 13, mes: 7 },
    { nome: "Kely", dia: 21, mes: 7 },
    { nome: "Jessi", dia: 5, mes: 8 },
    { nome: "Fabiana", dia: 13, mes: 8 },
    { nome: "Maya", dia: 19, mes: 8 },
    { nome: "Thiago Botelho", dia: 20, mes: 8 },
    { nome: "Luana", dia: 24, mes: 8 },
    { nome: "Naegeli", dia: 10, mes: 9 },
    { nome: "Maitê", dia: 14, mes: 9 },
    { nome: "Lucimari", dia: 16, mes: 9 },
    { nome: "José (Maria)", dia: 20, mes: 9 },
    { nome: "Fábio", dia: 21, mes: 9 },
    { nome: "Daiany", dia: 2, mes: 10 },
    { nome: "Wilson", dia: 20, mes: 10 },
    { nome: "Wesley", dia: 27, mes: 10 },
    { nome: "Maria", dia: 29, mes: 10 },
    { nome: "Eligiani", dia: 20, mes: 11 },
    { nome: "Aparecido", dia: 25, mes: 11 },
    { nome: "Andrew", dia: 27, mes: 11 },
    { nome: "Thiago Henrique", dia: 27, mes: 11 },
    { nome: "Josimar", dia: 29, mes: 11 }
];

const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let dataFoco = new Date();

function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    if(tabId === 'calendario') {
        document.getElementById('btn-cal').classList.add('active');
        renderCalendario();
    } else {
        document.getElementById('btn-lista').classList.add('active');
        renderLista();
    }
}

function renderCalendario() {
    const grid = document.getElementById('calendarGrid');
    const display = document.getElementById('monthDisplay');
    grid.innerHTML = "";

    const ano = dataFoco.getFullYear();
    const mes = dataFoco.getMonth();
    display.innerText = `${mesesNomes[mes]} ${ano}`;

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaSemana; i++) {
        grid.innerHTML += `<div class="calendar-day empty"></div>`;
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const hoje = new Date();
        const eHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
        const nivers = aniversariantes.filter(a => a.dia === dia && a.mes === mes);
        
        const diaDiv = document.createElement('div');
        diaDiv.className = `calendar-day ${eHoje ? 'today' : ''}`;
        
        let miniNomes = nivers.slice(0, 2).map(a => `<span class="niver-name-micro">${a.nome.split(' ')[0]}</span>`).join('');
        if(nivers.length > 2) miniNomes += `<span class="niver-name-micro">+${nivers.length - 2}</span>`;

        diaDiv.innerHTML = `<span class="day-num">${dia}</span>${miniNomes}`;
        
        diaDiv.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            diaDiv.classList.add('selected');
            showDetails(dia, mes, nivers);
        };

        grid.appendChild(diaDiv);
    }
}

function showDetails(dia, mes, nivers) {
    const panel = document.getElementById('detailPanel');
    if (nivers.length === 0) {
        panel.innerHTML = `<h3>${dia} de ${mesesNomes[mes]}</h3><p class="placeholder-text">Nenhum aniversário.</p>`;
        return;
    }
    let html = `<h3>Aniversariantes do dia ${dia}</h3><ul class="detail-list">`;
    nivers.forEach(a => { html += `<li class="detail-item">${a.nome}</li>`; });
    html += `</ul>`;
    panel.innerHTML = html;
}

function renderLista() {
    const container = document.getElementById('listContainer');
    const hoje = new Date();
    container.innerHTML = "";

    mesesNomes.forEach((mesNome, index) => {
        const niversDoMes = aniversariantes
            .filter(a => a.mes === index)
            .sort((a, b) => a.dia - b.dia);

        if (niversDoMes.length > 0) {
            let html = `<div class="month-group"><h3 class="month-title">${mesNome}</h3>`;
            niversDoMes.forEach(a => {
                // VERIFICAÇÃO DE HOJE PARA DESTAQUE
                const ehHoje = (a.dia === hoje.getDate() && a.mes === hoje.getMonth());
                const classeDestaque = ehHoje ? 'hoje-destaque' : '';

                html += `<div class="list-item ${classeDestaque}">
                            <span>${ehHoje ? '🎉 ' : ''}${a.nome}</span> 
                            <strong>${String(a.dia).padStart(2, '0')}/${String(index + 1).padStart(2, '0')}</strong>
                         </div>`;
            });
            html += `</div>`;
            container.innerHTML += html;
        }
    });
}

function changeMonth(diff) {
    dataFoco.setMonth(dataFoco.getMonth() + diff);
    renderCalendario();
}

function goToday() {
    dataFoco = new Date();
    renderCalendario();
}

// Iniciar
renderCalendario();