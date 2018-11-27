//--------------------------- COMPONENTE PARA IDENTIFICAR O USUARIO NA PARTE DE CIMA ------------------------------

var nomeUsuarioLogado = localStorage.getItem('nomeUsuarioLogado');
var sobrenomeUsuarioLogado = localStorage.getItem('sobrenomeUsuarioLogado');
var emailUsuarioLogado = localStorage.getItem('emailUsuarioLogado');

//-----------------------------------------------------

const userside = document.getElementById('userside');

let nomeExibicaoSup = document.createElement('div');
nomeExibicaoSup.setAttribute('class', 'nomet');
nomeExibicaoSup.setAttribute('id', 'nome');
nomeExibicaoSup.textContent =  nomeUsuarioLogado + ' ' + sobrenomeUsuarioLogado;
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


//--------------------------- CONFIG DE TOKEN ---------------------------------------------------------------------
var token = localStorage.getItem('token');

var config = {
    headers: {
        'Authorization': token
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

//--------------------------- CRIAR UM NOVO USUARIO ---------------------------------------------------------------
const btnCadastrarUsuario = document.querySelector("#btnA");
btnCadastrarUsuario.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Oi');

    var nome = document.getElementById('nomeCadastro').value;
    var sobrenome = document.getElementById('sobrenomeCadastro').value;
    var tipo = document.getElementById('tipoCadastro').value;
    var tipo = document.getElementById('tipoCadastro');
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

const usuarioGrid = document.getElementById('Usuario');

axios.get("http://localhost:8080/service/rest/usuarios", config)
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

