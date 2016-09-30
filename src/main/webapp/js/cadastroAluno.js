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
		       	 console.log("deu certo");
		        }
		    });
			
		}
	});
	
	
	
//	private Integer id;
//	private SyncOperation syncOperation;
//	private String name;
//	private String username;
//	private String password;
//	private Boolean enable;
//	private String image;
//	private ArrayList<JsonRole> roles = new ArrayList<JsonRole>();	
//	private JsonClient owner;
	

//	var controller, spinner, botaoDePesquisa;
//	spinner = $("#ciapSpin").show();
//	controller = new CiapController();
//	botaoDePesquisa = $('#btnPesquisarCiap');
//
//	function enterPressionado(e) {
//		code = (e.keyCode ? e.keyCode : e.which);
//		if (code == 13) {
//			botaoDePesquisa.click();
//		}
//	}
//
//	$("#btnPesquisarCiap").keypress(enterPressionado);
//
//	$("#consultarCiap").click(function() {
//		limpaTela();
//		
//		controller.listaStatusCiap({
//			onSuccess: function(retorno) {
//				GSH.popularSelectEnum('nomeStatusCiap', retorno.statusCiapAtencaoBasicas);
//			},
//			onError : function(jqXHR, textStatus, errorThrown) {
//				console.log(errorThrown);	
//			}
//		});
//	});
//
//	var pageRequester = {};
//	var config = {};
//
//	$('#ciapDialog').on('shown', function() {
//		$('#nomeCiap').focus();
//	});
//
//	$('#numeroCiap').change(function() {
//		var numeroCiap = $('#numeroCiap').val();
//
//		if (numeroCiap) {
//			controller.pesquisar({
//				data : {
//					"ciap.ciap" : numeroCiap
//				},
//				onSuccess : function(retorno) {
//					if (typeof (retorno.message) != 'undefined') {
//						GSH.adicionarValMensagem("#descricaoCiap", "");
//						$("#numeroCiap").val("");
//						GSH.adicionarHTMLMensagem("#descricaoCiap", retorno.message);
//						$('#descricaoCiap').hide();
//					} else {
//						GSH.adicionarValMensagem("#numeroCiap", numeroCiap);
//						GSH.adicionarTextMensagemJQuery("#descricaoCiap", retorno.items[0].descricao);
//						GSH.adicionarValMensagem("#idCiap", retorno.items[0].id);
//						GSH.adicionarValMensagem("#ciapDescricao", retorno.items[0].descricao);
//						GSH.adicionarValMensagem("#nomeCiap", retorno.items[0].descricao);
//						GSH.adicionarValMensagem("#ciapNome", retorno.items[0].descricao);
//					}
//				},
//				onError : function(jqXHR, textStatus, errorThrown) {
//					console.log(errorThrown);
//				}
//			});
//		} else {
//			GSH.adicionarTextHideMensagemJQuery("#descricaoCiap", "");
//		}
//	});
//
//	pageRequester.requestPage = function(config, callback) {
//
//		controller.pesquisar({
//			data : {
//				"ciap.descricao" : $("#nomeCiap").val(),
//				
//				"statusCiap.id" : $("#nomeStatusCiap").val(),
//
//				"config.currentPage" : config.currentPage,
//
//				"config.pageSize" : config.pageSize
//			},
//			onSuccess : function(retorno) {
//				botaoDePesquisa.show();
//				if (typeof (retorno.message) == 'undefined') {
//					retorno.totalItems = retorno.total;
//					$.extend(retorno, retorno.config);
//					callback(retorno);
//				} else {
//					callback({
//						items : [],
//						totalItems : 0,
//						noResultsMessage : retorno.message
//					});
//				}
//				$('#resultadoCiapDiv').show();
//				GSH.adicionaTotalRegistros(retorno.totalItems);
//			},
//			onError : function(jqXHR, textStatus, errorThrown) {
//				console.log(errorThrown);
//				botaoDePesquisa.show();
//			}
//		});
//	};
//
//	botaoDePesquisa.click(function(e) {
//		config = {
//			spinner : spinner,
//			pageRequester : pageRequester,
//			lineConstructor : [ function(ciap) {
//				return "<input type='radio' name='selectCiap' value='" + ciap.ciap + ":" + ciap.descricao + ":" + ciap.id + "'/>";
//			}, function(ciap) {
//				return ciap.ciap;
//			}, function(ciap) {
//				return ciap.descricao;
//			} ],
//			onAppendItems : function() {
//				GSH.scrollTo("resultadoCiapDiv");
//				$("input[name=selectCiap]").parent().parent().click(function() {
//					var ciapSelecionado = $(this).children().find("input[name=selectCiap]");
//					var ciap = ciapSelecionado.val().split(':');
//					GSH.adicionarValMensagem("#numeroCiap", ciap[0]);
//					GSH.adicionarTextMensagemJQuery("#descricaoCiap", ciap[1]);
//					GSH.adicionarValMensagem("#idCiap", ciap[2]);
//					GSH.adicionarValMensagem("#ciapDescricao", ciap[1]);
//					GSH.adicionarValMensagem("#nomeCiap", ciap[1]);
//					GSH.adicionarValMensagem("#ciapNome", ciap[1]);
//
//					$(".modal").modal('hide');
//					limpaTela();
//				});
//			}
//		};
//
//		if ($("#formPesquisaCiap").valid()) {
//			botaoDePesquisa.hide();
//			$("#ciapTable").paginate(config);
//		} else {
//			dwr.util.removeAllRows("resultadosCiap");
//			$('#resultadoCiapDiv').hide();
//		}
//	});
//
//	function limpaTela() {
//		dwr.util.removeAllRows("resultadosCiap");
//		GSH.adicionarValMensagem("#nomeCiap", "");
//		$('#resultadoCiapDiv').hide();
//	}

});