
const dataSave = document.querySelector(".data").textContent

const dateEvent = getDate(dataSave)

const today = new Date()

let left = dateEvent.getTime() - today.getTime()

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
addLeftTime(dayLeft, hoursLeft, minutesLeft, secondsLeft)

function addLeftTime(d,h,m,s){
    const p = document.createElement("p")
    p.textContent = `Contagem regressiva: ${d} dias, ${h} horas, ${m} minutos ${s} segundos`
    document.querySelector(".contagemRegressiva").appendChild(p)
}

function getDate(str){
    

    const [date,hour] = str.split(" ")
    const [day,month,year] = date.split("/")
    const [h,m] = hour.split("H")
    
    return new Date(year, month - 1, day, h, m)
}

