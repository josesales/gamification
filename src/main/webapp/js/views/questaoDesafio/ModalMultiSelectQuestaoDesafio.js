/* generated: 23/08/2016 08:32:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Marionette = require('marionette');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var util = require('utilities/utils');
	var QuestaoDesafioPageCollection = require('collections/QuestaoDesafioPageCollection');
	var ModalMultiSelectQuestaoDesafioTemplate = require('text!views/questaoDesafio/tpl/ModalMultiSelectQuestaoDesafioTemplate.html');
	// End of "Import´s" definition

	var ModalQuestaoDesafios = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectQuestaoDesafioTemplate),

		regions : {
			gridRegion : '#grid-questaoDesafios-modal',
			paginatorRegion : '#paginator-questaoDesafios-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoQuestaoDesafios = this.collection;
			
			this.questaoDesafios = new QuestaoDesafioPageCollection();
			this.questaoDesafios.on('fetched', this.endFetch, this);
			this.questaoDesafios.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.questaoDesafios,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.questaoDesafios,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.questaoDesafios.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid questaoDesafio');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || _resp.getResponseHeader('exception'));
				}
			});


			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.paginatorRegion.show(that.paginator);
			});
		},

		selectModel : function(model, checked) {
			if (checked)
				this.projetoQuestaoDesafios.add(model)
			else
				this.projetoQuestaoDesafios.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.questaoDesafios.each(function(model) {
				if (that.projetoQuestaoDesafios.findWhere({
					id : model.get('id')
				})) {
					model.trigger("backgrid:select", model, true);
				}
			});
		},
		clear : function(){
			this.grid.$el.find('input[type=checkbox]').prop('checked', false);
		},
		_getColumns : function() {
			var columns = [{
				name : "",
				cell : "select-row",
				headerCell : "select-all"
			}, 
			 
			{
				name : "pontos",
				editable : false,
				sortable : false,
				label 	 : "Pontos",
				cell : CustomNumberCell.extend({}),
			}, 
			{
				name : "pergunta",
				editable : false,
				sortable : false,
				label 	 : "Pergunta",
				cell 	 : "string",
			}, 
			{
				name : "resposta",
				editable : false,
				sortable : false,
				label 	 : "Resposta",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return ModalQuestaoDesafios;
});
