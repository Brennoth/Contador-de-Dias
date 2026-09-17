const form = document.querySelector(".form")
let contagem;
let datasSaves = []
form.onsubmit = function (event) {
    event.preventDefault();


    const nameEvent = document.querySelector("#nome-evento").value
    const dateHourEvent = document.querySelector("#data-hora").value
    const nameEventInput = document.querySelector("#nome-evento")
    const dataEventInput = document.querySelector("#data-hora") 
    dataEventInput.value = ""
    nameEventInput.value = ""

    const dataEspecifica = pegarDados(dateHourEvent)

    //se ja existee uma contagem, exclui e substitue
    if (contagem) {
        clearInterval(contagem)
    }

    contagem = setInterval(() => {
        let tempoFaltante = QuantoTempoFalta(dataEspecifica)
        mostrarTela(tempoFaltante)
    }, 1000)

    //função ira mostrar o nome do evento na tela
    mostrarNomeEvento(nameEvent)
    const dataFormatadaBr = formatarDataBr(dataEspecifica)
    datasSaves.push(dataFormatadaBr.data)
    armazenarEventos(nameEvent, dataFormatadaBr)



}


function selecionarData() {
    const inputDataHora = document.querySelector("#data-hora")
    const agora = new Date()

    agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
    const dataHoraFormatada = agora.toISOString().slice(0, 16);
    inputDataHora.min = dataHoraFormatada;
}
selecionarData()

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
    return {
        formatada: dataEspecifica.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }),
        data: dataEspecifica
    };
}

function armazenarEventos(nameEvent, dataFormatadaBr) {
    const divSave = document.querySelector(".saved-grid")
    divSave.innerHTML += `
        <div class="saved-card active-saved" data-index="${dataFormatadaBr.data}">
            <div class="saved-info" >
                <h3 class="nameEvent">${nameEvent}</h3>
                <p>${dataFormatadaBr.formatada}</p>
                <button class="btnClear"> excluir </button>
            </div>
        </div>
    
    `
    eventSelecionadoStore()
    excluirEvento()
}

//função que ira deletar o evento salvo
function excluirEvento() {
    const btnsClear = document.querySelectorAll(".btnClear")

    btnsClear.forEach((btn) => {
        btn.addEventListener("click", () => {
            const cardEvent = btn.parentElement.parentElement
            const divCard = btn.parentElement.parentElement

            datasSaves.forEach((data) =>{
                if(divCard.dataset.index == data){

                    
                    const index = datasSaves.indexOf(data)
                    datasSaves.splice(index,1)
                    
                    
                }

            })
            cardEvent.remove()
            
            
        })

    })



}

function eventSelecionadoStore() {
    const divS = document.querySelectorAll(".active-saved")

    divS.forEach((div) => {
        div.addEventListener("click", () => {
            datasSaves.forEach((data) => {
                if (div.dataset.index == data) {
                    const h3 = div.firstElementChild.firstElementChild.textContent
                    mostrarNomeEvento(h3)
                    if (contagem) {
                        clearInterval(contagem)
                    }

                    contagem = setInterval(() => {
                        let tempoFaltante = QuantoTempoFalta(data)
                        mostrarTela(tempoFaltante)
                    }, 1000)



                    // const quantoTempoFalta = QuantoTempoFalta(data)
                    // console.log(quantoTempoFalta)
                    // // mostrarTela(quantoTempoFalta)
                }
            })

        })

    })

}






//toLocaleDateString
//clearInterval(contagem)
