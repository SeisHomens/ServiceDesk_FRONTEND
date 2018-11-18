// var textoElement = document.getElementById('elementKey').textContent;
// console.log(textoElement);

//---------------------------ANOTAÇÕES-------------------------------------------------------------

let issues;
let field;
let status;

var token = parseJwt(localStorage.getItem('token'));

let config = {
    headers: { 'Authorization': token.tokenBRQ }
};

let idUsuario = token.id;
let nomeUsuario = token.nome;
let emailUsuario = token.email;

console.log(nomeUsuario);
console.log(emailUsuario);
console.log(idUsuario);

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

            console.log(issue);

        });
    })
    .catch(function (error) {
        console.log(error.response);
    });
