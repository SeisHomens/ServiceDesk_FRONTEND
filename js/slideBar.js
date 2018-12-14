var nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado');
var sobrenomeUsuarioLogado = localStorage.getItem('sobrenomeUsuarioLogado');
var emailUsuarioLogado = localStorage.getItem('emailUsuarioLogado');
var tipoUsuarioLogado = localStorage.getItem('tipoUsuarioLogado');
var projetoVinculadoUsuarioLogado = localStorage.getItem('projetoVinculadoUsuarioLogado');

//----------------------------------------------------

const userside = document.getElementById('userside');

let nomeExibicaoSup = document.createElement('div');
nomeExibicaoSup.setAttribute('class', 'nomet');
nomeExibicaoSup.setAttribute('id', 'nome');
nomeExibicaoSup.textContent = nomeUsuarioLogado + ' ' + sobrenomeUsuarioLogado;
userside.appendChild(nomeExibicaoSup);

const usuarioInform = document.getElementById('Usuarioinform');

let fotoUsuario = document.createElement('div');
fotoUsuario.setAttribute('class', 'usuariofotoclass');
fotoUsuario.setAttribute('id', 'usuariofoto');
usuarioInform.appendChild(fotoUsuario);

let nomeExibicao = document.createElement('div');
nomeExibicao.setAttribute('id', 'nomee');
nomeExibicao.textContent = 'Nome: ' + nomeUsuarioLogado + ' ' + sobrenomeUsuarioLogado;
usuarioInform.appendChild(nomeExibicao);

let emailExibicao = document.createElement('div');
emailExibicao.setAttribute('id', 'nomee');
emailExibicao.textContent = 'Email: ' + emailUsuarioLogado;
usuarioInform.appendChild(emailExibicao);

var userclossclass = document.getElementById('usercloss');
var usuarioinformclass = document.getElementById('Usuarioinform');
var nomee = document.getElementById('nome');

function openuser() {
    document.getElementById("userside").style.height = "60%";
    userclossclass.style.display = "block";
    usuarioinformclass.style.display = "block";
    nomee.style.display = "none";

}

function closeuser() {
    document.getElementById("userside").style.height = "5%";
    userclossclass.style.display = "none";
    usuarioinformclass.style.display = "none";
    nomee.style.display = "block";

}
window.onclick = function (event) {
    if (event.target == userclossclass) {
        document.getElementById("userside").style.height = "5%";
        userclossclass.style.display = "none";
        usuarioinformclass.style.display = "none";
        nomee.style.display = "block";

    }
}