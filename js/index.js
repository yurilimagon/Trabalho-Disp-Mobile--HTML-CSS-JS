$(document).ready(function(){
    init();
    let usuario = [];
    function init(){
        inicializarComponentes();
        telaInicial();
        logar();
        sair();
    }

    function inicializarComponentes(){
        $('.dropdown-toggle').dropdown();
        $('.collapse').collapse();
    }

    function telaInicial(){
        // $('#tela-login').hide();
        $('#tela-aluno').hide();
    }

    function sair(){
        $('#btn-sair').click(function(){
            $('#tela-aluno').hide();
            $('#tela-login').show();
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
                        swal("Erro!", "Login/Senha inválidos", "error");
                    }else{
                        $('#tela-login').hide();
                        $('#tela-aluno').show();
                        $('#cont-disciplinas').hide();
                        usuario = JSON.parse(resposta); 
                        let idAluno = usuario[0].idAluno;
                        let ra = usuario[0].ra;
                        let nome = usuario[0].nome;
                        let email = usuario[0].email;
                        $('#lb-nome').text(nome);
                        $('#lb-id').text(ra);
                        $('#lb-email').text(email);
                        exibeHome();
                    }
                    
                },
                error: function(erro){
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

    $('#btn-calendario').click(function(){
        $('.nav-link').removeClass('active');
        $('#btn-calendario').addClass('active');
        exibeCalendario(usuario[0].idAluno);
    });

    $('#btn-solicitacoes').click(function(){
        $('.nav-link').removeClass('active');
        $('#btn-solicitacoes').addClass('active');
        exibeSolicitacoes(usuario[0].idAluno);
    });

    $('#btn-fazer-solicitacao').click(function(){
        $('.nav-link').removeClass('active');
        $('#btn-fazer-solicitacao').addClass('active');
        solicitacao(usuario[0].idAluno);
    });

    $('#conteudo').on('click', '#btn-solicitar', function() {
        var solicitacao = $('#select option:selected').text();
        fazerSolicitacao(usuario[0].idAluno, solicitacao);
    });

    function exibeDisciplinas(idAluno){
        var conteudo;
        var dados = [];
        $.getJSON('http://www.felipemaciel.com.br/sys/fatec/appFatec/getDisciplinas.php?idAluno='+idAluno, function(data){
            $.each(data, function(chave, valor){

                dados += `<div class="card">
                            <div class="card-header bg-danger" id="${valor.idDisciplina}">
                            <h2 class="mb-0">
                                <a class="btn btn-link btn-block text-left" style="color: white;" data-toggle="collapse" 
                                        data-target="#collapse${valor.idDisciplina}" aria-expanded="true" aria-controls="${valor.idDisciplina}">
                                        <i class="material-icons" style="font-size: 1rem;">keyboard_arrow_right </i>${valor.disciplina}
                                </a>
                            </h2>
                            </div>
                        
                            <div id="collapse${valor.idDisciplina}" class="collapse hide" style="background-color: #cfcdcd;" aria-labelledby="${valor.idDisciplina}" 
                                 data-parent="#accordion">
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
                        <div class="container d-flex justify-content-center flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Disciplinas</h1>
                        </div >
                        <div class="accordion" id="accordion">
                            ${dados}
                        </div>`
            $('#conteudo').html(conteudo);
        });
    }

    function exibeHome(){
        conteudo = `<div class="justify-content-center pb-2 mb-3 border-bottom">
                        <h1 class="h2">Bem Vindo, ${usuario[0].nome}</h1>
                    </div >`
        $('#conteudo').html(conteudo);
    }

    function exibeCalendario(idAluno){
        var conteudo;
        var dados = [];
        $.getJSON('http://www.felipemaciel.com.br/sys/fatec/appFatec/getCalendario.php?idAluno='+idAluno, function(data){
            $.each(data, function(chave, valor){

                dados += `<div class="card">
                            <div class="card-header bg-danger" aria-expanded="true" id="${valor.idCalendario}">
                            <h2 class="mb-0">
                                <a class="btn btn-link btn-block text-left" style="color: white;" data-toggle="collapse" 
                                        data-target="#collapse${valor.idCalendario}" aria-expanded="true" aria-controls="${valor.idCalendario}">
                                        <i class="material-icons" style="font-size: 1rem;">keyboard_arrow_right </i>${valor.disciplina} --- Data entrega: ${valor.dataEntrega}
                                </a>
                            </h2>
                            </div>
                        
                            <div id="collapse${valor.idCalendario}" class="collapse hide" style="background-color: #cfcdcd;" aria-labelledby="${valor.idCalendario}" 
                                 data-parent="#accordion">
                                <div class="card-body text-left">
                                    <p class="mb-1">${valor.tipo}</p>
                                </div>
                            </div>
                        </div>`              
            });
            conteudo = `
                        <div class="container d-flex justify-content-center flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Calendário</h1>
                        </div >
                        <div class="accordion" id="accordion">
                            ${dados}
                        </div>`
            $('#conteudo').html(conteudo);    
        });
    }

    function exibeSolicitacoes(idAluno){
        var conteudo;
        var dados = [];
        $.getJSON('http://www.felipemaciel.com.br/sys/fatec/appFatec/getSolicitacao.php?idAluno='+idAluno, function(data){
            $.each(data, function(chave, valor){

                dados += `<div class="card">
                            <div class="card-header bg-danger" aria-expanded="true" id="${valor.idSolicitacao}">
                            <h2 class="mb-0">
                                <a class="btn btn-link btn-block text-left" style="color: white;" data-toggle="collapse" 
                                        data-target="#collapse${valor.idSolicitacao}" aria-expanded="true" aria-controls="${valor.idSolicitacao}">
                                        <i class="material-icons" style="font-size: 1rem;">keyboard_arrow_right </i>${valor.numeroProtocolo} - Situação: ${valor.situacao}
                                </a>
                            </h2>
                            </div>
                        
                            <div id="collapse${valor.idSolicitacao}" class="collapse hide" style="background-color: #cfcdcd;" aria-labelledby="${valor.idSolicitacao}" 
                                 data-parent="#accordion">
                                <div class="card-body text-left">
                                    <p>${valor.data}</p>
                                    <p>${valor.solicitacao}</p>
                                </div>
                            </div>
                        </div>`              
            });
            conteudo = `
                        <div class="container d-flex justify-content-center flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Solicitações</h1>
                        </div >
                        <div class="accordion" id="accordion">
                            ${dados}
                        </div>`
            $('#conteudo').html(conteudo);    
        });
    }

    function solicitacao(idAluno){
        var conteudo = `<div class="container d-flex justify-content-center flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Fazer Solicitação</h1>
                        </div >
                        <div class="form-group">
                            <label>Tipo de Solicitação</label>
                            <select class="form-control" id="select">
                                <option>Atestado de Matrícula</option>
                                <option>Histórico Escolar</option>
                                <option>Renovação da Carteirinha Escolar</option>
                                <option>Segunda Via da Carteirinha Escolar</option>
                                <option>Declaração de Transferência</option>
                                <option>Declaração de Conclusão</option>
                                <option>Outro</option>
                            </select>
                        </div>
                        <button id="btn-solicitar" type="button" class="btn btn-success">Enviar</button>`
        $('#conteudo').html(conteudo);
    }

    function fazerSolicitacao(idAluno, solicitacao){
        $.ajax({
            url: "http://www.felipemaciel.com.br/sys/fatec/appFatec/postSolicitacao.php",
            data: {
                idAluno: idAluno,
                solicitacao: solicitacao
            },
            success: function(resposta){
                swal(resposta, solicitacao, "success");
            }, 
            error: function(erro){
                console.log("Erro");
            }
        });
    }
});

