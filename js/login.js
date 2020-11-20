$(document).ready(function(){
    init();

    function init(){
        inicializarComponentes();
        sair();
        logar();
    }

    function inicializarComponentes(){
        
    }

    function sair(){
        $('#btn-sair').click(function(){
            window.open("login2.html","_self");
        });
    }

    function logar(){
        let usuario = null;
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
                        $('#toast-erro').toast('show');
                    }else{
                        
                        window.open("admin3.html","_self");
                        usuario = resposta;
                        
                    }
                    
                },
                error: function(erro){
                    // M.toast({html: erro}); 
                    alert(erro);
                }
            });
        });
    }

    
    
});