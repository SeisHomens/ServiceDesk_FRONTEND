var token = localStorage.getItem('token');

var config = {
    headers: {
        'Authorization': token
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

//--------------------------- CRIAR UM NOVO USUARIO ---------------------------------------------------------------
const btnLogin = document.querySelector("#btnA");
btnLogin.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Oi');

    var nome = document.getElementById('nomeCadastro').value;
    var sobrenome = document.getElementById('sobrenomeCadastro').value;
    var tipo = document.getElementById('tipoCadastro').value;
    var tipo = document.getElementById("tipoCadastro");
        var itemSelecionado = tipo.options[tipo.selectedIndex].value;
    var email = document.getElementById('emailCadastro').value;
    var senha = document.getElementById('senhaCadastro').value;

    const data =
    {
        "tipo": itemSelecionado,
        "nome": nome,
        "sobrenome": sobrenome,
        "email": email,
        "senha": senha
    }

    axios.post("http://localhost:8080/service/usuario/novo", JSON.stringify(data), config)
        .then(function (response) {
            console.log(response);
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });

});

//--------------------------- VISUALIZAR USUARIOS ------------------------------------------------------------------

let usuarios;

axios.get("http://localhost:8080/service/rest/usuarios", config)
    .then(function (response) {
        usuarios = response.data;
        usuarios.forEach(dadosDosUsuarios => {

            console.log(dadosDosUsuarios);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });