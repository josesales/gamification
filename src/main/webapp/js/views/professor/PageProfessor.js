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

	var TemplateFormProfessors = require('text!views/professor/tpl/FormProfessorTemplate.html');
	var ProfessorModel = require('models/ProfessorModel');
	var ProfessorCollection = require('collections/ProfessorCollection');
	var ProfessorPageCollection = require('collections/ProfessorPageCollection');
	var PageProfessorTemplate = require('text!views/professor/tpl/PageProfessorTemplate.html');
	
	//Filter import
	var SearchUsuarioModal = require('views/modalComponents/UserModal');
	
	// End of "Import´s" definition

	var PageProfessor = Marionette.LayoutView.extend({
		template : _.template(PageProfessorTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchUsuarioModalRegion : '#usuarioModal',
		},
		
		events : {
			'click 	#query' : '_queryProfessor',			
			'click 	#reset' : '_resetProfessor',			
			'click #searchUsuarioModal' : '_showSearchUsuarioModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputUsuarioId : '#inputUsuarioId',
			inputUsuarioNome : '#inputUsuarioNome',
			form : '#formProfessorFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryProfessor();
	    	}
		},

		initialize : function() {
			var that = this;

			this.professors = new ProfessorPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.professors
			});

			this.counter = new Counter({
				collection : this.professors,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.professors,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.professors.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid professor');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchUsuarioModal = new SearchUsuarioModal({
				onSelectModel : function(model) {
					that._selectUsuario(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchUsuarioModalRegion.show(this.searchUsuarioModal);		
		
			});
		},
		 
		_queryProfessor : function(){
			var that = this;

			this.professors.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			    usuario : util.escapeById('inputUsuarioId'), 
			}
			this.professors.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid professor');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetProfessor : function(){
			this.ui.form.get(0).reset();
			this.professors.reset();
			util.clear('inputUsuarioId');
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
				name : "usuario.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Usuario",
				cell : CustomStringCell.extend({
					fieldName : 'usuario.nome',
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
							util.showSuccessMessage('Professor removido com sucesso!');
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
			return "app/editProfessor/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchUsuarioModal : function() {
			this.searchUsuarioModal.showPage();
		},
			
		_selectUsuario : function(usuario) {
			this.searchUsuarioModal.hidePage();	
			this.ui.inputUsuarioId.val(usuario.get('id'));
			this.ui.inputUsuarioNome.val(usuario.get('nome'));		
		},
		

	});

	return PageProfessor;
});
