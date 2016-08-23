/* generated: 23/08/2016 08:32:11 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
	var BaseModel = require('models/BaseModel');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ModalMultiSelectLista = require('views/lista/ModalMultiSelectLista');
	var MultiSelectListaTemplate = require('text!views/lista/tpl/MultiSelectListaTemplate.html');

	var MultiSelectLista = Marionette.LayoutView.extend({
		template : _.template(MultiSelectListaTemplate),

		regions : {
			modalMultiSelectListaRegion : '#modalMultiSelectListas',
			gridListasModalRegion : '#gridMultiselectListas',
		},

		initialize : function() {
			var that = this;

			this.listas = this.collection;

			this.gridListas = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.listas,
			});

			this.modalMultiSelectLista = new ModalMultiSelectLista({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectListaRegion.show(that.modalMultiSelectLista);
				that.gridListasModalRegion.show(that.gridListas);
			});
		},
		clear : function(){
			this.modalMultiSelectLista.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectLista
});
