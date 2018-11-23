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
    console.log(mytext);
    localStorage.setItem('idChamado', mytext);
}

var chamadoId = localStorage.getItem('idChamado');
var token = parseJwt(localStorage.getItem('token'));

let config = {
    headers: { 'Authorization': token.tokenBRQ }
};

const elementoPai = document.getElementById('componentesChamado');

axios.get("http://jira.brq.com/rest/api/2/issue/" + chamadoId, config)
    .then(function (response) {
        let issues = response.data;
        let chave = response.data.key;
        let prioridade = response.data.fields.priority.name;
        let descricao = response.data.fields.description;
        let resumo = response.data.fields.summary;
        let situacao = response.data.fields.status.name;
        let tipo = response.data.fields.issuetype.name;
        console.log(issues);
        console.log(chave);
        console.log(resumo);
        console.log(prioridade);
        console.log(descricao);
        console.log(tipo);
        console.log(situacao);

        //---------------- CHAVE ----------------------------

        let divChave = document.createElement('div');
        divChave.setAttribute('id', 'divChave');
        divChave.setAttribute('class', 'elementDiv');
        elementoPai.appendChild(divChave);

        let tituloChave = document.createElement('p');
        tituloChave.setAttribute('id', 'tituloChave');
        tituloChave.setAttribute('class', 'elementsTitulo');
        tituloChave.textContent = 'Chave: ';
        divChave.appendChild(tituloChave);

        let elementoChave = document.createElement('p');
        elementoChave.setAttribute('id', 'elementoChave');
        elementoChave.setAttribute('class', 'elements');
        elementoChave.textContent = chave;
        divChave.appendChild(elementoChave);

        //---------------- TIPO ----------------------------

        let divTipo = document.createElement('div');
        divTipo.setAttribute('id', 'divTipo');
        divTipo.setAttribute('class', 'elements');
        elementoPai.appendChild(divTipo);

        let tituloTipo = document.createElement('p');
        tituloTipo.setAttribute('id', 'tituloTipo');
        tituloTipo.setAttribute('class', 'elementsTitulo');
        tituloTipo.textContent = 'Tipo: ';
        divChave.appendChild(tituloTipo);

        let elementoTipo = document.createElement('p');
        elementoTipo.setAttribute('id', 'elementoTipo');
        elementoTipo.setAttribute('class', 'elements');
        elementoTipo.textContent = tipo;
        divChave.appendChild(elementoTipo);

        //---------------- RESUMO ----------------------------

        let divResumo = document.createElement('div');
        divResumo.setAttribute('id', 'divResumo');
        divResumo.setAttribute('class', 'elements');
        elementoPai.appendChild(divResumo);

        let tituloResumo = document.createElement('p');
        tituloResumo.setAttribute('id', 'tituloResumo');
        tituloResumo.setAttribute('class', 'elementsTitulo');
        tituloResumo.textContent = 'Resumo: ';
        divChave.appendChild(tituloResumo);

        let elementoResumo = document.createElement('p');
        elementoResumo.setAttribute('id', 'elementoResumo');
        elementoResumo.setAttribute('class', 'elements');
        elementoResumo.textContent = resumo;
        divChave.appendChild(elementoResumo);

        //---------------- SITUACAO ----------------------------

        let divSituacao = document.createElement('div');
        divSituacao.setAttribute('id', 'divSituacao');
        divSituacao.setAttribute('class', 'elements');
        elementoPai.appendChild(divSituacao);

        let tituloSituacao = document.createElement('p');
        tituloSituacao.setAttribute('id', 'tituloSituacao');
        tituloSituacao.setAttribute('class', 'elementsTitulo');
        tituloSituacao.textContent = 'Situação: ';
        divChave.appendChild(tituloSituacao);

        let elementoSituacao = document.createElement('p');
        elementoSituacao.setAttribute('id', 'elementoSituacao');
        elementoSituacao.setAttribute('class', 'elements');
        elementoSituacao.textContent = situacao;
        divChave.appendChild(elementoSituacao);

        //---------------- PRIORIDADE ----------------------------

        let divPrioridade = document.createElement('div');
        divPrioridade.setAttribute('id', 'divPrioridade');
        divPrioridade.setAttribute('class', 'elements');
        elementoPai.appendChild(divPrioridade);

        let tituloPrioridade = document.createElement('p');
        tituloPrioridade.setAttribute('id', 'tituloPrioridade');
        tituloPrioridade.setAttribute('class', 'elementsTitulo');
        tituloPrioridade.textContent = 'Prioridade: ';
        divChave.appendChild(tituloPrioridade);

        let elementoPrioridade = document.createElement('p');
        elementoPrioridade.setAttribute('id', 'elementoPrioridade');
        elementoPrioridade.setAttribute('class', 'elements');
        elementoPrioridade.textContent = prioridade;
        divChave.appendChild(elementoPrioridade);

        //---------------- DESCRIÇÂO ----------------------------

        let divDescricao = document.createElement('div');
        divDescricao.setAttribute('id', 'divDescricao');
        divDescricao.setAttribute('class', 'elements');
        elementoPai.appendChild(divDescricao);

        let tituloDescicao = document.createElement('p');
        tituloDescicao.setAttribute('id', 'tituloDescricao');
        tituloDescicao.setAttribute('class', 'elementsTitulo');
        tituloDescicao.textContent = 'Descrição: ';
        divChave.appendChild(tituloDescicao);

        let elementoDescricao = document.createElement('p');
        elementoDescricao.setAttribute('id', 'elementoDescricao');
        elementoDescricao.setAttribute('class', 'elements');
        elementoDescricao.textContent = descricao;
        divChave.appendChild(elementoDescricao);

         
    })
    .catch(function (error) {
        console.log(error);
    });