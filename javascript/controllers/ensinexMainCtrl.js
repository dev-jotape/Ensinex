angular.module("ensinex").controller("ensinexMainCtrl", ["$scope", "funcaoZAPI", "acessoLiberadoAPI", "$state", function($scope, funcaoZAPI, acessoLiberadoAPI, $state) {
	console.log("ensinexMainCtrl");

  /*
    entrada de ados se resume em funcao Z onde sera aquela dada pelo usuario para maximizar ou minimizar depois vem as restricoes
    onde o usuario pode escolher quantas restricoes ira ter o simplex para sua solucao exemplo:

    10X1 + 12X2  ---> esse é o Z

    restricoes

    X1 + 4X2 < 10000   --> 1º restricao
    5X1 + 2X2 < 30000  --> 2º restricao

    sempre vai ter essa resticao de 
    X1,X2 >= 0   

    todas as entradas sera como escrita informal onde usuario escreve livremente as variaveis e restricoes 

    usando string para armazena-las, a validacao fica por conta de expressoes regulares muito simples onde pode ter:

        º numero sem espaco seguido de letra "X" seguido sem espaco numero seguido pode ter ou nao operador " + ou - " repete 

    passando por essa verificacao iremos retirar os numero antes dos X

    e passar para uma matriz que sera a Tabela do simplex
  */

  //==================================variaveis==========================================================

  //operacao objetivo da funcao se maximizar ou minimizar usa value para saber qual dos index do array escolher
  $scope.objOperacao  = [
    {name:"Maximizar", value:0},
    {name:"Minimizar", value:1}
  ];
  //atribuindo a escolha variavel responsavel pela escolha do operacao objectivo da funcao
  $scope.escolhaObjOperacao = $scope.objOperacao[0];

  //variavel tabela onde contera os objetos que contem o valor e o xis
  //tamanho desse array quer dizer quantas variaveis de decisao tem a funcao
  $scope.tabela = [];

  //variavel para adicionar restricoes é vetor de string
  $scope.restricoes = [];

  //variavel para armazenar as restricoes em forma de objeto com valor e xis e o b
  $scope.tabelaRestricoes = [];

  //============================= fim das vriaveis ====================================================

  //==================== funcoes estaticas ======================================================
  //funcao que recebe uma expresao do tipo 5x1 onde tem numero seguido de x seguido do index do x que é outro numero
  //retorna o valor numerico e o x como string
  function expValor(exp) {

    //variavel para armazer valor antes do x e o x e seu index
    var objValor = {
      valor: 1.0,
      xis: ""
    }

    //pode ter tres casos 
    //1º tiver apenas x sem valor 
    //2º tiver valor seguido de x
    //3º tiver valor seguido de virgula seguido de valor seguido de x

    var _auxDoX = exp.search(/x/i);
    var _auxValor = exp.substring(0, _auxDoX);

    //verifico se é apenas negativo ou se é x sozinho positivo se nao for nada disso convert normal
    if(_auxValor == "-"){
      //quando o x é -x1
      objValor.valor = -1;
    }else{
      if(_auxDoX == 0){
        //quando o x é x
        objValor.valor = 1;
      }else{
        //converto valor string 1,2 em 1.2 para converter para float para fazer os calculos
        objValor.valor = parseFloat(_auxValor.replace(",", "."));
      }
    }
    //adiciono os xis no objeto
    objValor.xis = exp.substring(_auxDoX);

    return objValor;
  };// fim expValor

  //funcao que verifica se todas as expressoes estao corretas retorna -1 se estiver tudo certo ou numero da funcao que esta errada
  //retorna -2 se nao tiver nem uma restricao 
  function expCorrect() {
    var _auxFunc = funcaoZAPI.getTodoEstado(); // array de todas as expresoes em ordem numerica 
    //posicao 0 é da funcao z entao é a unica que estado final é 5 apenas 5
    if(_auxFunc[0] == 5){
      if(_auxFunc.length > 1){
        for(var i=1; i < _auxFunc.length; i++){
          if(_auxFunc[i] != 7 && _auxFunc[i] != 9){
            return i;
          }
        }
        return -1;
      }else{
        return -2;
      }
    }else{
      return 0;
    }
  };//fim expCorrect
  //=============================== fim das funcoes estaticas =============================================

  //======== funcoes do scope =======================================================================

  //gerarTabela passa para proxima etapa reunindo as informacoes da string e convertendo para tebela 
  $scope.gerarTabela = function(obj, fun, restri) {
    //aqui estou zerando as variaveis
    $scope.tabela = [];
    $scope.tabelaRestricoes = [];

    //aqui verifico se esta tudo certo
    //se nao causa msg de erro no else
    var _correct = expCorrect();
    //verifica se todas as expressoes estao corretas tudo estiver correto tem que ser -1
    if(_correct == -1){
      //se estiver tudo certo e acessar essas parte unica forma de não passar para proxima pagina é causando erro então
      //uma vez estando tudo certo então zera todo os estado para se voltar essa pagina sistema calcular novamente os valores
      funcaoZAPI.removeTodoEstado();

      //aqui sao variaveis auxiliares uma para restricao outra para gravar o B das restricoes
      var _auxR;
      var _auxB;

      //nesse for percorro as casas do meu array de restricoes em outras palavras
      //vou em cada restricao existente 1,2,3... restricoes e optenho sua expressao
      for(var i=0; i < restri.length; i++){
        //inizializa variavel vazia
        _auxB = {
          operador: "",
          valorB : 1.0
        };

        //insiro uma nova array de objtos de restricao que guardara valor e xis ultima casa é operador e valorB
        $scope.tabelaRestricoes.push([]);

        //reparto todo string em um array dos elemento exemplo 12x2 isso é um elemento ultimo elemento é sempre 
        //>12 ou <34 ou =65  ou tudos numeros com virgulas
        _auxR = restri[i].match(/-?[0-9]+x[0-9]+|-?x[0-9]+|-?[0-9]+,[0-9]+x[0-9]+|\>[0-9]+,[0-9]+|\<[0-9]+,[0-9]+|=[0-9]+,[0-9]+|\>[0-9]+|\<[0-9]+|=[0-9]+/gi)
        
        //esse for é para cada restricao
        for(var j=0; j < _auxR.length -1; j++){
          //adiciono restricao como objeto com valor e xis
          $scope.tabelaRestricoes[i].push( expValor(_auxR[j]) );
        }

        //ultimo valor é sempre os operadores > < = seguidos de numeros
        _auxB.operador = _auxR[_auxR.length-1][0];

        //aqui trasformo o valor que vem de string em float para calculos
        _auxB.valorB = parseFloat(_auxR[_auxR.length-1].substring(1).replace(",", "."));

        //adiciono na ultima posicao das restricoes
        $scope.tabelaRestricoes[i].push(_auxB);
      }
      console.log($scope.tabelaRestricoes)
//=================== ate aqui é parte das restricoes daki para baixo é da funcao Z====================================
      //reparte a string da funcao em um array dos elemento exemplo 12x2 isso é um elemento
      var _auxF = fun.match(/-?[0-9]+x[0-9]+|-?x[0-9]+|-?[0-9]+,[0-9]+x[0-9]+/gi);

      //esse for é para o array dos elemento de cima
      for(var i=0; i < _auxF.length; i++){
        //adiciona na variavel um objeto contendo valor e o xis de cada elemento
        $scope.tabela.push( expValor(_auxF[i]) );
      }
      console.log($scope.tabela);

      //libera acesso para poder ir para proxima pagiga
      acessoLiberadoAPI.setLiberado();

      //isso faz acionar carregamento da proxima pagina que é passoapasso
      $state.go("passoapasso",{operacao: $scope.escolhaObjOperacao.value, funcaoZ: $scope.tabela, restricoes: $scope.tabelaRestricoes});

//=========================================================================
    }else{
      //caso nao esteja coreto as expresoes 
      if(_correct == 0){
        console.log("A funcao Z esta Errada !!");
        acessoLiberadoAPI.blockLiberado();
      }else{
        if(_correct == -2){
          console.log("Não Existe Restrições !!");
          acessoLiberadoAPI.blockLiberado();
        }else{
          console.log("A Restrição "+_correct+" Esta Errada !!");
          acessoLiberadoAPI.blockLiberado();
        }
      }
    }
  };// fim gerarTabela

// ir para tela calcula max
$scope.calculaMax = function(){

acessoLiberadoAPI.setLiberado();

      //isso faz acionar carregamento da proxima pagina que é passoapasso
      $state.go("calculamax");


};
  
  //adiciona e remove as regras
  $scope.adicionarRegra = function(ret) {
    //adiciona uma regra vazia
    ret.push("");
    funcaoZAPI.addVariaveis();
  };//fim adicionarRegra
  $scope.removerRegra = function(ret) {
    //remove a regra
    ret.pop();
    funcaoZAPI.removeVariaveis();
  };//fim removerRegra

  //======================fim das funcoes do escope ============================================

  //========= coisa do joao ================================================

	numX = 3;
	numF = 3;
  // criando variavel de perguntas
  $scope.x = ["X1", "X2"];
  // criando variavel de questão
  $scope.f = ["F1","F2"];
  // adicionando x 
  $scope.addX = function() {
    $scope.x.push("X" + numX);
	numX++;
 
  };
  // adicionando f
  $scope.addF = function() {
    $scope.f.push("F" + numF);
	  numF++;
  
  };
  // excluindo x
  $scope.delX = function() {
    $scope.x.splice($scope.x.length-1, 1);
	numX--;
  
  };
  // excluindo f
  $scope.delF = function(index) {
    $scope.f.splice($scope.f.length-1, 1);
	numF--;
    
  };
  //==============================================================================================
}]);