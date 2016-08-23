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
	var RankingPageCollection = require('collections/RankingPageCollection');
	var ModalMultiSelectRankingTemplate = require('text!views/ranking/tpl/ModalMultiSelectRankingTemplate.html');
	// End of "Import´s" definition

	var ModalRankings = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectRankingTemplate),

		regions : {
			gridRegion : '#grid-rankings-modal',
			paginatorRegion : '#paginator-rankings-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoRankings = this.collection;
			
			this.rankings = new RankingPageCollection();
			this.rankings.on('fetched', this.endFetch, this);
			this.rankings.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.rankings,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.rankings,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.rankings.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid ranking');
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
				this.projetoRankings.add(model)
			else
				this.projetoRankings.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.rankings.each(function(model) {
				if (that.projetoRankings.findWhere({
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
			];
			return columns;
		},
	});

	return ModalRankings;
});
