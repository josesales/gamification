/* generated: 23/08/2016 08:32:11 */
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

	var ModalMultiSelectDisciplina = require('views/disciplina/ModalMultiSelectDisciplina');
	var MultiSelectDisciplinaTemplate = require('text!views/disciplina/tpl/MultiSelectDisciplinaTemplate.html');

	var MultiSelectDisciplina = Marionette.LayoutView.extend({
		template : _.template(MultiSelectDisciplinaTemplate),

		regions : {
			modalMultiSelectDisciplinaRegion : '#modalMultiSelectDisciplinas',
			gridDisciplinasModalRegion : '#gridMultiselectDisciplinas',
		},

		initialize : function() {
			var that = this;

			this.disciplinas = this.collection;

			this.gridDisciplinas = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.disciplinas,
			});

			this.modalMultiSelectDisciplina = new ModalMultiSelectDisciplina({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectDisciplinaRegion.show(that.modalMultiSelectDisciplina);
				that.gridDisciplinasModalRegion.show(that.gridDisciplinas);
			});
		},
		clear : function(){
			this.modalMultiSelectDisciplina.clear();
		},
		
		_getColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : false,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			];
			return columns;
		},
	});

	return MultiSelectDisciplina
});
