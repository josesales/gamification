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

	var TemplateFormRoles = require('text!views/role/tpl/FormRoleTemplate.html');
	var RoleModel = require('models/RoleModel');
	var RoleCollection = require('collections/RoleCollection');
	var RolePageCollection = require('collections/RolePageCollection');
	var PageRoleTemplate = require('text!views/role/tpl/PageRoleTemplate.html');
	
	//Filter import
	
	// End of "Import´s" definition

	var PageRole = Marionette.LayoutView.extend({
		template : _.template(PageRoleTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
		},
		
		events : {
			'click 	#query' : '_queryRole',			
			'click 	#reset' : '_resetRole',			
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputAuthority : '#inputAuthority',
			inputDescription : '#inputDescription',
		
			form : '#formRoleFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryRole();
	    	}
		},

		initialize : function() {
			var that = this;

			this.roles = new RolePageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.roles
			});

			this.counter = new Counter({
				collection : this.roles,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.roles,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.roles.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid role');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
		
			});
		},
		 
		_queryRole : function(){
			var that = this;

			this.roles.filterQueryParams = {
	    		authority : util.escapeById('inputAuthority'),
	    		description : util.escapeById('inputDescription'),
			}
			this.roles.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid role');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetRole : function(){
			this.ui.form.get(0).reset();
			this.roles.reset();
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
				name : "authority",
				editable : false,
				sortable : true,
				label 	 : "Autoridade",
				cell 	 : "string",
			}, 
			{
				name : "description",
				editable : false,
				sortable : true,
				label 	 : "Descrição",
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
							util.showSuccessMessage('Role removido com sucesso!');
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
			return "app/editRole/" + model.get('id');
		},

		_editModel : function(model) {

		},
		

	});

	return PageRole;
});
