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
		// 'click #botao' : 'chamaUrl'

		},

		// chamaUrl : function() {
		//
		// },
		ui : {
			nomeAluno : '#nomeAluno',
			xp : '#xp',
			level : '#level',
			barraProximoLevel : '#barraProximoLevel',
		// horaAtual : '#horaAtual',
		// mensagemExibida : '#mensagemExibida',
		// imgLogoGestor : '#imgLogoGestor',
		},

		initialize : function(opt) {
			var that = this;
			this.aluno = new AlunoModel();
			this.aluno.urlRoot = 'rs/crud/alunos/' + opt.idAluno;


			this.on('show', function() {

				this.aluno.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						that.ui.nomeAluno.text(_resp.nome);
						that.ui.xp.text(_resp.pontos ? 'XP ' + _resp.pontos : 'XP 0');
						that.ui.level.text(_resp.level ? 'Level ' + _resp.level : 'Level 1');
						that.ui.barraProximoLevel.prop("aria-valuenow", '' + _resp.proximoLevel ? _resp.proximoLevel : 0);
						that.ui.barraProximoLevel.prop("style", '' + "width:" + (_resp.proximoLevel ? _resp.proximoLevel : 0) + "%");
						var proxLevel = _resp.proximoLevel ? _resp.proximoLevel : 0;
						if (proxLevel >= 0 && proxLevel <= 30) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-danger');
						} else if (proxLevel > 30 && proxLevel < 50) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-warning');
						} else if (proxLevel >= 50 && proxLevel < 60) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-info');
						} else if (proxLevel >= 60) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-success');
						}
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

//		_getDisciplinaCadastradaColumns : function() {
//			var columns = [
//
//			{
//				name : "nome",
//				editable : false,
//				sortable : true,
//				label : "Nome",
//				cell : "string",
//			}, {
//				name : "professor.nome",
//				editable : false,
//				sortable : true,
//				label : "Professor",
//				cell : CustomStringCell.extend({
//					fieldName : 'professor.nome',
//				}),
//			}, {
//				name : "acoes",
//				label : "Listas, Descadastrar",
//				sortable : false,
//				cell : GeneralActionsCell.extend({
//					buttons : this._getDisciplinasCadastradasCellButtons(),
//					context : this,
//				})
//			} ];
//			return columns;
//		},
//
//		_getDisciplinaNaoCadastradaColumns : function() {
//			var columns = [
//
//			{
//				name : "nome",
//				editable : false,
//				sortable : true,
//				label : "Nome",
//				cell : "string",
//			}, {
//				name : "professor.nome",
//				editable : false,
//				sortable : true,
//				label : "Professor",
//				cell : CustomStringCell.extend({
//					fieldName : 'professor.nome',
//				}),
//			}, {
//				name : "acoes",
//				label : "Cadastrar",
//				sortable : false,
//				cell : GeneralActionsCell.extend({
//					buttons : this._getDisciplinasNaoCadastradasCellButtons(),
//					context : this,
//				})
//			} ];
//			return columns;
//		},
//
//		_getDisciplinasCadastradasCellButtons : function() {
//			var that = this;
//			var buttons = [];
//			buttons.push({
//				id : 'lista_button',
//				type : 'primary',
//				icon : 'fa-pencil',
//				hint : 'Listas de Exercício',
//				onClick : that._getListasExercicios,
//
//			});
//			buttons.push({
//				id : 'regular_button',
//				type : 'warning',
//				icon : 'fa fa-thumbs-down',
//				hint : 'Descadastrar Disciplina',
//				onClick : that._descadastrar,
//
//			});
//
//			return buttons;
//		},

//		_getListasExercicios : function(model) {
//			util.goPage('app/listasExercicios/aluno/' + this.aluno.get("id") + '/disciplina/' + model.get("id"), true);
////			'app/listas/aluno/:idAluno/disciplina/:idDisciplina' : 'listas'
//		},

//		_descadastrar : function(model) {
//			
//			var that = this;
//			var disciplina = new DisciplinaModel({
//				id : model.id,
//			});
//			
//			disciplina.url = 'rs/crud/disciplinas/descadastrarAluno/' + model.get("id") + '/aluno/' + that.aluno.get("id");
//
//			util.Bootbox.confirm("Tem certeza que se descadastrar da disciplina de " + model.get('nome') + "?", function(yes) {
//				if (yes) {
//					
//					disciplina.destroy({
//						success : function() {
//							that.disciplinaCadastradaCollection.remove(model);
//							that.disciplinaNaoCadastradaCollection.add(model);
//						},
//						error : function() {
//							util.showMessage('error', 'Problemas ao descadastrar disciplina!');
//						}
//					});
//					
//				}
//			});
//		},
//
//		_getDisciplinasNaoCadastradasCellButtons : function() {
//			var that = this;
//			var buttons = [];
//			buttons.push({
//				id : 'regular_button',
//				type : 'primary',
//				icon : 'fa fa-thumbs-up',
//				hint : 'Cadastrar Disciplina',
//				onClick : that._cadastrar,
//
//			});
//
//			return buttons;
//		},

//		_cadastrar : function(model) {
//			var that = this;
//			var disciplina = new DisciplinaModel({
//				id : model.id,
//					// rs/crud/disciplina/50/aluno/60
//			});
//			disciplina.url = 'rs/crud/disciplinas/cadastrarAluno/'+ model.get("id") + '/aluno/' + that.aluno.get("id");
//
//			util.Bootbox.confirm("Tem certeza que se cadastrar da disciplina de " + model.get('nome') + "?", function(yes) {
//				if (yes) {
//					
//					
//					disciplina.save({}, {
//						success : function(_model, _resp, _options) {
//							that.disciplinaNaoCadastradaCollection.remove(model);
//							that.disciplinaCadastradaCollection.add(model);
//						},
//
//						error : function(_model, _resp, _options) {
//							util.showMessage('error', 'Problemas ao cadastrar disciplina!');
//						}
//					});
//					
//					// TODO deletar do ranking
//				}
//			});
//		},

	});

	return ResolverLista;
});
