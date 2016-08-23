/* generated: 23/08/2016 08:32:11 */
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

	var TemplateFormDisciplinas = require('text!views/disciplina/tpl/FormDisciplinaTemplate.html');
	var DisciplinaModel = require('models/DisciplinaModel');
	var DisciplinaCollection = require('collections/DisciplinaCollection');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var PageDisciplinaTemplate = require('text!views/disciplina/tpl/PageDisciplinaTemplate.html');
	
	//Filter import
	var SearchProfessorModal = require('views/modalComponents/ProfessorModal');
	
	// End of "Import´s" definition

	var PageDisciplina = Marionette.LayoutView.extend({
		template : _.template(PageDisciplinaTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchProfessorModalRegion : '#professorModal',
		},
		
		events : {
			'click 	#query' : '_queryDisciplina',			
			'click 	#reset' : '_resetDisciplina',			
			'click #searchProfessorModal' : '_showSearchProfessorModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputProfessorId : '#inputProfessorId',
			inputProfessorNome : '#inputProfessorNome',
			form : '#formDisciplinaFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryDisciplina();
	    	}
		},

		initialize : function() {
			var that = this;

			this.disciplinas = new DisciplinaPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.disciplinas
			});

			this.counter = new Counter({
				collection : this.disciplinas,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.disciplinas,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.disciplinas.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid disciplina');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchProfessorModal = new SearchProfessorModal({
				onSelectModel : function(model) {
					that._selectProfessor(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchProfessorModalRegion.show(this.searchProfessorModal);		
		
			});
		},
		 
		_queryDisciplina : function(){
			var that = this;

			this.disciplinas.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			    professor : util.escapeById('inputProfessorId'), 
			}
			this.disciplinas.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid disciplina');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetDisciplina : function(){
			this.ui.form.get(0).reset();
			this.disciplinas.reset();
			util.clear('inputProfessorId');
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
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "professor.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Professor",
				cell : CustomStringCell.extend({
					fieldName : 'professor.nome',
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
							util.showSuccessMessage('Disciplina removido com sucesso!');
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
			return "app/editDisciplina/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchProfessorModal : function() {
			this.searchProfessorModal.showPage();
		},
			
		_selectProfessor : function(professor) {
			this.searchProfessorModal.hidePage();	
			this.ui.inputProfessorId.val(professor.get('id'));
			this.ui.inputProfessorNome.val(professor.get('nome'));		
		},
		

	});

	return PageDisciplina;
});
