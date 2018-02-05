# Lista de produtos

Implementação front end utilizando html, css e os frameworks angularjs e bootstrap. Nesta pequena aplicação é feita uma requisição ao servidor da baixou.com.br, passando um email autorizado,  com o intuito de obter via rest um token de autenticação. Se tudo der certo o token será armazenado no localstorage do navegador. Este token será utilizado posteriormente para fazer requisições que irão retornar uma lista com alguns produtos que são listados conforme imagem. 

![Produtos](https://github.com/CARLOSEDUARDOVIEIRA/listaprodutos/img/blob/master/header.png)

## Pontos interessantes

### $http angularjs

Utilização do serviço $http.

```js
function setToken() {
    var email = new FormData();
    email.append("email", 'dullvieira@gmail.com');
    $http({
        method: 'POST',
        url: 'http://testedev.baixou.com.br/processo/auth',
        data: email,
        headers: { 'Content-Type': undefined }
    }).then(function (r) {
        if (r.data.token) {
            minhaToken = $window.localStorage.setItem('token', r.data.token);
        }
        }, function (r) {
            console.log(r);
        });
};

function getProdutos(token) {
    return $http.get('http://testedev.baixou.com.br/processo/lista?token=' + token)
        .then(function (r) {
            return r.data.ofertas;
        }, function (r) {
            console.log(r);
        });            
};
```
### local storage
Armazenamento de token em localstorage dos navegadores atualizados.
```js
    minhaToken = $window.localStorage.setItem('token', r.data.token);
```