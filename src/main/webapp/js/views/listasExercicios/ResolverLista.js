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
//			disciplinaCadastradaCounterRegion : '#counter_disciplina_cadastrada',
//			disciplinaCadastradaGridRegion : '#grid_disciplina_cadastrada',
//			disciplinaCadastradaPaginatorRegion : '#paginator_disciplina_cadastrada',
//			disciplinaNaoCadastradaCounterRegion : '#counter_disciplina_nao_cadastrada',
//			disciplinaNaoCadastradaGridRegion : '#grid_disciplina_nao_cadastrada',
//			disciplinaNaoCadastradaPaginatorRegion : '#paginator_disciplina_nao_cadastrada',
		},

		events : {
//			'click #radioItemA' : 'checarItemA'

		},

		// chamaUrl : function() {
		//
		// },
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
			this.indexQuestaoAtual = 0;
//			//Questoes da lista
//			this.questaoCollection = new QuestaoCollection();
//			this.questaoCollection.on('fetching', this._startFetch, this);
//			this.questaoCollection.on('fetched', this._stopFetch, this);
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
						that._setInformacoesLista(that.lista);
						that._setInformacoesQuestao(that.lista.get("questaos"), that.indexQuestaoAtual);
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});

//				// disciplinas cadastradas
//				that.disciplinaCadastradaGridRegion.show(that.disciplinaCadastradaGrid);
//				that.disciplinaCadastradaCounterRegion.show(that.disciplinaCadastradaCounter);
//				that.disciplinaCadastradaPaginatorRegion.show(that.disciplinaCadastradaPaginator);
//
//				// disciplinas nao cadastradas
//				that.disciplinaNaoCadastradaGridRegion.show(that.disciplinaNaoCadastradaGrid);
//				that.disciplinaNaoCadastradaCounterRegion.show(that.disciplinaNaoCadastradaCounter);
//				that.disciplinaNaoCadastradaPaginatorRegion.show(that.disciplinaNaoCadastradaPaginator);
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
		},
		
		_setInformacoesQuestao : function(questoesJson, index) {
			var numeroQuestao = index + 1;
			this.ui.pergunta.text(numeroQuestao + ". " + questoesJson[index].pergunta );
			this.ui.itemA.text(questoesJson[index].itemA);
			this.ui.itemB.text(questoesJson[index].itemB);
			this.ui.itemC.text(questoesJson[index].itemC);
			this.ui.itemD.text(questoesJson[index].itemD);
		},
		
		checarItemA : function() {
			this.ui.radioItemA.attr('checked', true);
		}


	});

	return ResolverLista;
});
