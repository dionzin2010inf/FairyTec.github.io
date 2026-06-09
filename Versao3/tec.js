let form = document.getElementById("formulario");
let musica = document.getElementById("musica");

    document.addEventListener('click', (evento) => {
        if (musica.paused) {
            musica.play().catch(() => {
            });
        }
    });

let fila_espera = [];

let dados = localStorage.getItem("fila_espera");

if (dados !=null) {
    fila_espera = dados.split(",");
} else {
    fila_espera = [];
}

let resultado_espera = document.getElementById("resultado_espera");

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    let nome = document.getElementById("nome").value;

    let tipo_atendimento =
    document.querySelector('input[name="radio_s"]:checked').value;

    adicionar(nome, tipo_atendimento);
    
    listar();

    form.reset();
});


function adicionar(param_nome, param_tipo_atendimento){
    if(param_tipo_atendimento === "prioridade"){
        fila_espera.unshift(param_nome);
    } else{
        fila_espera.push(param_nome);
    }

    localStorage.setItem(
        "fila_espera",
        fila_espera.join(",")
    );
}

function listar(){
    resultado_espera.innerHTML ="";

    if (fila_espera.length === 0) {
        resultado_espera.innerHTML = "Fila Vazia.";
        return;
    }

    for(let i = 0; i <fila_espera.length; i++){

        resultado_espera.innerHTML += `
        <p>Índice ${i} - Valor: ${fila_espera[i]}</p>

        <input 
            type="button" 
            class="new_btn" 
            onclick="editar(${i})" 
            value="Editar">

        <input 
            type="button" 
            class="new_btn" 
            onclick="deletarIndice(${i})" 
            value="Excluir">

        <br/><br/>
        `;
    }
}

function atender(){
    fila_espera.shift();
    if (fila_espera.length > 0) {
        localStorage.setItem(
        "fila_espera",
        fila_espera.join(",")
        );
    } else {
        localStorage.removeItem("fila_espera");
    }

    listar();
}

function deletarIndice(indice) {
    fila_espera.splice(indice, 1);
    if (fila_espera.length > 0) {
        localStorage.setItem(
        "fila_espera",
        fila_espera.join(",")
        );
    } else {
        localStorage.removeItem("fila_espera");
    }

    listar();
}

function editar(indice) {
    let novoNome = prompt("Digite o novo nome:");
    if (novoNome != null && novoNome.trim() !== "") {
        fila_espera[indice] = novoNome;
        localStorage.setItem(
        "fila_espera",
        fila_espera.join(",")
        );

        listar();
    }
}

listar();