angular.module("ensinex").factory("funcaoZAPI", function() {
	
	/*
	armazena os dados ja digitados por sequencia exemplo:
		minha expresao requer que digite:
			
			é tudo sequencial entao sempre soma 1 ou subtrai 1


			0 ========================================================
			tem que ter varios numero  ou ir para estado 3  

						nesse passo retorna estado 0 						 		  
			quer dizer que estou esperando isso	

			1 ===========   depois ============================
			 tem , se nao tiver vai para estado 4

			retorna estado 1

			2 ===================== depois ========================
			se tiver virgula tem que ter numero depois 

			retorna estado 2

			3 ============== depois =====================
			pode começar com um unico X maiusculo ou x minusculo
			
			retorna estado 3	 		 

			4 ===========     depois    ===================
			se tiver x do estado 3 outro numero       

			nesse retorna estado 4		   
			esperando isso     

			5 ==========      depois =======================
			(pode ter + ou - )   ou nao pode ter finalizando a expresao 
			
			se tiver vai para estado 0

			nesse retorna estado 5
			esperando isso		 
	*/ 		

	//variavel que ira armazenar os estados 
	var _estado = [0];

	//vetor armazena os valores dos estados conforme os digitos e tamanho da string
	var _armazenaEstados = [[0]];

	//variavel armazena a string atual
	var _expressao = [""];

	//funcoe responsavel por gerenciamento dos arrays dentro do controle da pagina
	var _addVariaveis = function() {
		_estado.push(0);
		_armazenaEstados.push([0]);
		_expressao.push("");
	};
	var _removeVariaveis = function() {
		_estado.pop();
		_armazenaEstados.pop();
		_expressao.pop();
	}

	//=======================================================================================

	var _getTodoEstado = function() {
		return _estado;
	};
	var _setTodoEstado = function() {
		_estado = [0];
	};
	var _getEstado = function(index) {
		return _estado[index];
	};
	var _setEstado = function(est, index) {
		_estado[index] = est;
	};

	var _getArmazenaEstados = function(index) {
		return _armazenaEstados[index];
	};
	var _setArmazenaEstados = function(estado, index) {
		_armazenaEstados[index].push(estado);
	};
	var _removeArmazenaEstados = function(index) {
		_armazenaEstados[index].pop();
	};

	var _getExpressao = function(index) {
		return _expressao[index];
	};
	var _setExpressao = function(exp, index) {
		_expressao[index] = exp;
	}

	return {
		removeVariaveis: _removeVariaveis,
		addVariaveis: _addVariaveis,
		getTodoEstado: _getTodoEstado,
		removeTodoEstado: _setTodoEstado,
		getEstado: _getEstado,
		setEstado: _setEstado,
		getArmazenaEstados: _getArmazenaEstados,
		addArmazenaEstados: _setArmazenaEstados,
		removeArmazenaEstados: _removeArmazenaEstados,
		getExpressao: _getExpressao,
		setExpressao: _setExpressao
	};
});