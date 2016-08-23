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

	var ModalMultiSelectQuestaoDesafio = require('views/questaoDesafio/ModalMultiSelectQuestaoDesafio');
	var MultiSelectQuestaoDesafioTemplate = require('text!views/questaoDesafio/tpl/MultiSelectQuestaoDesafioTemplate.html');

	var MultiSelectQuestaoDesafio = Marionette.LayoutView.extend({
		template : _.template(MultiSelectQuestaoDesafioTemplate),

		regions : {
			modalMultiSelectQuestaoDesafioRegion : '#modalMultiSelectQuestaoDesafios',
			gridQuestaoDesafiosModalRegion : '#gridMultiselectQuestaoDesafios',
		},

		initialize : function() {
			var that = this;

			this.questaoDesafios = this.collection;

			this.gridQuestaoDesafios = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.questaoDesafios,
			});

			this.modalMultiSelectQuestaoDesafio = new ModalMultiSelectQuestaoDesafio({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectQuestaoDesafioRegion.show(that.modalMultiSelectQuestaoDesafio);
				that.gridQuestaoDesafiosModalRegion.show(that.gridQuestaoDesafios);
			});
		},
		clear : function(){
			this.modalMultiSelectQuestaoDesafio.clear();
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

	return MultiSelectQuestaoDesafio
});
