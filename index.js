function autenticar(){
    // passo 1 - recuperar os dados digitados no formulario
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;
    console.log("DEBUG = digitados: "+txtLogin +" / "+ txtSenha);
    
    // passo 2 - montar o objeto de requisicao para o back-end
    var msgBody = {
        email : txtLogin,
        racf  : txtLogin,
        senha : txtSenha
    };

    // passo 3 - montar o cabecalho da requisicao
    var cabecalho = {
        method : "POST",
        body   : JSON.stringify(msgBody),
        headers : {
            "content-type" : "application/json"
        }
    };

    // passo 4 - enviar a requisicao para o back-end
    fetch("http://localhost:8080/login", cabecalho).then(resposta => trataResposta(resposta));
}


function trataResposta(resposta){
    if (resposta.status == 200){
        resposta.json().then(user => efetivaLogin(user))
    }
    else if (resposta.status == 401){
        document.getElementById("msg").innerHTML = "Senha Invalida!";
    }
    else if (resposta.status == 404){
        document.getElementById("msg").innerHTML = "Usuario nao encontrado";
    }
    else{
        document.getElementById("msg").innerHTML = "Erro desconhecido";
    }
}

function efetivaLogin(user){
    // armazendo o objeto (em forma de STRING) no cache local do Browser
    localStorage.setItem("userSCHED", JSON.stringify(user));
    // redirecionar para a página de relatórios
    window.location = "relatorio.html";
}