const form = document.querySelector(".form")

form.onsubmit = function (event) {
    event.preventDefault();

    const NameEvent = document.querySelector("#nome-evento").value
    const dateHourEvent = document.querySelector("#data-hora").value

    const dataEspecifica = pegarDados(NameEvent, dateHourEvent)


    //DESCUBRIR COMO COLOCAR O VALOR QUE ESTA EM "QUANTOTEMPOFALTA" NA VARIAVEL CONTAGEM
    let contagem = setInterval(()=>{
         let a = QuantoTempoFalta(dataEspecifica)
         console.log(a)
    }, 1000)
        

}

//essa função retorna os horarios dentro de uma variavel
function pegarDados(NomeEvent, dataHourEvent) {

    const horario = dataHourEvent.slice(11, 100)
    const [hora, minuto] = horario.split(":")

    const data = dataHourEvent.slice(0, 10)
    const [ano, mes, dia] = data.split("-")

    return new Date(ano, mes - 1, dia, hora, minuto)
}

//quanto tempo falta
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
    return{
        dia: dayLeft,
        hora: hoursLeft,
        minuto: minutesLeft,
        segundos: secondsLeft
    }
    console.log( dayLeft, hoursLeft, minutesLeft, secondsLeft)


}









