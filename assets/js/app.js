const form = document.querySelector(".form")
let contagem;
form.onsubmit = function (event) {
    event.preventDefault();


    const nameEvent = document.querySelector("#nome-evento").value
    const dateHourEvent = document.querySelector("#data-hora").value

    const dataEspecifica = pegarDados(dateHourEvent)

    //se ja existee uma contagem, exclui e substitue
    if (contagem) {
        clearInterval(contagem)
    }

    //DESCUBRIR COMO COLOCAR O VALOR QUE ESTA EM "QUANTOTEMPOFALTA" NA VARIAVEL CONTAGEM
    contagem = setInterval(() => {
        let tempoFaltante = QuantoTempoFalta(dataEspecifica)
        mostrarTela(tempoFaltante)
    }, 1000)

    //função ira mostrar o nome do evento na tela
    mostrarNomeEvento(nameEvent)
    const dataFormatadaBr = formatarDataBr(dataEspecifica)
    armazenarEventos(nameEvent, dataFormatadaBr)
}

//essa função retorna os horarios dentro de uma variavel
function pegarDados(dataHourEvent) {

    const horario = dataHourEvent.slice(11, 100)
    const [hora, minuto] = horario.split(":")

    const data = dataHourEvent.slice(0, 10)
    const [ano, mes, dia] = data.split("-")

    return new Date(ano, mes - 1, dia, hora, minuto)
}

//ira descubrir quanto tempo falta
function QuantoTempoFalta(dataEspecifica) {
    const today = new Date()

    let left = dataEspecifica.getTime() - today.getTime()

    const ONE_MINUTE = 60 * 1000
    const ONE_HOUR = 60 * 60 * 1000
    const ONE_DAY = 24 * 60 * 60 * 1000

    //mostra quantos dias que falta
    const dayLeft = parseInt(left / ONE_DAY)
    left = left - dayLeft * ONE_DAY

    const hoursLeft = parseInt(left / ONE_HOUR)
    left = left - hoursLeft * ONE_HOUR

    const minutesLeft = parseInt(left / ONE_MINUTE)
    left = left - minutesLeft * ONE_MINUTE

    const secondsLeft = parseInt(left / 1000)
    return {
        dia: dayLeft,
        hora: hoursLeft,
        minuto: minutesLeft,
        segundos: secondsLeft
    }
}

//ira mostrar na tela quanto tempo falta
function mostrarTela(tempoFaltante) {
    const dia = document.querySelector("#dia")
    const hora = document.querySelector("#hora")
    const minutos = document.querySelector("#minutos")
    const segundos = document.querySelector("#segundos")

    dia.textContent = tempoFaltante.dia
    hora.textContent = tempoFaltante.hora
    minutos.textContent = tempoFaltante.minuto
    segundos.textContent = tempoFaltante.segundos

}

//ira mostrar na tela qual e o nome do evento
function mostrarNomeEvento(nameEvent) {
    const h2 = document.querySelector("#nameEvent")
    h2.textContent = nameEvent
}

//ira formatar a data que esta em EN, para pt-BR
function formatarDataBr(dataEspecifica) {
    return dataEspecifica.toLocaleDateString("pt-BR", {
        day: "2-digit",      // Ex: 23
        month: "short",      // Ex: set.
        year: "numeric",     // Ex: 2026
        hour: "2-digit",     // Ex: 11
        minute: "2-digit"    // Ex: 33
    })

}


function armazenarEventos(nameEvent, dataFormatadaBr) {
    const divSave = document.querySelector(".saved-grid")
    divSave.innerHTML = `
        <div class="saved-card active-saved">
            <div class="saved-info">
                <h3>${nameEvent}</h3>
                <p>${dataFormatadaBr}</p>
            </div>
        </div>
    
    `
}

// 1. Seleciona o elemento do input
const inputDataHora = document.querySelector("#data-hora");

// 2. Pega a data e hora atuais do sistema
const agora = new Date();

// 3. Ajusta o fuso horário local para o formato ISO correto
agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());

// 4. Converte para a string no formato exato "YYYY-MM-DDTHH:mm"
const dataHoraFormatada = agora.toISOString().slice(0, 16);

// 5. Aplica a limitação de data mínima no HTML
inputDataHora.min = dataHoraFormatada;


//toLocaleDateString
//clearInterval(contagem)
