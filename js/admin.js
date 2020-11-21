$(document).ready(function(){
    init();
    // let usuario = [];
    function init(){
        inicializarComponentes();
        logar();
        sair();
    }

    function inicializarComponentes(){
        $('.dropdown-toggle').dropdown();
        $('.collapse').collapse();
    }

    function sair(){
        $('#btn-sair').click(function(){
            window.open("login2.html","_self");
        });
    }

    function logar(){
        
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
                        usuario = JSON.parse(resposta);
                        window.open("admin2.html","_self");                        
                        let nome = usuario[0].nome;
                        console.log(nome);
                        $('#lb-nomeadmin').text("nome");
                        // perfil();
                    }
                    
                },
                error: function(erro){
                    // M.toast({html: erro}); 
                    alert(erro);
                }
            });
        });
    }

    function perfil(){
        let nome = usuario[0].nome;
        console.log(nome);
        $('#lb-nome').text("nome");
    }
});