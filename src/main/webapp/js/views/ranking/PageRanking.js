/* generated: 23/08/2016 08:32:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormRankings = require('text!views/ranking/tpl/FormRankingTemplate.html');
	var RankingModel = require('models/RankingModel');
	var RankingCollection = require('collections/RankingCollection');
	var RankingPageCollection = require('collections/RankingPageCollection');
	var PageRankingTemplate = require('text!views/ranking/tpl/PageRankingTemplate.html');
	
	//Filter import
	var SearchDisciplinaModal = require('views/modalComponents/DisciplinaModal');
	var SearchAlunoModal = require('views/modalComponents/AlunoModal');
	
	// End of "Import´s" definition

	var PageRanking = Marionette.LayoutView.extend({
		template : _.template(PageRankingTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchDisciplinaModalRegion : '#disciplinaModal',
			searchAlunoModalRegion : '#alunoModal',
		},
		
		events : {
			'click 	#query' : '_queryRanking',			
			'click 	#reset' : '_resetRanking',			
			'click #searchDisciplinaModal' : '_showSearchDisciplinaModal',
			'click #searchAlunoModal' : '_showSearchAlunoModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputPontos : '#inputPontos',
		
			inputDisciplinaId : '#inputDisciplinaId',
			inputDisciplinaNome : '#inputDisciplinaNome',
			inputAlunoId : '#inputAlunoId',
			inputAlunoNome : '#inputAlunoNome',
			form : '#formRankingFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryRanking();
	    	}
		},

		initialize : function() {
			var that = this;

			this.rankings = new RankingPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.rankings
			});

			this.counter = new Counter({
				collection : this.rankings,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.rankings,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.rankings.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid ranking');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchDisciplinaModal = new SearchDisciplinaModal({
				onSelectModel : function(model) {
					that._selectDisciplina(model);
				},
			});
			this.searchAlunoModal = new SearchAlunoModal({
				onSelectModel : function(model) {
					that._selectAluno(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchDisciplinaModalRegion.show(this.searchDisciplinaModal);		
				this.searchAlunoModalRegion.show(this.searchAlunoModal);		
				this.ui.inputPontos.formatNumber(2);
		
			});
		},
		 
		_queryRanking : function(){
			var that = this;

			this.rankings.filterQueryParams = {
	    		pontos : util.escapeById('inputPontos'),
			    disciplina : util.escapeById('inputDisciplinaId'), 
			    aluno : util.escapeById('inputAlunoId'), 
			}
			this.rankings.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid ranking');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetRanking : function(){
			this.ui.form.get(0).reset();
			this.rankings.reset();
			util.clear('inputDisciplinaId');
			util.clear('inputAlunoId');
		},
				
		_getColumns : function() {
			var columns = [
			//{
			//	name : "id",
			//	label : "id",
			//	editable : false,
			//	cell : Backgrid.IntegerCell.extend({
			//		orderSeparator : ''
			//	})
			//}, 
			{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "disciplina.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Disciplina",
				cell : CustomStringCell.extend({
					fieldName : 'disciplina.nome',
				}),
			},	
			{
				name : "aluno.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Aluno",
				cell : CustomStringCell.extend({
					fieldName : 'aluno.nome',
				}),
			},	
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : ActionsCell.extend({
					editPath : this._getEditPath,
					deletePath : this._getDeletePath,
					editModel : this._editModel,
					deleteModel : this._deleteModel
				})
			} ];
			return columns;
		},

		_deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showSuccessMessage('Ranking removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao salvar registro',_resp);
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/editRanking/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchDisciplinaModal : function() {
			this.searchDisciplinaModal.showPage();
		},
			
		_selectDisciplina : function(disciplina) {
			this.searchDisciplinaModal.hidePage();	
			this.ui.inputDisciplinaId.val(disciplina.get('id'));
			this.ui.inputDisciplinaNome.val(disciplina.get('nome'));		
		},
		_showSearchAlunoModal : function() {
			this.searchAlunoModal.showPage();
		},
			
		_selectAluno : function(aluno) {
			this.searchAlunoModal.hidePage();	
			this.ui.inputAlunoId.val(aluno.get('id'));
			this.ui.inputAlunoNome.val(aluno.get('nome'));		
		},
		

	});

	return PageRanking;
});
