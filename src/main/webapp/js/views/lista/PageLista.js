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

	var TemplateFormListas = require('text!views/lista/tpl/FormListaTemplate.html');
	var ListaModel = require('models/ListaModel');
	var ListaCollection = require('collections/ListaCollection');
	var ListaPageCollection = require('collections/ListaPageCollection');
	var PageListaTemplate = require('text!views/lista/tpl/PageListaTemplate.html');
	
	//Filter import
	var SearchDisciplinaModal = require('views/modalComponents/DisciplinaModal');
	
	// End of "Import´s" definition

	var PageLista = Marionette.LayoutView.extend({
		template : _.template(PageListaTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchDisciplinaModalRegion : '#disciplinaModal',
		},
		
		events : {
			'click 	#query' : '_queryLista',			
			'click 	#reset' : '_resetLista',			
			'click #searchDisciplinaModal' : '_showSearchDisciplinaModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputDisciplinaId : '#inputDisciplinaId',
			inputDisciplinaNome : '#inputDisciplinaNome',
			form : '#formListaFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryLista();
	    	}
		},

		initialize : function() {
			var that = this;

			this.listas = new ListaPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.listas
			});

			this.counter = new Counter({
				collection : this.listas,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.listas,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.listas.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid lista');
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
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchDisciplinaModalRegion.show(this.searchDisciplinaModal);		
		
			});
		},
		 
		_queryLista : function(){
			var that = this;

			this.listas.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			    disciplina : util.escapeById('inputDisciplinaId'), 
			}
			this.listas.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid lista');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetLista : function(){
			this.ui.form.get(0).reset();
			this.listas.reset();
			util.clear('inputDisciplinaId');
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
				name : "disciplina.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Disciplina",
				cell : CustomStringCell.extend({
					fieldName : 'disciplina.nome',
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
							util.showSuccessMessage('Lista removido com sucesso!');
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
			return "app/editLista/" + model.get('id');
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
		

	});

	return PageLista;
});
