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
