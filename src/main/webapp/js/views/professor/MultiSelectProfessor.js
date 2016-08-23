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

	var ModalMultiSelectProfessor = require('views/professor/ModalMultiSelectProfessor');
	var MultiSelectProfessorTemplate = require('text!views/professor/tpl/MultiSelectProfessorTemplate.html');

	var MultiSelectProfessor = Marionette.LayoutView.extend({
		template : _.template(MultiSelectProfessorTemplate),

		regions : {
			modalMultiSelectProfessorRegion : '#modalMultiSelectProfessors',
			gridProfessorsModalRegion : '#gridMultiselectProfessors',
		},

		initialize : function() {
			var that = this;

			this.professors = this.collection;

			this.gridProfessors = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.professors,
			});

			this.modalMultiSelectProfessor = new ModalMultiSelectProfessor({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectProfessorRegion.show(that.modalMultiSelectProfessor);
				that.gridProfessorsModalRegion.show(that.gridProfessors);
			});
		},
		clear : function(){
			this.modalMultiSelectProfessor.clear();
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

	return MultiSelectProfessor
});
