$(document).ready(function(){

    $('#btn-entrar').click(function(){
        let ra = $('#inputUsuario').val();
        let senha = $('#inputSenha').val();
        $.ajax({
            url: "http://www.felipemaciel.com.br/sys/fatec/appFatec/logar.php",
            data: {
                ra: ra,
                senha: senha
            },
            success: function(resposta){
                if(resposta == "Erro!"){
                    // $('#toast-erro').toast('show');
                    console.log(resposta);
                }else{
                    
                    // window.open("admin2.html","_self");
                    // $('#toast-success').toast('show');
                    console.log(resposta);
                    // idUsuario = resposta;
                    // $('#login').animate({
                    //     left: "-100%"
                    // });
                    
                    // $('#inicial').show().animate({
                    //     left: "0px" 
                    // }, function(){
                    //     carregarLista(idUsuario);
                    // });
                    
                }
                
            },
            error: function(erro){
                // M.toast({html: erro}); 
                alert(erro);
            }
        });
    });
    
});