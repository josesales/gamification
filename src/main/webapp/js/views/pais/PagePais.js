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

	var TemplateFormPaiss = require('text!views/pais/tpl/FormPaisTemplate.html');
	var PaisModel = require('models/PaisModel');
	var PaisCollection = require('collections/PaisCollection');
	var PaisPageCollection = require('collections/PaisPageCollection');
	var PagePaisTemplate = require('text!views/pais/tpl/PagePaisTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PagePais = Marionette.LayoutView.extend({
		template : _.template(PagePaisTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryPais',			
			'click 	#reset' : '_resetPais',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputCodigo : '#inputCodigo',
			inputNome : '#inputNome',
		
			form : '#formPaisFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryPais();
	    	}
		},

		initialize : function() {
			var that = this;

			this.paiss = new PaisPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.paiss
			});

			this.counter = new Counter({
				collection : this.paiss,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.paiss,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.paiss.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid pais');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.ui.inputCodigo.formatNumber(2);
		
			});
		},
		 
		_queryPais : function(){
			var that = this;

			this.paiss.filterQueryParams = {
	    		codigo : util.escapeById('inputCodigo'),
	    		nome : util.escapeById('inputNome'),
			}
			this.paiss.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid pais');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetPais : function(){
			this.ui.form.get(0).reset();
			this.paiss.reset();
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
				name : "codigo",
				editable : false,
				sortable : true,
				label 	 : "Código",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
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
							util.showSuccessMessage('Pais removido com sucesso!');
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
			return "app/editPais/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PagePais;
});
