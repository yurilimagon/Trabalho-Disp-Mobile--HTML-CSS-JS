$(document).ready(function(){
    init();
    let usuario = [];
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
            $('#tela-aluno').hide();
            $('#tela-login').show();
        });
    }

    function logar(){
        $('#tela-aluno').hide();
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
                        $('#tela-login').hide();
                        $('#tela-aluno').show();
                        $('#cont-disciplinas').hide();
                        usuario = JSON.parse(resposta);
                        // window.open("admin2.html","_self");   
                        let idAluno = usuario[0].idAluno;
                        let ra = usuario[0].ra;
                        let nome = usuario[0].nome;
                        let email = usuario[0].email;
                        console.log(nome);
                        $('#lb-nome').text(nome);
                        $('#lb-id').text(ra);
                        $('#lb-email').text(email);
                        exibeHome();
                    }
                    
                },
                error: function(erro){
                    // M.toast({html: erro}); 
                    alert(erro);
                }
            });
        });
    }

    $('#btn-disciplinas').click(function(){
        $('.nav-link').removeClass('active');
        $('#btn-disciplinas').addClass('active');
        exibeDisciplinas(usuario[0].idAluno);
    });

    $('#btn-home').click(function(){
        $('.nav-link').removeClass('active');
        $('#btn-home').addClass('active');
        exibeHome();
    });

    function exibeDisciplinas(idAluno){
        var conteudo;
        var dados = [];
        $.getJSON('http://www.felipemaciel.com.br/sys/fatec/appFatec/getDisciplinas.php?idAluno='+idAluno, function(data){
            $.each(data, function(chave, valor){

                dados += `<div class="card">
                            <div class="card-header" id="${valor.idDisciplina}">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" 
                                        data-target="#collapse${valor.idDisciplina}" aria-expanded="true" aria-controls="${valor.idDisciplina}">
                                ${valor.disciplina}
                                </button>
                            </h2>
                            </div>
                        
                            <div id="collapse${valor.idDisciplina}" class="collapse hide" aria-labelledby="${valor.idDisciplina}" 
                                 data-parent="#accordionExample">
                                <div class="card-body text-left">
                                    <p>Presença: ${valor.presenca} </p>
                                    <p>Faltas: ${valor.falta}</p>
                                    <p>NotaP1: ${valor.notaP1}</p>
                                    <p>NotaP2: ${valor.notaP2}</p>
                                    <p>NotaT1: ${valor.notaT1}</p>
                                    <p>NotaT2: ${valor.notaT2}</p>
                                </div>
                            </div>
                        </div>`
                
            });
            conteudo = `
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Disciplinas</h1>
                        </div >
                        <div class="accordion" id="accordionExample">${dados}</div>`
            $('#conteudo').html(conteudo);
        });
    }

    function exibeHome(){
        conteudo = `<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 class="h2">Bem Vindo, Aluno!</h1>
                    </div >`
        $('#conteudo').html(conteudo);
    }
    
});