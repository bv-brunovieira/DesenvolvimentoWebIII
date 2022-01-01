//https://api.jquery.com/jquery.post/
//https://api.jquery.com/jquery.get/
//https://api.jquery.com/jquery.ajax/

/**
 * Requisições Post - Login
 */
 $(function () {
    $('#enviar').on('click', login);
    $('#sair').on('click', logout);
});

function login() {
    //Recuperar dados preenchidos no form
    let dados = {
        email: $('#email').val(),
        senha: $('#senha').val()
    }
    //Submissão
    $.post("/login", dados, function (data, status, req) {
        
        //Se necessário, tratar dados de retorno
        alert(JSON.stringify(data));

        //Pegar token do header vindo na resposta
        let token = req.getResponseHeader("Authorization");
        setCookie("token_ned",token,30);
        alert("Cookie criado");
        }).fail(function (req, mensagemStatus, mensagemErro) {
            alert(req.status);
            alert(mensagemStatus);
            alert(mensagemErro);

            //TRATAR ERRO...
        });

}

function logout(){
  document.cookie = "token_ned=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  alert("Vc saiu da pagina!");
}

//https://www.w3schools.com/js/js_cookies.asp
//https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Set-Cookie
function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    //path=/ é válido para toda as pastas e subpastas
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}