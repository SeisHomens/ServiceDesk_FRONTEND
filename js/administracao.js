var token = localStorage.getItem('token');

var config = {
    headers: {
        'Authorization': token
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

const btnLogin = document.querySelector("#btnA");

btnLogin.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('ei');

    var primario = document.getElementById('primario').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    const data =
    {
        "tipo": "COMUM",
        "nome": primario,
        "sobrenome": sobrenome,
        "email": email,
        "senha": senha
    }


    // console.log(JSON.stringify(data));

    axios.post("http://localhost:8080/service/usuario/novo", JSON.stringify(data), config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

});

function cadastrar(e) {
    e.preventDefault();
    console.log('ei')

}