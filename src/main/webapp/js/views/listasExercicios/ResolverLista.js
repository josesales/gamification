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

	var ResolverListaTemplate = require('text!views/listasExercicios/tpl/ResolverListaTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var DisciplinaModel = require('models/DisciplinaModel');
	var AlunoModel = require('models/AlunoModel');
	var RankingPageCollection = require('collections/RankingPageCollection');
	var ListaModel = require('models/ListaModel');
	var ListaCollection = require('collections/ListaCollection');
	var ListaPageCollection = require('collections/ListaPageCollection');
	var QuestaoModel = require('models/QuestaoModel');
	var QuestaoCollection = require('collections/QuestaoCollection');
	

	var ResolverLista = Marionette.LayoutView.extend({
		template : _.template(ResolverListaTemplate),

		regions : {
		},

		events : {
			'click #responder' : 'responder'

		},

		ui : {
			nomeAluno : '#nomeAluno',
			xp : '#xp',
			level : '#level',
			barraProximoLevel : '#barraProximoLevel',
			formListaQuestao : '#formListaQuestao',
			listaNome : '#listaNome',
			pergunta : '#pergunta',
			itemA : '#itemA',
			itemB : '#itemB',
			itemC : '#itemC',
			itemD : '#itemD',
			radioItemA : '#radioItemA',
			radioItemB : '#radioItemB',
			radioItemC : '#radioItemC',
			radioItemD : '#radioItemD',
		},

		initialize : function(opt) {
			var that = this;
			this.aluno = new AlunoModel();
			this.aluno.urlRoot = 'rs/crud/alunos/' + opt.idAluno;
			this.disciplina = new DisciplinaModel();
			this.disciplina.urlRoot = 'rs/crud/disciplinas/' + opt.idDisciplina;
			this.lista = new ListaModel();
			this.lista.urlRoot = 'rs/crud/listas/' + opt.idLista;
			
			//Questao atual respondida
			this.questaoAtual = new QuestaoModel();
			this.indexQuestaoAtual = 0;
//
//			this.questaoCollection.filterQueryParams = {
//				lista : opt.idLista,
//			}
//			this.questaoCollection.fetch({
//				resetState : true,
//				success : function(_coll, _resp, _opt) {
//					console.log(_coll, _resp, _opt)
//				},
//				error : function(_coll, _resp, _opt) {
//					console.error(_coll, _resp, _opt)
//				}
//			});
			
			
			


			this.on('show', function() {

				this.aluno.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						that._setInformacoesAluno(that.aluno);
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});
				
				this.lista.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						if(that.lista.get("questaoAtual")) {
							that.indexQuestaoAtual = that.lista.get("questaoAtual");
						} 
						that._setInformacoesLista(that.lista);
						that._setInformacoesQuestao(that.lista.get("questaos"), that.indexQuestaoAtual);
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});

			});

		},
		
		_setInformacoesAluno : function(alunoModel) {
			this.ui.nomeAluno.text(alunoModel.get("nome"));
			this.ui.xp.text(alunoModel.get("pontos") ? 'XP ' + alunoModel.get("pontos") : 'XP 0');
			this.ui.level.text(alunoModel.get("level") ? 'Level ' + alunoModel.get("level") : 'Level 1');
			this.ui.barraProximoLevel.prop("aria-valuenow", '' + alunoModel.get("proximoLevel") ? alunoModel.get("proximoLevel") : 0);
			this.ui.barraProximoLevel.prop("style", '' + "width:" + (alunoModel.get("proximoLevel") ? alunoModel.get("proximoLevel") : 0) + "%");
			var proxLevel = alunoModel.get("proximoLevel") ? alunoModel.get("proximoLevel") : 0;
			if (proxLevel >= 0 && proxLevel <= 30) {
				this.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-danger');
			} else if (proxLevel > 30 && proxLevel < 50) {
				this.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-warning');
			} else if (proxLevel >= 50 && proxLevel < 60) {
				this.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-info');
			} else if (proxLevel >= 60) {
				this.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-success');
			}
		},
		
		_setInformacoesLista : function(listaModel) {
				this.ui.listaNome.text(listaModel.get("nome") + " (" + listaModel.get("questaos").length + " questões)");
//				if(listaModel.get("questaoAtual")) {
//					this.indexQuestaoAtual = listaModel.get("questaoAtual");
//				} 
					
		},
		
		_setInformacoesQuestao : function(questoesJson, index) {
			var numeroQuestao = index + 1;
			this.ui.pergunta.text(numeroQuestao + ". " + questoesJson[index].pergunta );
			this.ui.itemA.text(questoesJson[index].itemA);
			this.ui.itemB.text(questoesJson[index].itemB);
			this.ui.itemC.text(questoesJson[index].itemC);
			this.ui.itemD.text(questoesJson[index].itemD);
		},
		
		_getQuestaoAtualModel : function() {
			var that = this;
			var questaoAtual = this.lista.get("questaos")[this.indexQuestaoAtual];
			var questaoAtualModel = new QuestaoModel();
			
			
			questaoAtualModel.set({
				id: questaoAtual.id || null,
				
		    	pergunta : questaoAtual.pergunta,
				
		    	itemA : questaoAtual.itemA, 
				
		    	itemB : questaoAtual.itemB,
				
		    	itemC : questaoAtual.itemC,
				
		    	itemD : questaoAtual.itemD,
				
		    	itemCorreto : questaoAtual.itemCorreto, 
				
		    	pontos : questaoAtual.pontos, 
		    	
		    	lista : that.lista,
			});
			
			return questaoAtualModel;
		},
		
		responder : function() {
			var that = this;
			this.questaoAtual = this._getQuestaoAtualModel();
			
			var itemMarcado = null;
			var isItemMarcado = false;
			
			if(this.ui.radioItemA.is(':checked')) {
				isItemMarcado = true;
				itemMarcado = 'a';
			}else if(this.ui.radioItemB.is(':checked')) {
				isItemMarcado = true;
				itemMarcado = 'b';
			}else if(this.ui.radioItemC.is(':checked')) {
				isItemMarcado = true;
				itemMarcado = 'c';
			}else if(this.ui.radioItemD.is(':checked')) {
				isItemMarcado = true;
				itemMarcado = 'd';
			}   
			
			if(!isItemMarcado) {
				util.showMessage('error', 'Escolha algum item!');
				return;
			}
			
			this.alunoAtualizado = new AlunoModel();
			this.alunoAtualizado.urlRoot = 'rs/crud/alunos/' + this.aluno.get('id');
			this.listaAtualizada = new ListaModel();
			this.listaAtualizada.urlRoot = 'rs/crud/listas/' + this.lista.get('id');
			
			this.questaoAtual.url = 'rs/crud/questaos/responder/' + this.questaoAtual.get("id") + '/itemMarcado/' + itemMarcado +'/aluno/' + this.aluno.get("id");

			this.questaoAtual.fetch({
				 resetState : true,
				 success : function(_coll, _resp, _opt) {
					 if(_resp) {
						 
						 console.log("questao correta");
						 util.showMessage('success', 'Item correto!');
						 
						 that.alunoAtualizado.fetch({
							resetState : true,
							success : function(_coll, _resp, _opt) {
								that._setInformacoesAluno(that.alunoAtualizado);
							},
							error : function(_coll, _resp, _opt) {
								console.error(_coll, _resp, _opt)
							}
						});
						 
					 } else {
						 console.log("questao incorreta");
						 util.showMessage('error', 'Item incorreto!');
					 }
					 
					 that.listaAtualizada.fetch({
						resetState : true,
						success : function(_coll, _resp, _opt) {
							if(that.listaAtualizada.get("questaoAtual")) {
								that.indexQuestaoAtual = that.listaAtualizada.get("questaoAtual");
							} 
							that._setInformacoesLista(that.listaAtualizada);
							that._setInformacoesQuestao(that.listaAtualizada.get("questaos"), that.indexQuestaoAtual);
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
			
			
//			this.alunoAtualizado.fetch({
//				resetState : true,
//				success : function(_coll, _resp, _opt) {
//					that._setInformacoesAluno(that.alunoAtualizado);
//				},
//				error : function(_coll, _resp, _opt) {
//					console.error(_coll, _resp, _opt)
//				}
//			});
			 
			 
//			this.listaAtualizada.fetch({
//				resetState : true,
//				success : function(_coll, _resp, _opt) {
//					if(that.listaAtualizada.get("questaoAtual")) {
//						that.indexQuestaoAtual = that.listaAtualizada.get("questaoAtual");
//					} 
//					that._setInformacoesLista(that.listaAtualizada);
//					that._setInformacoesQuestao(that.listaAtualizada.get("questaos"), that.indexQuestaoAtual);
//				},
//				error : function(_coll, _resp, _opt) {
//					console.error(_coll, _resp, _opt)
//				}
//			});
			
			
		}


	});

	return ResolverLista;
});
