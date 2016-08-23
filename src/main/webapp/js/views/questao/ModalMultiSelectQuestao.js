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
	var QuestaoPageCollection = require('collections/QuestaoPageCollection');
	var ModalMultiSelectQuestaoTemplate = require('text!views/questao/tpl/ModalMultiSelectQuestaoTemplate.html');
	// End of "Import´s" definition

	var ModalQuestaos = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectQuestaoTemplate),

		regions : {
			gridRegion : '#grid-questaos-modal',
			paginatorRegion : '#paginator-questaos-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoQuestaos = this.collection;
			
			this.questaos = new QuestaoPageCollection();
			this.questaos.on('fetched', this.endFetch, this);
			this.questaos.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.questaos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.questaos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.questaos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid questao');
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
				this.projetoQuestaos.add(model)
			else
				this.projetoQuestaos.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.questaos.each(function(model) {
				if (that.projetoQuestaos.findWhere({
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
				name : "pergunta",
				editable : false,
				sortable : false,
				label 	 : "Pergunta",
				cell 	 : "string",
			}, 
			{
				name : "itemA",
				editable : false,
				sortable : false,
				label 	 : "Item_a",
				cell 	 : "string",
			}, 
			{
				name : "itemB",
				editable : false,
				sortable : false,
				label 	 : "Item_b",
				cell 	 : "string",
			}, 
			{
				name : "itemC",
				editable : false,
				sortable : false,
				label 	 : "Item_c",
				cell 	 : "string",
			}, 
			{
				name : "itemD",
				editable : false,
				sortable : false,
				label 	 : "Item_d",
				cell 	 : "string",
			}, 
			{
				name : "itemCorreto",
				editable : false,
				sortable : false,
				label 	 : "Item correto",
				cell 	 : "string",
			}, 
			{
				name : "pontos",
				editable : false,
				sortable : false,
				label 	 : "Pontos",
				cell : CustomNumberCell.extend({}),
			}, 
			];
			return columns;
		},
	});

	return ModalQuestaos;
});
