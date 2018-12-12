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

axios.get("http://localhost:8080/service/rest/chamado/" + chamadoId, config)
    .then(function (response) {

        

        console.log(response.data); 

    })
    .catch(function (error) {
        console.log(error);
    });