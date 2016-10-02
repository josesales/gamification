/* generated: 18/09/2015 09:02:56 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var Counter = require('views/components/Counter');
	var RowClick = require('views/components/CustomClickedRow');
	var util = require('utilities/utils');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomStringCell = require('views/components/CustomStringCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');
	var GeneralActionsCell = require('views/components/GeneralActionsCell');

	var ResolverDesafioTemplate = require('text!views/listasExercicios/tpl/ResolverDesafioTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var DisciplinaModel = require('models/DisciplinaModel');
	var AlunoModel = require('models/AlunoModel');
	var RankingPageCollection = require('collections/RankingPageCollection');
	var ListaModel = require('models/ListaModel');
	var ListaCollection = require('collections/ListaCollection');
	var ListaPageCollection = require('collections/ListaPageCollection');
	var QuestaoDesafioModel = require('models/QuestaoDesafioModel');
	var QuestaoDesafioCollection = require('collections/QuestaoDesafioCollection');
	

	var ResolverDesafio = Marionette.LayoutView.extend({
		template : _.template(ResolverDesafioTemplate),

		regions : {
		},

		events : {
			'change  #inputRespostaUploadImage' : 'startUpload',
			'click  #inputRespostaImage' : 'uploadFile',
			'click 	#voltar' : 'voltar',

		},

		ui : {
			formListaDesafio : '#formListaDesafio',
			listaNome : '#listaNome',
			pergunta : '#pergunta',
			inputRespostaUploadImage : '#inputRespostaUploadImage',
			inputRespostaImage : '#inputRespostaImage',
		},

		initialize : function(opt) {
			var that = this;
			this.aluno = new AlunoModel();
			this.aluno.urlRoot = 'rs/crud/alunos/' + opt.idAluno;
			this.disciplina = new DisciplinaModel();
			this.disciplina.urlRoot = 'rs/crud/disciplinas/' + opt.idDisciplina;
			this.lista = new ListaModel();
			this.lista.urlRoot = 'rs/crud/listas/getListaDoAluno/lista/' + opt.idLista + "/aluno/" + opt.idAluno;
			//Questao atual respondida
			this.desafioAtual = new QuestaoDesafioModel();
			this.indexDesafioAtual = 0;
			this.nomeImagem = '';
			
			this.on('show', function() {

				this.aluno.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});
				
				this.lista.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						if(that.lista.get("desafioAtual")) {
							that.indexDesafioAtual = that.lista.get("desafioAtual");
						} 
						that._setInformacoesLista(that.lista);
						that._setInformacoesDesafio(that.lista.get("questaoDesafios"), that.indexDesafioAtual);
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});

			});

		},
		
		uploadFile : function() {
			this.ui.inputRespostaUploadImage.trigger('click');
		},

		startUpload : function(e) {
			var that = this;
			if (!this.ui.inputRespostaUploadImage.val())
				return;

			this.ui.inputRespostaImage.attr('src', 'images/loading.gif');
			
			$('#formListaDesafio').ajaxSubmit({
				
				success : function(responseText) {
					
					that.ui.inputRespostaImage.attr('src', responseText.dataUrl);
					that.nomeImagem = responseText.dataUrl.split("/");
					that.nomeImagem = that.nomeImagem[1];
					that.responder();
				},

				error : function(response, paran, paran2) {
					console.log(response);
					console.log(paran);
					console.log(paran2); 
					util.showMessage('error', response.responseJSON.errorMessage);
					that.ui.inputRespostaImage.attr('src', 'images/questao_desafio.jpg');
					
				},

			});
		},
		
		
		_setInformacoesLista : function(listaModel) {
				this.ui.listaNome.text(listaModel.get("nome") + " (" + listaModel.get("questaoDesafios").length + " questões)");
				if(listaModel.get("desafioAtual")) {
					this.indexDesafioAtual = listaModel.get("desafioAtual");
				} 
					
		},
		
		_setInformacoesDesafio : function(questoesDesafioJson, index) {
			var numeroQuestao = index + 1;
			if(questoesDesafioJson && questoesDesafioJson[index] && questoesDesafioJson[index].pergunta) {
				this.ui.pergunta.text(numeroQuestao + ". " + questoesDesafioJson[index].pergunta );
			}
		},
		
		_getQuestaoDesafioAtualModel : function() {
			var that = this;
			var desafioAtual = this.lista.get("questaoDesafios")[this.indexDesafioAtual];
			var desafioAtualModel = new QuestaoDesafioModel();
			
			
			desafioAtualModel.set({
				id: desafioAtual.id || null,
				
		    	pergunta : desafioAtual.pergunta,
				
				
		    	pontos : desafioAtual.pontos, 
		    	
		    	lista : that.lista,
			});
			
			return desafioAtualModel;
		},
		
		responder : function() {
			var that = this;
			this.questaoDesafioAtual = this._getQuestaoDesafioAtualModel();
			
			this.listaAtualizada = new ListaModel();
			this.listaAtualizada.urlRoot = 'rs/crud/listas/getListaDoAluno/lista/' + this.lista.get('id') + "/aluno/" + this.aluno.get('id');
			
			this.questaoDesafioAtual.url = 'rs/crud/questaoDesafios/responder/' + this.questaoDesafioAtual.get("id") + '/resposta/' + this.nomeImagem +'/aluno/' + this.aluno.get("id");

			this.questaoDesafioAtual.fetch({
				 resetState : true,
				 success : function(_coll, _resp, _opt) {
					 if(_resp) {
						 
						 console.log("questao respondida");
						 util.showMessage('success', 'Desafio respondido com sucesso!');
						 
					 } else {
						 console.log("questao não respondida");
						 util.showMessage('error', 'Problema ao responder desafio!');
					 }
					 
					 that.listaAtualizada.fetch({
						resetState : true,
						success : function(_coll, _resp, _opt) {
							if(that.listaAtualizada.get("desafioConcluido")) {
								
								util.Bootbox.alert("<h3>Desafios da lista resolvidos com sucesso!</h3>", function() {});
								util.goPage('app/listasExercicios/aluno/' + that.aluno.get("id") + '/disciplina/' + that.listaAtualizada.get("disciplina").id, true);
								return;
							}
							if(that.listaAtualizada.get("desafioAtual")) {
								that.indexDesafioAtual = that.listaAtualizada.get("desafioAtual");
							} 
							that._setInformacoesLista(that.listaAtualizada);
							that._setInformacoesDesafio(that.listaAtualizada.get("questaoDesafios"), that.indexDesafioAtual);
							that.ui.inputRespostaImage.attr('src', 'images/questao_desafio.jpg');
						},
						error : function(_coll, _resp, _opt) {
							console.error(_coll, _resp, _opt)
						}
					});
					 
					 
				 },
				 error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				 }
			 });
			
		},
		
		voltar : function() {
			util.goPage('app/listasExercicios/aluno/' + this.aluno.get("id") + '/disciplina/' + this.lista.get("disciplina").id, true);
		},


	});

	return ResolverDesafio;
});
