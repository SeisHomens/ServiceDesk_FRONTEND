//--------------------------- COMPONENTE PARA IDENTIFICAR O USUARIO NA PARTE DE CIMA ------------------------------

var nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado');
var sobrenomeUsuarioLogado = localStorage.getItem('sobrenomeUsuarioLogado');
var emailUsuarioLogado = localStorage.getItem('emailUsuarioLogado');

//--------------------------- CONFIG DE TOKEN ---------------------------------------------------------------------
var token = parseJwt(localStorage.getItem('token'));

var config = {
    headers: {
        'Authorization': token
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

var configBRQ = {
    headers: {
        'Authorization': token.tokenBRQ
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

//--------------------------- CRIAR UM NOVO USUARIO ---------------------------------------------------------------
const btnCadastrarUsuario = document.querySelector("#btnA");
btnCadastrarUsuario.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Oi');


    var tipoProjeto = document.getElementById('tipoProjeto').value;
    var tipoProjeto = document.getElementById('tipoProjeto');
    var itemSelecionado1 = tipoProjeto.options[tipoProjeto.selectedIndex].value;
    var nome = document.getElementById('nomeCadastro').value;
    var sobrenome = document.getElementById('sobrenomeCadastro').value;
    var tipoHierarquico = document.getElementById('tipoHierarquico').value;
    var tipoHierarquico = document.getElementById('tipoHierarquico');
    var itemSelecionado2 = tipoHierarquico.options[tipoHierarquico.selectedIndex].value;
    var email = document.getElementById('emailCadastro').value;
    var senha = document.getElementById('senhaCadastro').value;

    const data =
    {
        "tipo": itemSelecionado2,
        "projetoVinculado": itemSelecionado1,
        "nome": nome,
        "sobrenome": sobrenome,
        "email": email,
        "senha": senha
    }

    axios.post("http://localhost:8085/service/rest/usuario/novo", JSON.stringify(data), config)
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

const usuarioGrid = document.getElementById('Usuario');

axios.get("http://localhost:8085/service/rest/usuarios", config)
    .then(function (response) {
        usuarios = response.data;
        usuarios.forEach(dadosDosUsuarios => {

            console.log(dadosDosUsuarios);

            let nomeLista = document.createElement('div');
            nomeLista.setAttribute('id', dadosDosUsuarios.id);
            usuarioGrid.appendChild(nomeLista);

            let nomeTitulo = document.createElement('p');
            nomeTitulo.setAttribute('class', 'tituloNegrito');
            nomeTitulo.textContent = 'Nome: ';
            nomeLista.appendChild(nomeTitulo);

            let nomeTexto = document.createElement('p');
            nomeTexto.textContent = ' ' + dadosDosUsuarios.nome + ' ' + dadosDosUsuarios.sobrenome;
            nomeLista.appendChild(nomeTexto);

            let emailTitulo = document.createElement('p');
            emailTitulo.setAttribute('class', 'tituloNegrito');
            emailTitulo.textContent = 'Email: ';
            nomeLista.appendChild(emailTitulo);

            let emailTexto = document.createElement('p');
            emailTexto.textContent = ' ' + dadosDosUsuarios.email;
            nomeLista.appendChild(emailTexto);

            let tipoTitulo = document.createElement('p');
            tipoTitulo.setAttribute('class', 'tituloNegrito');
            tipoTitulo.textContent = 'Tipo: ';
            nomeLista.appendChild(tipoTitulo);

            let tipoTexto = document.createElement('p');
            tipoTexto.textContent = ' ' + dadosDosUsuarios.tipo;
            nomeLista.appendChild(tipoTexto);

            let hr = document.createElement('hr');
            nomeLista.appendChild(hr);


        });
    })
    .catch(function (error) {
        console.log(error.response);
    });

let projects;

const select = document.getElementById('tipoProjeto');

axios.get("http://jira.brq.com/rest/api/2/project", configBRQ)
    .then(function (response) {
        projects = response.data;
        projects.forEach(projectDados => {

            let option = document.createElement('option');
            option.setAttribute('value', projectDados.key);
            option.textContent = projectDados.name;
            select.appendChild(option);

            console.log(projectDados);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });
