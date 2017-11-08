angular.module("ensinex").factory("acessoLiberadoAPI", function() {
	/*
		api responsavel por armazenar variavel que libera acesso para outras paginas
		armazena apenas boolean verdadeiro ou falso
	*/

	//variavel controle
	var _liberado = false;

	//retorna o valor atual 
	var _getLiberado = function() {
		return _liberado;
	};
	//libera o acesso deixando a variavel true
	var _setLiberado = function() {
		_liberado = true;
	};
	//bloqueia o acesso deixando variavel false
	var _blockLiberado = function() {
		_liberado = false;
	}

	return {
		getLiberado: _getLiberado,
		setLiberado: _setLiberado,
		blockLiberado: _blockLiberado
	}
});