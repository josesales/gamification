$(document).ready(function() {
	
	var validarCamposObrigatorios = function() {
		var retorno = true;
		var nome = $("#nome").val();
		var nomeUsuario = $("#nomeUsuario").val();
		var senha = $("#senha").val();
		var senha2 = $("#senha2").val();
		var mensagem = "Preencha os seguintes campos: \n";
		if(!nome) {
			mensagem = mensagem + "Nome \n";
			retorno = false;
		}
		if(!nomeUsuario) {
			mensagem = mensagem + "Usuário \n";
			retorno = false;
		}
		if(!senha) {
			mensagem = mensagem + "Senha \n";
			retorno = false;
		}
		if(!senha2) {
			mensagem = mensagem + "Confirmar Senha \n";
			retorno = false;
		}
		
		if(!retorno) {
			alert(mensagem);
		}
		
		return retorno;
		
	}
	
	var validarSenha = function() {
		var retorno = true;
		var senha = $("#senha").val();
		var senha2 = $("#senha2").val();
		if(senha && senha2){
			if(!(senha === senha2)) {
				alert("Senha e confirmação estão diferentes.");
				retorno = false;
			}
		}
		return retorno;
	}
	
	
	$("#save").click(function() {
		
		if (validarCamposObrigatorios() && validarSenha()) {
			
			$.ajax({
		        url: "rs/crud/users/cadastrarUsuarioAluno",
		        contentType : 'application/json',
		        data : JSON.stringify({
					name : $("#nome").val(),
					username : $("#nomeUsuario").val(),
					password : $("#senha").val(),
				}),
		        type: 'POST',
		        success: function(data) {
		        	alert("Cadastro realizado com sucesso.");
		        	window.location.replace("login.html");
		        },
		        error : function(error) {
					if (error && error.responseText) {
						alert(error.responseText);
					}

				}
		    });
			
		}
	});

});