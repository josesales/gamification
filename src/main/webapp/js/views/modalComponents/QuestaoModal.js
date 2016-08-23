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

	var QuestaoModal = require('text!views/modalComponents/tpl/QuestaoModalTemplate.html');
	var QuestaoPageCollection = require('collections/QuestaoPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var QuestaoModal = Marionette.LayoutView.extend({
		template : _.template(QuestaoModal),

		events : {
			'click #btnSearchQuestao' : 'searchQuestao',
			'click #btnClearQuestao' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-questao',
			gridRegion : 		'#grid-questao',
			paginatorRegion : 	'#paginator-questao',
		},

		ui : {
    		inputModalPergunta : '#inputModalPergunta',
    		inputModalItemA : '#inputModalItemA',
    		inputModalItemB : '#inputModalItemB',
    		inputModalItemC : '#inputModalItemC',
    		inputModalItemD : '#inputModalItemD',
    		inputModalItemCorreto : '#inputModalItemCorreto',
    		inputModalPontos : '#inputModalPontos',
		
			form : '#formSearchQuestao',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchQuestao();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.questaoCollection = new QuestaoPageCollection();
			this.questaoCollection.state.pageSize = 5;
			this.questaoCollection.on('fetching', this._startFetch, this);
			this.questaoCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.questaoCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.questaoCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.questaoCollection,
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
			var modelQuestao = util.getWrappedModel(e);
			if (modelQuestao)
				this.onSelectModel(modelQuestao);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "pergunta",
				editable : false,
				sortable : true,
				label 	 : "Pergunta",
				cell 	 : "string",
			}, 
			{
				name : "itemA",
				editable : false,
				sortable : true,
				label 	 : "Item_a",
				cell 	 : "string",
			}, 
			{
				name : "itemB",
				editable : false,
				sortable : true,
				label 	 : "Item_b",
				cell 	 : "string",
			}, 
			{
				name : "itemC",
				editable : false,
				sortable : true,
				label 	 : "Item_c",
				cell 	 : "string",
			}, 
			{
				name : "itemD",
				editable : false,
				sortable : true,
				label 	 : "Item_d",
				cell 	 : "string",
			}, 
			{
				name : "itemCorreto",
				editable : false,
				sortable : true,
				label 	 : "Item correto",
				cell 	 : "string",
			}, 
			{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell : CustomNumberCell.extend({}),
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalPergunta'); 
			util.clear('inputModalItemA'); 
			util.clear('inputModalItemB'); 
			util.clear('inputModalItemC'); 
			util.clear('inputModalItemD'); 
			util.clear('inputModalItemCorreto'); 
			util.clear('inputModalPontos'); 
			util.scrollUpModal();
		},

		searchQuestao : function() {
			this.questaoCollection.filterQueryParams = {
	    		pergunta : util.escapeById('inputModalPergunta'),
	    		itemA : util.escapeById('inputModalItemA'),
	    		itemB : util.escapeById('inputModalItemB'),
	    		itemC : util.escapeById('inputModalItemC'),
	    		itemD : util.escapeById('inputModalItemD'),
	    		itemCorreto : util.escapeById('inputModalItemCorreto'),
	    		pontos : util.escapeById('inputModalPontos'),
			};

			this.questaoCollection.fetch({
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
			this.questaoCollection.getFirstPage({
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
			this.questaoCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinQuestao');
		},
	});

	return QuestaoModal;
});
