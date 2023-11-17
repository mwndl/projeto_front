window.addEventListener('load', () => {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita a submissão padrão do formulário
        console.log("Formulário enviado");
        var email = document.getElementById('emailInput').value;
        var senha = document.getElementById('senhaInput').value;

        var objLoginSenha = {
            email: email,
            senha: senha
        };

        console.log("1: " + JSON.stringify(objLoginSenha));
        validarUsuario(objLoginSenha);
    });
});


function validarUsuario(objLoginSenha) {
    console.log("2: " + JSON.stringify(objLoginSenha));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/usuarios/validar', true); // true para requisição assíncrona
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var retorno = JSON.parse(xhr.responseText);
                console.log("Retorno: " + JSON.stringify(retorno));

                if (retorno) {
                    alert("Login bem-sucedido. Redirecionando para index.html");
                    console.log("Login bem-sucedido. Redirecionando para index.html");
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 100); // Aguarda 100 milissegundos antes de redirecionar
                } else {
                    alert("Login falhou. Trate conforme necessário.");
                    console.log("Login falhou. Trate conforme necessário.");
                }
            } else {
                console.error("Erro na requisição. Código do status: " + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(objLoginSenha));
}

