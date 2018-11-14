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

const tabela = document.getElementById('tableBody');

axios.get("http://jira.brq.com/rest/api/2/issue/" + chamadoId, config)
    .then(function (response) {
        let issues = response.data;
        console.log(issues);
    })
    .catch(function (error) {
        console.log(error);
    });

    axios.get("http://jira-homolog.brq.com/rest/api/2/issue/" + chamadoId, config)
    .then(function (response) {
        let chave = response.data.key;
        console.log(chave);

        

    })
    .catch(function (error) {
        console.log(error);
    });

    axios.get("http://jira-homolog.brq.com/rest/api/2/issue/" + chamadoId, config)
    .then(function (response) {
        let descricao = response.data.fields.description;
        console.log(descricao);
    })
    .catch(function (error) {
        console.log(error);
    });

    axios.get("http://jira-homolog.brq.com/rest/api/2/issue/" + chamadoId, config)
    .then(function (response) {
        let prioridade = response.data.fields.priority.name;
        console.log(prioridade);
    })
    .catch(function (error) {
        console.log(error);
    });