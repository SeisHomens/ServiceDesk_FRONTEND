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

var config = {
    headers: {
        'Authorization': 'Basic YWRtaW5TZW5haTphZG1pblNlbmFpQDEyMw=='
        , 'Content-Type': 'application/json'
        , 'X-Atlassian-Token': 'nocheck'
        , 'Access-Control-Allow-Origin': '*'
    }
};

function cadastrar() {

    var summary = document.getElementById('summary').value;
    var description = document.getElementById('description').value;

    const data = {
        "fields": {
            "project":
            {
                "key": "CDA"
            },
            "summary": summary,
            "description": description,
            "issueType": {
                "name": "Servidor"
            }
        }
    }

    // console.log(JSON.stringify(data));

    axios.post("http://jira-homolog.brq.com/rest/api/2/issue", JSON.stringify(data), config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}