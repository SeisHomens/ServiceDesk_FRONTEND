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

var tokenLocal = localStorage.getItem('token')
var token = parseJwt(localStorage.getItem('token'));

let config = {
    headers: { 'Authorization': token.tokenBRQ }
};

var configLocal = {
    headers: {
        'Authorization': tokenLocal
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

let nomeUsuario = token.nome;
localStorage.setItem('nomeUsuarioLogado', nomeUsuario);

let sobrenomeUsuario = token.sobrenome;
localStorage.setItem('sobrenomeUsuarioLogado', sobrenomeUsuario);

let emailUsuario = token.email;
localStorage.setItem('emailUsuarioLogado', emailUsuario);

let tipoUsuario = token.tipo;
localStorage.setItem('tipoUsuarioLogado', tipoUsuario);

//--------------------------- FAZENDO GET DE CHAMADOS -----------------------------------------------------------------

let chamados;
let resumoChamado;
let situacaoChamado;
let dataCadastroChamado

const tabela = document.getElementById('tabelaChamados');

axios.get("http://localhost:8080/service/rest/chamados", configLocal)
    .then(function (response) {
        chamados = response.data;
        chamados.forEach(chamado => {

            resumoChamado = chamado.resumo;
            situacaoChamado = 'Aberto';
            dataCadastroChamado = chamado.dataCadastro;

            let tr = document.createElement('tr');
            tabela.appendChild(tr);

            //------------- Resumo --------------------------

            let tdResumo = document.createElement('td');
            tr.appendChild(tdResumo);

            let aResumo = document.createElement('a');
            aResumo.setAttribute('href', 'chamado.html?id=' + chamado.id);
            aResumo.textContent = resumoChamado;
            tdResumo.appendChild(aResumo);

            //------------- Situacao --------------------------

            let tdSituacao = document.createElement('td');
            tr.appendChild(tdSituacao);

            let aSituacao = document.createElement('a');
            aSituacao.setAttribute('href', 'chamado.html?id=' + chamado.id);
            aSituacao.textContent = situacaoChamado;
            tdSituacao.appendChild(aSituacao);

            //------------- Situacao --------------------------

            let tdDataCadastro = document.createElement('td');
            tr.appendChild(tdDataCadastro);

            let aDataCadastro = document.createElement('a');
            aDataCadastro.setAttribute('href', 'chamado.html?id=' + chamado.id);
            aDataCadastro.textContent = dataCadastroChamado;
            tdDataCadastro.appendChild(aDataCadastro);



            console.log(chamado);
        });

        console.log(configLocal)
    })
    .catch(function (error) {
        console.log(error.response);
    });

//--------------------------- FAZENDO GET DE tipos de pendencia -----------------------------------------------------------------



let issuestype;

const select = document.getElementById('brow');

axios.get("https://jira.brq.com/rest/api/2/issuetype/", config)
    .then(function (response) {
        issuestype = response.data;
        issuestype.forEach(issuetypeDados => {

            let option = document.createElement('option');
            option.setAttribute('value', issuetypeDados.name);
            select.appendChild(option);

            //console.log(token);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });

    /*
    
    axios.get("https://jira.brq.com/rest/api/2/search?jql=project='SERVICE DESK TEST'", config)
    .then(function (response) {
        issues = response.data.issues;
        issues.forEach(issue => {

            field = issue.fields;

            prior = field.priority;
            status = field.status;



            let tr = document.createElement('tr');
            tr.setAttribute('id', issue.key);

            let tdKey = document.createElement('td');
            let aKey = document.createElement('a');
            aKey.setAttribute('class', 'element');
            aKey.setAttribute('href', 'chamado.html?id=' + issue.key)

            let tdPrior = document.createElement('td');
            let aPrior = document.createElement('a');
            aPrior.setAttribute('class', 'element');
            aPrior.setAttribute('id', 'elementPrior');

            let tdStatus = document.createElement('td');
            let aStatus = document.createElement('a');
            aStatus.setAttribute('class', 'element');
            aStatus.setAttribute('id', 'elementStatus');

            aKey.textContent = issue.key;
            aPrior.textContent = prior.name;
            aStatus.textContent = status.name;

            tabela.appendChild(tr);

            tr.appendChild(tdKey);
            tdKey.appendChild(aKey);

            tr.appendChild(tdPrior);
            tdPrior.appendChild(aPrior);

            tr.appendChild(tdStatus);
            tdStatus.appendChild(aStatus);

            console.log(response);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });

    */