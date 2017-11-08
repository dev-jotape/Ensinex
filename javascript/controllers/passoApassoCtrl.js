angular.module("ensinex").controller("passoApassoCtrl", ["$scope", "acessoLiberadoAPI", "$stateParams", function($scope, acessoLiberadoAPI, $stateParams) {
	console.log("passoApassoCtrl");
	
	//bloqueio o acesso caso usuario volte a pagina ira ter que colocar os valores denovo
	acessoLiberadoAPI.blockLiberado();

	//================== variaveis ===============================================================

	//varivel do typo de operacao 0 para Maximizar e 1 para Minimizar
	$scope.ObjOperacao = $stateParams.operacao;

	//funcao z ja dismembrada tamanho desse array = total de variaveis de decisão
	$scope.funcaoZ = $stateParams.funcaoZ;

	//todas restricoes
	$scope.restricoes = $stateParams.restricoes;

	//variavel que vai armazenar TABELA em forma de matriz não vou usar ela no scope
	//variavel estatica desse documento
	var _tabela = [];

	//================== fim das variaveis ===============================================================

	//========================== funcoes estaticas  =========================================================



	//================== fim funcoes estaticas ===============================================================

	//========================== funcoes do scope  =========================================================

	//funcao para verificar se valor é positivo se for ele retorna sinal de + para ser escrito na DOM 
	//para o sinal de menos não prescisa porque os numero ja vem com o - na frente
	$scope.testeSinal = function(valor, index) {
		//so verifica faz se não for o primeiro valor do array
		if(Math.sign(valor) == 1 && index != 0){
			return "+"
		}else{
			return ""
		}
	};

	$scope.tabelaDosCalculos = function(obj, func, restri) {
		//OBJ vou usar depois para verificar se é maximizar ou minimozar 
		//ate agora vamos fazer so o max

		//primeiro for é para adicionar todas as restricoes
		for(var i = 0 ; i < restri.length ; i++) {
			//adicionamos um novo elemento no array que é outro array fechando a estrutura da matriz 
			//quer dizer que estamos adicionado uma nova linha na matriz
			_tabela.push([]);

			//segundo for é para as colunas 
			//são formadas seguindo total de variveis de decissão + total de restricoes para forma os F
			//como total de variaveis de decisão é o tamanho do array func entao
			for(var j = 0 ; j < func.length ; j++) {

				for(var k = 0 ; k < restri.length ; k++){

					//eu acho que vai da erro aqui tem que testar
					if(restri[k][j].valor != undefined){
						_tabela[i][j].push(restri[k][j].valor);
					}else{
						_tabela[i][j].push(0);
					}
				}

			}

			//terceiro for percorre todo o array da restricao
			for(var j2 = func.length ; j2 < restri.length + func.length ; j2++) {

				for(var k2 = 0 ; k2 < restri.length ; k2++){

					//eu acho que vai da erro aqui tem que testar
					if(restri[k2][j2].valor != undefined){
						_tabela[i][j2].push(restri[k2][j].valor);
					}else{
						_tabela[i][j2].push(0);
					}
				}

			}

		}
	};

	//================== fim funcoes do scope ===============================================================

	console.log($scope.ObjOperacao);
	console.log($scope.funcaoZ);
	console.log($scope.restricoes);
}]);