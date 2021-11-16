let userName = prompt("Para entrar no chat, insira seu nome")
let nameObj = {name: userName}

function profile(){
    let page = document.querySelector(".options")
    page.classList.toggle("side")
   
    page.innerHTML = `
    <p1>Escolha um contato <br> para enviar mensagem:</p1>
    <div class="contact">
        <ion-icon name="people"></ion-icon>
        <p2>Todos</p2><br>
        <ion-icon name="person-circle"></ion-icon>
        <p2>João</p2><br>
        <ion-icon name="person-circle"></ion-icon>
        <p2>Maria</p2><br>
    </div>
    <div class="visibility">

    </div>
    <div class="side-over" onclick="profile(this)">    </div>` 
}

function getMsg (){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promisse.then (putMsgOnScreen)

}
getMsg()
function putMsgOnScreen (info) {
    const infoMsgArray = info.data
  console.log(infoMsgArray)

    const main = document.querySelector("main")
    main.innerHTML = ""
    for (let i = 0; i < infoMsgArray.length; i++){
        const here = infoMsgArray[i]
        const type = here.type
        const to = here.to
        const from = here.from

        if (type === "status"){
            const tagMain = document.querySelector("main")
            tagMain.innerHTML += `        
            <div class="stay" data-identifier="message">
            (${here.time}) <strong>${here.from}</strong> entra na sala
            </div> `
        }
        else if (to === "Todos"){
            const tagMain = document.querySelector("main")
            tagMain.innerHTML += `
            <div class="global" data-identifier="message">
            (${here.time}) <strong>${here.from}</strong> para <strong>${here.to}</strong>: ${here.text} 
            </div>
            `
        }
        else if (to === "Todos" && type === "private_message"){
            const tagDirect = document.querySelector("main")
            tagDirect.innerHTML += `
            <div class="direct" data-identifier="message">
            (${here.time}) <strong>${here.from}</strong>  reservadamente para <strong>${here.to}</strong>: ${here.text} 
            </div>
            `
        }
        else if ((to === userName || from === userName) && type === "private_message"){
            const tagDirect = document.querySelector("main")
            tagDirect.innerHTML += `
            <div class="direct" data-identifier="message">
            (${here.time}) <strong>${here.from}</strong>  reservadamente para <strong>${here.to}</strong>: ${here.text} 
            </div>
            `
        }
        
    }

    const last = document.querySelector("main div:last-child")
    last.scrollIntoView()

}
setInterval(getMsg, 3000)

function logIn (){
    let promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameObj)
    promisse.then(setInterval(logStay, 5000))
    promisse.catch(erroLogIn)
    
}
function erroLogIn (){
    alert("Usuário já cadastrado")
    window.location.reload()
}
logIn()
function logStay (){
    let promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameObj)
    promisse.catch(console.log(promisse))
   
} 

function sendMsg () {
    const msgInput = document.querySelector(".msgInput")
    const text = msgInput.value
    const msgObj = {
            from: userName,
            to: "Todos",
            text: text,
            type: "message" 
    }
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", msgObj)
    promisse.then(getMsg)
    promisse.catch(window.location.reload)
}
