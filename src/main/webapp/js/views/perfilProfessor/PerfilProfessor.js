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

	var PerfilProfessorTemplate = require('text!views/perfilProfessor/tpl/PerfilProfessorTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var DisciplinaModel = require('models/DisciplinaModel');
	var ProfessorModel = require('models/ProfessorModel');
	var AlunoPageCollection = require('collections/AlunoPageCollection');

	var PerfilProfessor = Marionette.LayoutView.extend({
		template : _.template(PerfilProfessorTemplate),

		regions : {
			disciplinaCounterRegion : '#counter_disciplina',
			disciplinaGridRegion : '#grid_disciplina',
			disciplinaPaginatorRegion : '#paginator_disciplina',
			rankingGeralCounterRegion : '#counter_ranking_geral',
			rankingGeralGridRegion : '#grid_ranking_geral',
			rankingGeralPaginatorRegion : '#paginator_ranking_geral',
		},

		events : {

		},

		ui : {
			nomeProfessor : '#nomeProfessor',
//			xp : '#xp',
//			level : '#level',
//			barraProximoLevel : '#barraProximoLevel',
		},

		initialize : function(opt) {
			var that = this;
			this.professor = new ProfessorModel();
			this.professor.urlRoot = 'rs/crud/professors/' + opt.id;

			// disciplinas do professor
			this.disciplinaCollection = new DisciplinaPageCollection();
			this.disciplinaCollection.state.pageSize = 5;
			this.disciplinaCollection.on('fetching', this._startFetch, this);
			this.disciplinaCollection.on('fetched', this._stopFetch, this);

			this.disciplinaCollection.filterQueryParams = {
				professor : opt.id,
			}
			this.disciplinaCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					// caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});

			this.disciplinaGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getDisciplinaCadastradaColumns(),
				emptyText : "Sem registros",
				collection : this.disciplinaCollection,
				emptyText : "Sem registros para exibir."

			});

			this.disciplinaCounter = new Counter({
				collection : this.disciplinaCollection,
			});

			this.disciplinaPaginator = new Backgrid.Extension.Paginator({
				columns : this._getDisciplinaCadastradaColumns(),
				collection : this.disciplinaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			//Ranking Geral
			this.rankingGeralCollection = new AlunoPageCollection();
			this.rankingGeralCollection.state.pageSize = 5;
			this.rankingGeralCollection.on('fetching', this._startFetch, this);
			this.rankingGeralCollection.on('fetched', this._stopFetch, this);

			this.rankingGeralCollection.filterQueryParams = {
				comPontos : true,
			}

			this.rankingGeralCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					// caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});

			this.rankingGeralGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getRankingGeralColumns(),
				emptyText : "Sem registros",
				collection : this.rankingGeralCollection,
				emptyText : "Sem registros para exibir."

			});

			this.rankingGeralCounter = new Counter({
				collection : this.rankingGeralCollection,
			});

			this.rankingGeralPaginator = new Backgrid.Extension.Paginator({
				columns : this._getRankingGeralColumns(),
				collection : this.rankingGeralCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {

				this.professor.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						that.ui.nomeProfessor.text("Bem Vindo, " + _resp.nome);
//						that.ui.xp.text(_resp.pontos ? 'XP ' + _resp.pontos : 'XP 0');
//						that.ui.level.text(_resp.level ? 'Level ' + _resp.level : 'Level 1');
//						that.ui.barraProximoLevel.prop("aria-valuenow", '' + _resp.proximoLevel ? _resp.proximoLevel : 0);
//						that.ui.barraProximoLevel.prop("style", '' + "width:" + (_resp.proximoLevel ? _resp.proximoLevel : 0) + "%");
//						var proxLevel = _resp.proximoLevel ? _resp.proximoLevel : 0;
//						if (proxLevel >= 0 && proxLevel <= 30) {
//							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-danger');
//						} else if (proxLevel > 30 && proxLevel < 50) {
//							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-warning');
//						} else if (proxLevel >= 50 && proxLevel < 60) {
//							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-info');
//						} else if (proxLevel >= 60) {
//							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-success');
//						}
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});

				// disciplinas cadastradas
				that.disciplinaGridRegion.show(that.disciplinaGrid);
				that.disciplinaCounterRegion.show(that.disciplinaCounter);
				that.disciplinaPaginatorRegion.show(that.disciplinaPaginator);

				// ranking geral
				that.rankingGeralGridRegion.show(that.rankingGeralGrid);
				that.rankingGeralCounterRegion.show(that.rankingGeralCounter);
				that.rankingGeralPaginatorRegion.show(that.rankingGeralPaginator);
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
				label : "Listas",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDisciplinasCellButtons(),
					context : this,
				})
			} ];
			return columns;
		},

		_getRankingGeralColumns : function() {
			var columns = [
			{
				name : "posicao",
				editable : false,
				sortable : true,
				label : "Posição",
				cell : "string",
			}, {
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Aluno",
				cell 	 : "string",
			},{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell 	 : "string",
			}];
			return columns;
		},

		_getDisciplinasCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'lista_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Listas de Exercício',
				onClick : that._getListasExercicios,

			});

			return buttons;
		},

		_getListasExercicios : function(model) {
			util.goPage('app/listasExercicios/aluno/' + this.professor.get("id") + '/disciplina/' + model.get("id"), true);
		},

	});

	return PerfilProfessor;
});
