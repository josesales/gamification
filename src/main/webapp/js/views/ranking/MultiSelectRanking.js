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

	var ModalMultiSelectRanking = require('views/ranking/ModalMultiSelectRanking');
	var MultiSelectRankingTemplate = require('text!views/ranking/tpl/MultiSelectRankingTemplate.html');

	var MultiSelectRanking = Marionette.LayoutView.extend({
		template : _.template(MultiSelectRankingTemplate),

		regions : {
			modalMultiSelectRankingRegion : '#modalMultiSelectRankings',
			gridRankingsModalRegion : '#gridMultiselectRankings',
		},

		initialize : function() {
			var that = this;

			this.rankings = this.collection;

			this.gridRankings = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.rankings,
			});

			this.modalMultiSelectRanking = new ModalMultiSelectRanking({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectRankingRegion.show(that.modalMultiSelectRanking);
				that.gridRankingsModalRegion.show(that.gridRankings);
			});
		},
		clear : function(){
			this.modalMultiSelectRanking.clear();
		},
		
		_getColumns : function() {
			var columns = [

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

	return MultiSelectRanking
});
