var nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado');
var sobrenomeUsuarioLogado = localStorage.getItem('sobrenomeUsuarioLogado');
var emailUsuarioLogado = localStorage.getItem('emailUsuarioLogado');

//-----------------------------------------------------

const userside = document.getElementById('userside');

let nomeExibicaoSup = document.createElement('div');
nomeExibicaoSup.setAttribute('class', 'nomet');
nomeExibicaoSup.setAttribute('id', 'nome');
nomeExibicaoSup.textContent = nomeUsuarioLogado + ' ' + sobrenomeUsuarioLogado;
userside.appendChild(nomeExibicaoSup);

//-----------------------------------------------------

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


//--------------------------- CONFIG DE TOKEN ---------------------------------------------------------------------


var token = parseJwt(localStorage.getItem('token'));

let config = {
    headers: { 'Authorization': token.tokenBRQ }
};

let nomeUsuario = token.nome;
localStorage.setItem('nomeUsuarioLogado', nomeUsuario);

let sobrenomeUsuario = token.sobrenome;
localStorage.setItem('sobrenomeUsuarioLogado', sobrenomeUsuario);

let emailUsuario = token.email;
localStorage.setItem('emailUsuarioLogado', emailUsuario);

//--------------------------- FAZENDO GET DE tipos de pendencia -----------------------------------------------------------------

let issueTypeConfig = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

let issuestype;

const select = document.getElementById('tipoPendencia');

axios.get("https://jira.brq.com/rest/api/2/issuetype/", config)
    .then(function (response) {
        issuestype = response.data;
        issuestype.forEach(issuetypeDados => {

            let option = document.createElement('option');
            option.setAttribute('value', issuetypeDados.name);
            option.textContent = issuetypeDados.name;
            select.appendChild(option);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });

//--------------------------- CONFIG DE TOKEN ---------------------------------------------------------------------
var tokenLocal = parseJwt(localStorage.getItem('token'));

var configLocal = {
    headers: {
        'Authorization': tokenLocal
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

//--------------------------- CRIAR UMA NOVA PENDENCIA ---------------------------------------------------------------
const btnCadastrarpendencia = document.querySelector("#btnCriarPendencia");
btnCadastrarpendencia.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Oi');

    var resumo = document.getElementById('resumo').value;
    var descricao = document.getElementById('descricao').value;
    var tipoPendencia = document.getElementById('tipoPendencia').value;
    var tipoPendencia = document.getElementById('tipoPendencia');
    var tipoPendenciaSelecionado = tipoPendencia.options[tipoPendencia.selectedIndex].value;
    var contato = document.getElementById('contato').value;
    var dataCadastro = document.getElementById('dataCadastro').value;


    const data =
    {
        "usuario" : emailUsuarioLogado,
        "tipoPendencia" : tipoPendenciaSelecionado,
        "resumo" : resumo,
        "descricao" : descricao,
        "contato" : contato,
        "dataCadastro" : dataCadastro
    }

    axios.post("http://localhost:8085/service/rest/chamado/novo", JSON.stringify(data), configLocal)
        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });

});