var nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado');
var sobrenomeUsuarioLogado = localStorage.getItem('sobrenomeUsuarioLogado');
var emailUsuarioLogado = localStorage.getItem('emailUsuarioLogado');
var projetoVinculadoUsuarioLogado = localStorage.getItem('projetoVinculadoUsuarioLogado');

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

let issues;

const select = document.getElementById('tipoPendencia');

axios.get("https://jira.brq.com/rest/api/2/project/" + projetoVinculadoUsuarioLogado + "?", config)
    .then(function (response) {
        issues = response.data.issueTypes;
        issues.forEach(issueType => {

            let option = document.createElement('option');
            option.setAttribute('value', issueType.name);
            option.textContent = issueType.name;
            select.appendChild(option);

            console.log(issueType.name);


        });
        console.log(response.data.issueTypes);
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
        "usuario": emailUsuarioLogado,
        "tipoPendencia": tipoPendenciaSelecionado,
        "resumo": resumo,
        "descricao": descricao,
        "contato": contato,
        "dataCadastro": dataCadastro
    }

    axios.post("http://localhost:8085/service/rest/chamado/novo", JSON.stringify(data), configLocal)
        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });

});