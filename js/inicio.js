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


var token = parseJwt(localStorage.getItem('token'));

let config = {
    headers: { 'Authorization': token.tokenBRQ }
};

let nomeUsuario = token.nome;
localStorage.setItem('nomeUsuarioLogado', nomeUsuario);

let sobrenomeUsuario = token.sobrenome;
localStorage.setItem('sobrenomeUsuarioLogado', sobrenomeUsuario);

let emailUsuario = token.email;
localStorage.setItem('emailUsuarioLogado', emailUsuario);

//--------------------------- FAZENDO GET DE CHAMADOS -----------------------------------------------------------------

let issues;
let field;
let status;

const tabela = document.getElementById('tableBody');

axios.get("https://jira.brq.com/rest/api/2/search?jql=project='CDA'", config)
    .then(function (response) {
        issues = response.data.issues;
        issues.forEach(issue => {

            field = issue.fields;

                prior = field.priority;
                status = field.status;

            

            let tr = document.createElement('tr');
            tr.setAttribute('id', issue.key);

            let tdKey = document.createElement('td');
            let aKey = document.createElement('a');
            aKey.setAttribute('class', 'element');
            aKey.setAttribute('href', 'chamado.html?id=' + issue.key)

            let tdPrior = document.createElement('td');
            let aPrior = document.createElement('a');
            aPrior.setAttribute('class', 'element');
            aPrior.setAttribute('id', 'elementPrior');
            
            let tdStatus = document.createElement('td');
            let aStatus = document.createElement('a');
            aStatus.setAttribute('class', 'element');
            aStatus.setAttribute('id', 'elementStatus');

            aKey.textContent = issue.key;
            aPrior.textContent = prior.name;
            aStatus.textContent = status.name;

            tabela.appendChild(tr);

            tr.appendChild(tdKey);
            tdKey.appendChild(aKey);

            tr.appendChild(tdPrior);
            tdPrior.appendChild(aPrior);

            tr.appendChild(tdStatus);
            tdStatus.appendChild(aStatus);

            //console.log(issue);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });

//--------------------------- FAZENDO GET DE tipos de pendencia -----------------------------------------------------------------

let issueTypeConfig = {
    headers: { 'Accept': 'application/json', 
               'Content-Type' : 'application/json'}
};

let issuestype;

const select = document.getElementById('brow');

axios.get("https://jira.brq.com/rest/api/2/issuetype/", config)
    .then(function (response) {
        issuestype = response.data;
        issuestype.forEach(issuetypeDados => {

            let option = document.createElement('option');
            option.setAttribute('value', issuetypeDados.name);
            select.appendChild(option);

            console.log(issuetypeDados);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });