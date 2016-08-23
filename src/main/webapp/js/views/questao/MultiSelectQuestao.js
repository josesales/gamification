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

	var ModalMultiSelectQuestao = require('views/questao/ModalMultiSelectQuestao');
	var MultiSelectQuestaoTemplate = require('text!views/questao/tpl/MultiSelectQuestaoTemplate.html');

	var MultiSelectQuestao = Marionette.LayoutView.extend({
		template : _.template(MultiSelectQuestaoTemplate),

		regions : {
			modalMultiSelectQuestaoRegion : '#modalMultiSelectQuestaos',
			gridQuestaosModalRegion : '#gridMultiselectQuestaos',
		},

		initialize : function() {
			var that = this;

			this.questaos = this.collection;

			this.gridQuestaos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.questaos,
			});

			this.modalMultiSelectQuestao = new ModalMultiSelectQuestao({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectQuestaoRegion.show(that.modalMultiSelectQuestao);
				that.gridQuestaosModalRegion.show(that.gridQuestaos);
			});
		},
		clear : function(){
			this.modalMultiSelectQuestao.clear();
		},
		
		_getColumns : function() {
			var columns = [

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

	return MultiSelectQuestao
});
