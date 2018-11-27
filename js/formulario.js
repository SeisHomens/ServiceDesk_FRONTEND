//--------------------------- CONFIG DE TOKEN ---------------------------------------------------------------------
var token = localStorage.getItem('token');

var config = {
    headers: {
        'Authorization': toen
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

//--------------------------- CRIAR UM NOVO USUARIO ---------------------------------------------------------------
const btnCadastrarPendencia = document.querySelector("#btnCadastrar");
btnCadastrarPendencia.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Oi');

    var resumo = document.getElementById('resumoCadastro').value;
    var descricao = document.getElementById('descricaoCadastro').value;
    var rotulos = document.getElementById('rotulosCadastro').value;
    var fabricante = document.getElementById('fabricanteCadastro').value;
    var fabricante = document.getElementById('fabricanteCadastro');
    var itemSelecionado = fabricante.options[fabricante.selectedIndex].value
    var modelo = document.getElementById('modeloCadastro').value;
    var garantia = document.getElementById('garantiaCadastro').value;

    const data = {
        "resumo": resumo,
        "descricao": descricao,
        "rotulos": rotulos,
        "fabricante": itemSelecionado,
        "modelo": modelo,
        "garantia": garantia
    }

    axios.post("localhost:8080/service/rest/chamado/novo", JSON.stringify(data), config)
        .then(function (response) {
            console.log(response);
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });

});