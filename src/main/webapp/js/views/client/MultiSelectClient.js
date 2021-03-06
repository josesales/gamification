/* generated: 23/08/2016 08:32:12 */
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

	var ModalMultiSelectClient = require('views/client/ModalMultiSelectClient');
	var MultiSelectClientTemplate = require('text!views/client/tpl/MultiSelectClientTemplate.html');

	var MultiSelectClient = Marionette.LayoutView.extend({
		template : _.template(MultiSelectClientTemplate),

		regions : {
			modalMultiSelectClientRegion : '#modalMultiSelectClients',
			gridClientsModalRegion : '#gridMultiselectClients',
		},

		initialize : function() {
			var that = this;

			this.clients = this.collection;

			this.gridClients = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.clients,
			});

			this.modalMultiSelectClient = new ModalMultiSelectClient({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectClientRegion.show(that.modalMultiSelectClient);
				that.gridClientsModalRegion.show(that.gridClients);
			});
		},
		clear : function(){
			this.modalMultiSelectClient.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "logo",
				editable : false,
				sortable : false,
				label 	 : "Logotipo",
				cell 	 : "string",
			}, 
			{
				name : "name",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "cnpj",
				editable : false,
				sortable : false,
				label 	 : "CNPJ",
				cell 	 : "string",
			}, 
			{
				name : "phoneNumber",
				editable : false,
				sortable : false,
				label 	 : "Telefone",
				cell 	 : "string",
			}, 
			{
				name : "corporateName",
				editable : false,
				sortable : false,
				label 	 : "Razão Social",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectClient
});
