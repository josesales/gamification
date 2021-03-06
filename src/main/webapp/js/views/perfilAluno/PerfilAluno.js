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

	var PerfilAlunoTemplate = require('text!views/perfilAluno/tpl/PerfilAlunoTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var DisciplinaModel = require('models/DisciplinaModel');
	var AlunoModel = require('models/AlunoModel');
	var AlunoPageCollection = require('collections/AlunoPageCollection');

	var PerfilAluno = Marionette.LayoutView.extend({
		template : _.template(PerfilAlunoTemplate),

		regions : {
			disciplinaCadastradaCounterRegion : '#counter_disciplina_cadastrada',
			disciplinaCadastradaGridRegion : '#grid_disciplina_cadastrada',
			disciplinaCadastradaPaginatorRegion : '#paginator_disciplina_cadastrada',
			disciplinaNaoCadastradaCounterRegion : '#counter_disciplina_nao_cadastrada',
			disciplinaNaoCadastradaGridRegion : '#grid_disciplina_nao_cadastrada',
			disciplinaNaoCadastradaPaginatorRegion : '#paginator_disciplina_nao_cadastrada',
//			rankingGeralCounterRegion : '#counter_ranking_geral',
//			rankingGeralGridRegion : '#grid_ranking_geral',
//			rankingGeralPaginatorRegion : '#paginator_ranking_geral',
		},

		events : {

		},

		ui : {
			nomeAluno : '#nomeAluno',
			xp : '#xp',
			level : '#level',
			barraProximoLevel : '#barraProximoLevel',
		},

		initialize : function(opt) {
			var that = this;
			this.aluno = new AlunoModel();
			this.aluno.urlRoot = 'rs/crud/alunos/' + opt.id;

			// disciplinas cadastradas
			this.disciplinaCadastradaCollection = new DisciplinaPageCollection();
			this.disciplinaCadastradaCollection.state.pageSize = 5;
			this.disciplinaCadastradaCollection.on('fetching', this._startFetch, this);
			this.disciplinaCadastradaCollection.on('fetched', this._stopFetch, this);

			this.disciplinaCadastradaCollection.filterQueryParams = {
				aluno : opt.id,
				isAlunoIncluso : true,
			}
			this.disciplinaCadastradaCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					// caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});

			this.disciplinaCadastradaGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getDisciplinaCadastradaColumns(),
				emptyText : "Sem registros",
				collection : this.disciplinaCadastradaCollection,
				emptyText : "Sem registros para exibir."

			});

			this.disciplinaCadastradaCounter = new Counter({
				collection : this.disciplinaCadastradaCollection,
			});

			this.disciplinaCadastradaPaginator = new Backgrid.Extension.Paginator({
				columns : this._getDisciplinaCadastradaColumns(),
				collection : this.disciplinaCadastradaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			// disciplinas nao cadastradas
			this.disciplinaNaoCadastradaCollection = new DisciplinaPageCollection();
			this.disciplinaNaoCadastradaCollection.state.pageSize = 5;
			this.disciplinaNaoCadastradaCollection.on('fetching', this._startFetch, this);
			this.disciplinaNaoCadastradaCollection.on('fetched', this._stopFetch, this);

			this.disciplinaNaoCadastradaCollection.filterQueryParams = {
				aluno : opt.id,
				isAlunoIncluso : false,
			}

			this.disciplinaNaoCadastradaCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					// caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});

			this.disciplinaNaoCadastradaGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getDisciplinaNaoCadastradaColumns(),
				emptyText : "Sem registros",
				collection : this.disciplinaNaoCadastradaCollection,
				emptyText : "Sem registros para exibir."

			});

			this.disciplinaNaoCadastradaCounter = new Counter({
				collection : this.disciplinaNaoCadastradaCollection,
			});

			this.disciplinaNaoCadastradaPaginator = new Backgrid.Extension.Paginator({
				columns : this._getDisciplinaNaoCadastradaColumns(),
				collection : this.disciplinaNaoCadastradaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});
			
			// disciplinas nao cadastradas
//			this.rankingGeralCollection = new AlunoPageCollection();
//			this.rankingGeralCollection.state.pageSize = 5;
//			this.rankingGeralCollection.on('fetching', this._startFetch, this);
//			this.rankingGeralCollection.on('fetched', this._stopFetch, this);

//			this.rankingGeralCollection.filterQueryParams = {
//				comPontos : true,
//			}
//
//			this.rankingGeralCollection.fetch({
//				resetState : true,
//				success : function(_coll, _resp, _opt) {
//					// caso queira algum tratamento de sucesso adicional
//				},
//				error : function(_coll, _resp, _opt) {
//					console.error(_coll, _resp, _opt)
//				}
//			});

//			this.rankingGeralGrid = new Backgrid.Grid({
//				row : RowClick,
//				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
//				columns : this._getRankingGeralColumns(),
//				emptyText : "Sem registros",
//				collection : this.rankingGeralCollection,
//				emptyText : "Sem registros para exibir."
//
//			});
//
//			this.rankingGeralCounter = new Counter({
//				collection : this.rankingGeralCollection,
//			});
//
//			this.rankingGeralPaginator = new Backgrid.Extension.Paginator({
//				columns : this._getRankingGeralColumns(),
//				collection : this.rankingGeralCollection,
//				className : 'dataTables_paginate paging_simple_numbers',
//				uiClassName : 'pagination',
//			});

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

				// disciplinas cadastradas
				that.disciplinaCadastradaGridRegion.show(that.disciplinaCadastradaGrid);
				that.disciplinaCadastradaCounterRegion.show(that.disciplinaCadastradaCounter);
				that.disciplinaCadastradaPaginatorRegion.show(that.disciplinaCadastradaPaginator);

				// disciplinas nao cadastradas
				that.disciplinaNaoCadastradaGridRegion.show(that.disciplinaNaoCadastradaGrid);
				that.disciplinaNaoCadastradaCounterRegion.show(that.disciplinaNaoCadastradaCounter);
				that.disciplinaNaoCadastradaPaginatorRegion.show(that.disciplinaNaoCadastradaPaginator);
				
				// ranking geral
//				that.rankingGeralGridRegion.show(that.rankingGeralGrid);
//				that.rankingGeralCounterRegion.show(that.rankingGeralCounter);
//				that.rankingGeralPaginatorRegion.show(that.rankingGeralPaginator);
			});

		},

		_getDisciplinaCadastradaColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : true,
				label : "Nome",
				cell : "string",
			}, {
				name : "professor.nome",
				editable : false,
				sortable : true,
				label : "Professor",
				cell : CustomStringCell.extend({
					fieldName : 'professor.nome',
				}),
			}, {
				name : "acoes",
				label : "Listas, Descadastrar",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDisciplinasCadastradasCellButtons(),
					context : this,
				})
			} ];
			return columns;
		},

		_getDisciplinaNaoCadastradaColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : true,
				label : "Nome",
				cell : "string",
			}, {
				name : "professor.nome",
				editable : false,
				sortable : true,
				label : "Professor",
				cell : CustomStringCell.extend({
					fieldName : 'professor.nome',
				}),
			}, {
				name : "acoes",
				label : "Cadastrar",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDisciplinasNaoCadastradasCellButtons(),
					context : this,
				})
			} ];
			return columns;
		},
		
//		_getRankingGeralColumns : function() {
//			var columns = [
//			{
//				name : "posicao",
//				editable : false,
//				sortable : true,
//				label : "Posição",
//				cell : "string",
//			}, {
//				name : "nome",
//				editable : false,
//				sortable : true,
//				label 	 : "Aluno",
//				cell 	 : "string",
//			},{
//				name : "pontos",
//				editable : false,
//				sortable : true,
//				label 	 : "Pontos",
//				cell 	 : "string",
//			}];
//			return columns;
//		},

		_getDisciplinasCadastradasCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'lista_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Listas de Exercício',
				onClick : that._getListasExercicios,

			});
			buttons.push({
				id : 'regular_button',
				type : 'warning',
				icon : 'fa fa-thumbs-down',
				hint : 'Descadastrar Disciplina',
				onClick : that._descadastrar,

			});

			return buttons;
		},

		_getListasExercicios : function(model) {
			util.goPage('app/listasExercicios/aluno/' + this.aluno.get("id") + '/disciplina/' + model.get("id"), true);
		},

		_descadastrar : function(model) {
			
			var that = this;
			var disciplina = new DisciplinaModel({
				id : model.id,
			});
			
			disciplina.url = 'rs/crud/disciplinas/descadastrarAluno/' + model.get("id") + '/aluno/' + that.aluno.get("id");

			util.Bootbox.confirm("Tem certeza que se descadastrar da disciplina de " + model.get('nome') + "?", function(yes) {
				if (yes) {
					
					disciplina.destroy({
						success : function() {
							that.disciplinaCadastradaCollection.remove(model);
							that.disciplinaNaoCadastradaCollection.add(model);
						},
						error : function() {
							util.showMessage('error', 'Problemas ao descadastrar disciplina!');
						}
					});
					
				}
			});
		},

		_getDisciplinasNaoCadastradasCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'regular_button',
				type : 'primary',
				icon : 'fa fa-thumbs-up',
				hint : 'Cadastrar Disciplina',
				onClick : that._cadastrar,

			});

			return buttons;
		},

		_cadastrar : function(model) {
			var that = this;
			var disciplina = new DisciplinaModel({
				id : model.id,
					// rs/crud/disciplina/50/aluno/60
			});
			disciplina.url = 'rs/crud/disciplinas/cadastrarAluno/'+ model.get("id") + '/aluno/' + that.aluno.get("id");

			util.Bootbox.confirm("Tem certeza que se cadastrar da disciplina de " + model.get('nome') + "?", function(yes) {
				if (yes) {
					
					
					disciplina.save({}, {
						success : function(_model, _resp, _options) {
							that.disciplinaNaoCadastradaCollection.remove(model);
							that.disciplinaCadastradaCollection.add(model);
						},

						error : function(_model, _resp, _options) {
							util.showMessage('error', 'Problemas ao cadastrar disciplina!');
						}
					});
					
				}
			});
		},


	});

	return PerfilAluno;
});
