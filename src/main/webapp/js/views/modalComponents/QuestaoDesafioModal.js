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

	var QuestaoDesafioModal = require('text!views/modalComponents/tpl/QuestaoDesafioModalTemplate.html');
	var QuestaoDesafioPageCollection = require('collections/QuestaoDesafioPageCollection');

	// End of "Import´s" definition
	// #####################################################################################################
	// .............................................MAIN-BODY.............................................
	// #####################################################################################################

	var QuestaoDesafioModal = Marionette.LayoutView.extend({
		template : _.template(QuestaoDesafioModal),

		events : {
			'click #btnSearchQuestaoDesafio' : 'searchQuestaoDesafio',
			'click #btnClearQuestaoDesafio' : 'clearModal',
			'click tr' : 'selectRow',
			'keypress' : 'treatKeypress',
		},

		regions : {
			counterRegion : 	'#counter-questaoDesafio',
			gridRegion : 		'#grid-questaoDesafio',
			paginatorRegion : 	'#paginator-questaoDesafio',
		},

		ui : {
    		inputModalPontos : '#inputModalPontos',
    		inputModalPergunta : '#inputModalPergunta',
    		inputModalResposta : '#inputModalResposta',
		
			form : '#formSearchQuestaoDesafio',
			modalScreen : '.modal',
		},
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this.searchQuestaoDesafio();
	    	}
		},

		initialize : function(opt) {
			var that = this;

			this.onSelectModel = opt.onSelectModel;

			this.questaoDesafioCollection = new QuestaoDesafioPageCollection();
			this.questaoDesafioCollection.state.pageSize = 5;
			this.questaoDesafioCollection.on('fetching', this._startFetch, this);
			this.questaoDesafioCollection.on('fetched', this._stopFetch, this);

			this.grid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.questaoDesafioCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.counter = new Counter({
				collection : this.questaoDesafioCollection ,
			});
			

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.questaoDesafioCollection,
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
			var modelQuestaoDesafio = util.getWrappedModel(e);
			if (modelQuestaoDesafio)
				this.onSelectModel(modelQuestaoDesafio);
		},
		
		_getColumns : function() {
			var columns = [	

			{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pergunta",
				editable : false,
				sortable : true,
				label 	 : "Pergunta",
				cell 	 : "string",
			}, 
			{
				name : "resposta",
				editable : false,
				sortable : true,
				label 	 : "Resposta",
				cell 	 : "string",
			}, 
			];
			return columns;
		},

		clearFields : function() {
			util.clear('inputModalId');
			util.clear('inputModalPontos'); 
			util.clear('inputModalPergunta'); 
			util.clear('inputModalResposta'); 
			util.scrollUpModal();
		},

		searchQuestaoDesafio : function() {
			this.questaoDesafioCollection.filterQueryParams = {
	    		pontos : util.escapeById('inputModalPontos'),
	    		pergunta : util.escapeById('inputModalPergunta'),
	    		resposta : util.escapeById('inputModalResposta'),
			};

			this.questaoDesafioCollection.fetch({
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
			this.questaoDesafioCollection.getFirstPage({
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
			this.questaoDesafioCollection.reset();
		},
		
		// Executada depois da consulta concluida.
		_stopFetch : function() {
			util.stopSpinner();
			util.scrollDownModal();
		},
		
		// Executada Antes da realização da consulta.
		_startFetch : function() {
			util.showSpinner('spinQuestaoDesafio');
		},
	});

	return QuestaoDesafioModal;
});
