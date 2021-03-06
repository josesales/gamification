/* generated: 23/08/2016 08:32:12 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var RadioButtonCell = require('views/components/RadioButtonCell');
	var Counter = require('views/components/Counter');
	var RowClick = require('views/components/CustomClickedRow');
	var Combobox = require('views/components/Combobox');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var ClientModal = require('text!views/modalComponents/tpl/ClientModalTemplate.html');
	var ClientPageCollection = require('collections/ClientPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var ClientModal = Marionette.LayoutView.extend({
		template : _.template(ClientModal),

		events : {
			'click #btnSearchClient' : 'searchClient',
			'click #btnClearClient' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-client',
			gridRegion : 		'#grid-client',
			paginatorRegion : 	'#paginator-client',
		},

		ui : {
    		inputModalLogo : '#inputModalLogo',
    		inputModalName : '#inputModalName',
    		inputModalCnpj : '#inputModalCnpj',
    		inputModalPhoneNumber : '#inputModalPhoneNumber',
    		inputModalCorporateName : '#inputModalCorporateName',
		
			form : '#formSearchClient',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchClient();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.clientCollection = new ClientPageCollection();
			this.clientCollection.state.pageSize = 5;
			this.clientCollection.on('fetching', this._startFetch, this);
			this.clientCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.clientCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.clientCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.clientCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectRow : function(e) {
			var modelClient = util.getWrappedModel(e);
			if (modelClient)
				this.onSelectModel(modelClient);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "logo",
				editable : false,
				sortable : true,
				label 	 : "Logotipo",
				cell 	 : "string",
			}, 
			{
				name : "name",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "cnpj",
				editable : false,
				sortable : true,
				label 	 : "CNPJ",
				cell 	 : "string",
			}, 
			{
				name : "phoneNumber",
				editable : false,
				sortable : true,
				label 	 : "Telefone",
				cell 	 : "string",
			}, 
			{
				name : "corporateName",
				editable : false,
				sortable : true,
				label 	 : "Razão Social",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalLogo'); 
			util.clear('inputModalName'); 
			util.clear('inputModalCnpj'); 
			util.clear('inputModalPhoneNumber'); 
			util.clear('inputModalCorporateName'); 
			util.scrollUpModal();
		},

		searchClient : function() {
			this.clientCollection.filterQueryParams = {
	    		logo : util.escapeById('inputModalLogo'),
	    		name : util.escapeById('inputModalName'),
	    		cnpj : util.escapeById('inputModalCnpj'),
	    		phoneNumber : util.escapeById('inputModalPhoneNumber'),
	    		corporateName : util.escapeById('inputModalCorporateName'),
			};

			this.clientCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});
		},

		hidePage : function() {
			this.ui.modalScreen.modal('hide');
		},

		showPage : function() {
			this.clearModal();

			this.ui.modalScreen.modal('show');
			this.clientCollection.getFirstPage({
				success : function(_col, _resp, _opts) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				}
			});
		},

		clearModal : function() {
			this.clearFields();
			this.ui.form.get(0).reset();
			this.clientCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinClient');
		},
	});

	return ClientModal;
});
