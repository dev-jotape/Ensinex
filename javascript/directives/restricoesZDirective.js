angular.module("ensinex").directive("restricoesZ", ["funcaoZAPI", function(funcaoZAPI){
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl) {

			var _formatZ = function(exp) {
				var _funcExp = exp.charAt(exp.length-1)

				var _estado0 = /^[0-9]$/;

				var _estado1 = /^,$/;
				//var _estado1_2 = /^[0-9]{1,}x$|^[0-9]{1,}X$/;

				//var _estado2 = /^[0-9]{1,},[0-9]{1,20}$/;
				//var _estado2_2 = /^[0-9]{1,},[0-9]{1,20}x$|^[0-9]{1,},[0-9]{1,20}X$/;

				var _estado3 = /^x$|^X$/;
				//var _estado3_2 = /^x[0-9]{1,}$|^X[0-9]{1,}$/;
				//var _estado3_3 = /^x[0-9]{1,}\+$|^X[0-9]{1,}\+$|x[0-9]{1,}-$|^X[0-9]{1,}-$/;

				//var _estado4 = /^[0-9]{1,}x[0-9]{1,}$|^[0-9]{1,}X[0-9]{1,}$/;
				//var _estado4_2 = /^[0-9]{1,},[0-9]{1,20}x[0-9]{1,}$|^[0-9]{1,},[0-9]{1,20}X[0-9]{1,}$/;

				var _estado5 = /^\+$|^-$/;
				//var _estado5_2 = /^[0-9]{1,},[0-9]{1,20}x[0-9]{1,}\+$|^[0-9]{1,},[0-9]{1,20}X[0-9]{1,}\+$|^[0-9]{1,},[0-9]{1,20}x[0-9]{1,}-$|^[0-9]{1,},[0-9]{1,20}X[0-9]{1,}-$/;

				var _estado6 = /^>$|^<$|^=$/;


				switch(funcaoZAPI.getEstado(scope.$eval(attrs.funcIndex))) {

					case 0: {
						//console.log("case - "+0)
						//console.log(_funcExp);
						//verificar se não é numero
						if(!_estado0.test(_funcExp)){
							//porque não é numero verificar se não é x ou X
							if(!_estado3.test(_funcExp)){
								//quer dizer que nao é entao apaga caracter digitado
								exp = exp.substring(0, exp.length - 1);
							}else{
								//porque é  garantindo x entao vai para estado 4
								funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));
							}
						}else{
							//porque é numero entao vai para estado 1 para esperar uma ,
							funcaoZAPI.setEstado(1, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(1, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 1: {
						//console.log("case - "+1)
						//verifica se não é numero
						if(!_estado0.test(_funcExp)){
							//não é entao verifica se não é uma ,
							if(!_estado1.test(_funcExp)){
								//não é entao verifica se não é um x ou X garatindo antes um numero
								if(!_estado3.test(_funcExp)){
									//quer dizer que nao é entao apaga caracter digitado
									exp = exp.substring(0, exp.length - 1);
								}else{
									//quer dizer que é garantindo x entao vai para estado 4
									funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
									funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));
								}
							}else{
								//quer dizer que é garantindo uma virgula entao vai para estado 2
								funcaoZAPI.setEstado(2, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(2, scope.$eval(attrs.funcIndex));
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(1, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 2: {
						//console.log("case - "+2)
						//verifica se não é numero garatindo antes uma virgula
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é entao apaga caracter digitado
							exp = exp.substring(0, exp.length - 1);
						}else{
							//quer dizer que é garantindo numero depois da virgula entao vai para estado 3
							funcaoZAPI.setEstado(3, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(3, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 3: {
						//console.log("case - "+3)
						//verifico se não é numero
						if(!_estado0.test(_funcExp)){
							//não é numero entao verifico se não é x ou X
							if(!_estado3.test(_funcExp)){
								//quer dizer que nao é entao apaga caracter digitado
								exp = exp.substring(0, exp.length - 1);
							}else{
								//quer dizer que é garantindo x entao vai para estado 4
								funcaoZAPI.setEstado(4, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(4, scope.$eval(attrs.funcIndex));
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(3, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 4: {
						/*
						tem um problema nesse passo que é a entrada de teclas que sao defirentes de numeros 
						se eu passar tecla de setas do teclado ela vai agir como digito e apagar o meu caracter
						coisa que nao poderia fazer vou tentar resolver isso bloqueando a entrada das setas mais talves
						outras teclas pode agir do mesmo comportamento
						*/
						//console.log("case - "+4)
						//verifica se não é numero
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é entao apaga caracter digitado
							exp = exp.substring(0, exp.length - 1);
						}else{
							//quer dizer que é garantindo numero depois da virgula entao vai para estado 3
							funcaoZAPI.setEstado(5, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(5, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 5: {
						//console.log("case - "+5)
						//garantindo um numero no minimo no estado 4 
						//verifica se não é numero
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é numero verifica se é sinal de + ou -
							if(!_estado5.test(_funcExp)){
								//quer dizer que nao é entao verifica se nao é > ou < ou =
								if(!_estado6.test(_funcExp)){
									//quer dizer que nao é entao apaga caracter digitado
									exp = exp.substring(0, exp.length - 1);
								}else{
									//quer dizer que é > ou < ou = entao vai para estado 6
									funcaoZAPI.setEstado(6, scope.$eval(attrs.funcIndex));
									funcaoZAPI.addArmazenaEstados(6, scope.$eval(attrs.funcIndex));
								}
							}else{
								//quer dizer que é + ou - entao vai para estado 0 repete tudo de novo
								funcaoZAPI.setEstado(0, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(0, scope.$eval(attrs.funcIndex));
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(5, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 6: {
						//verifica se nao é numero
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é entao apaga caracter digitado
							exp = exp.substring(0, exp.length - 1);
						}else{
							//quer dizer que é garantindo numero depois do > ou < ou = entao vai para estado 7
							funcaoZAPI.setEstado(7, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(7, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 7: {
						/*estado 7 é estado final estado poço onde cair aqui unicos passos é 
							apagar e voltar nos passos anteriores ou digitar numeros para 
							completar varios numeros ou ter uma virgula para valores fracionados
						*/
						//verifica se nao é numero
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é numero entao verifica se nao é virgula ,
							if(!_estado1.test(_funcExp)){
								//quer dizer que nao é entao apaga caracter digitado
								exp = exp.substring(0, exp.length - 1);
							}else{
								//quer dizer que é virgula vai para estado 8
								funcaoZAPI.setEstado(8, scope.$eval(attrs.funcIndex));
								funcaoZAPI.addArmazenaEstados(8, scope.$eval(attrs.funcIndex));
							}
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(7, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 8: {
						/*
							esse estado tem que aceitar numero para completar a fracao da virgula 
							do estado anterior entao tem que ter um numero para ir ao estado final 9
						*/
						//verifica se nao é numero
						if(!_estado0.test(_funcExp)){
								//quer dizer que nao é entao apaga caracter digitado
								exp = exp.substring(0, exp.length - 1);
						}else{
							//quer dizer que é numero garantindo assim fracao numerica com virgula vai para estado final 9
							funcaoZAPI.setEstado(9, scope.$eval(attrs.funcIndex));
							funcaoZAPI.addArmazenaEstados(9, scope.$eval(attrs.funcIndex));
						}
						break;
					}
					case 9: {
						/*
							estado 9 so aceita numero esse estado é final tamebem junto com o 7 
							nao aceita nem um outro caracter 
						*/
						//verifica se nao é numero
						if(!_estado0.test(_funcExp)){
							//quer dizer que nao é entao apaga caracter digitado
							exp = exp.substring(0, exp.length - 1);
						}else{
							//é porque é entao não faz nada continua no estado e nao exclui o caracter digitado
							funcaoZAPI.addArmazenaEstados(9, scope.$eval(attrs.funcIndex));
						}
						break;
					}
				}//fim do switch


				return exp;
				
			};



			element.bind("keyup", function(e) {
				//bloquenado o shift que é codigo 16 e as setas que sao os codigos 37 ate o 40
				if(e.keyCode != 16 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40){
					//console.log(e)
					if(e.keyCode == 46){
						//estou armazenando a expressao na minha API quando aperto delete nao acontece nada
						ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)));
						ctrl.$render();
					}else{
						if(e.keyCode == 8){
							//quando aperto backspace apaga sempre o ultimo caracter nao importa a posicao do cursor
							ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)).substring(0,funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)).length-1));
							funcaoZAPI.setExpressao(ctrl.$viewValue, scope.$eval(attrs.funcIndex));
							ctrl.$render();
							if(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length > 1) {
								funcaoZAPI.removeArmazenaEstados(scope.$eval(attrs.funcIndex));
							}
							funcaoZAPI.setEstado(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex))[funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length-1], scope.$eval(attrs.funcIndex))
						}else{
							if(e.keyCode == 32) {
								ctrl.$setViewValue(funcaoZAPI.getExpressao(scope.$eval(attrs.funcIndex)));
								ctrl.$render();
							}else{
								ctrl.$setViewValue(_formatZ(ctrl.$viewValue));
								funcaoZAPI.setExpressao(ctrl.$viewValue, scope.$eval(attrs.funcIndex));
								ctrl.$render();
								////console.log(funcaoZAPI.getEstado(scope.$eval(attrs.funcIndex)));

								//console.log(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex))[funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)).length-1]);
								//console.log(funcaoZAPI.getArmazenaEstados(scope.$eval(attrs.funcIndex)));

								//console.log(scope.$eval(attrs.funcIndex))
							}
						}
					}
					
				}
			}); 
		}
	};
}]);