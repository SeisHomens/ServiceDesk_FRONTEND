var nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado');
var sobrenomeUsuarioLogado = localStorage.getItem('sobrenomeUsuarioLogado');
var emailUsuarioLogado = localStorage.getItem('emailUsuarioLogado');
var tipoUsuarioLogado = localStorage.getItem('tipoUsuarioLogado');
var projetoVinculadoUsuarioLogado = localStorage.getItem('projetoVinculadoUsuarioLogado');

//--------------------------- CONFIG DE TOKEN ---------------------------------------------------------------------


var token = parseJwt(localStorage.getItem('token'));

let config = {
    headers: { 'Authorization': token.tokenBRQ }
};

var configLocal = {
    headers: {
        'Authorization': token
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};



//--------------------------- FAZENDO GET DE CHAMADOS -----------------------------------------------------------------

let chamados;
let resumoChamado;
let situacaoChamado;
let dataCadastroChamado

const tabela = document.getElementById('tabelaChamados');

axios.get("http://localhost:8085/service/rest/chamados", configLocal)
    .then(function (response) {
        chamados = response.data;
        chamados.forEach(chamado => {

            resumoChamado = chamado.resumo;
            situacaoChamado = 'Aberto';
            dataCadastroChamado = chamado.dataCadastro;

            if(chamado.usuario == emailUsuarioLogado){

            let tr = document.createElement('tr');
            tabela.appendChild(tr);

            //------------- Resumo --------------------------

            let tdResumo = document.createElement('td');
            tr.appendChild(tdResumo);

            let aResumo = document.createElement('a');
            aResumo.setAttribute('href', 'inicio.html?id=' + chamado.id);
            aResumo.textContent = resumoChamado;
            tdResumo.appendChild(aResumo);

            //------------- Situacao --------------------------

            let tdSituacao = document.createElement('td');
            tr.appendChild(tdSituacao);

            let aSituacao = document.createElement('a');
            aSituacao.setAttribute('href', 'inicio.html?id=' + chamado.id);
            aSituacao.textContent = situacaoChamado;
            tdSituacao.appendChild(aSituacao);



            //------------- Situacao --------------------------

            let tdDataCadastro = document.createElement('td');
            tr.appendChild(tdDataCadastro);

            let aDataCadastro = document.createElement('a');
            aDataCadastro.setAttribute('href', 'inicio.html?id=' + chamado.id);
            aDataCadastro.textContent = dataCadastroChamado;
            tdDataCadastro.appendChild(aDataCadastro);

        }else{
            return null;
        }

            console.log(chamado);
            
        });
    })
    .catch(function (error) {
        console.log(error.response);
    });

//-------------------------- Puxando chamado especifico ------------------------


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

window.onload = function () {
    var mytext = getUrlParam('id', 'Empty');
    localStorage.setItem('idChamado', mytext);

    let nomeUsuario = token.nome;
    localStorage.setItem('nomeUsuarioLogado', nomeUsuario);

    let sobrenomeUsuario = token.sobrenome;
    localStorage.setItem('sobrenomeUsuarioLogado', sobrenomeUsuario);

    let emailUsuario = token.email;
    localStorage.setItem('emailUsuarioLogado', emailUsuario);

    let tipoUsuario = token.tipo;
    localStorage.setItem('tipoUsuarioLogado', tipoUsuario);

    let projetoVinculadoUsuario = token.projetoVinculado;
    localStorage.setItem('projetoVinculadoUsuarioLogado', projetoVinculadoUsuario);
}

var chamadoId = localStorage.getItem('idChamado');

const iResumo = document.getElementById('iResumo');
const iTipo = document.getElementById('iTipo');
const iContato = document.getElementById('iContato');
const iDataCadastro = document.getElementById('iDataCadastro');
const iCriador = document.getElementById('iCriador');
const iDescricao = document.getElementById('iDescricao');

axios.get("http://localhost:8085/service/rest/chamado/" + chamadoId, configLocal)
    .then(function (response) {

        var chamado = response.data;

        let pResumo = document.createElement('p');
        pResumo.textContent = chamado.resumo;
        iResumo.appendChild(pResumo);

        let pTipo = document.createElement('p');
        pTipo.textContent = chamado.tipoPendencia;
        iTipo.appendChild(pTipo);

        let pContato = document.createElement('p');
        pContato.textContent = chamado.contato;
        iContato.appendChild(pContato);

        let pDataCadastro = document.createElement('p');
        pDataCadastro.textContent = chamado.dataCadastro;
        iDataCadastro.appendChild(pDataCadastro);

        let pCriador = document.createElement('p');
        pCriador.textContent = chamado.usuario;
        iCriador.appendChild(pCriador);

        let pDescricao = document.createElement('p');
        pDescricao.textContent = chamado.descricao;
        iDescricao.appendChild(pDescricao);

    })
    .catch(function (error) {
        console.log(error.response);
    });


let issues;

const select = document.getElementById('brow');

axios.get("https://jira.brq.com/rest/api/2/project/" + projetoVinculadoUsuarioLogado +"?", config)
    .then(function (response) {
        issues = response.data.issueTypes;
        issues.forEach(issueType => {

            let option = document.createElement('option');
            option.setAttribute('value', issueType.name);
            select.appendChild(option);

            console.log(issueType.name);
            

        });
        console.log(response.data.issueTypes);
    })
    .catch(function (error) {
        console.log(error.response);
    });

