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

	var ModalMultiSelectAluno = require('views/aluno/ModalMultiSelectAluno');
	var MultiSelectAlunoTemplate = require('text!views/aluno/tpl/MultiSelectAlunoTemplate.html');

	var MultiSelectAluno = Marionette.LayoutView.extend({
		template : _.template(MultiSelectAlunoTemplate),

		regions : {
			modalMultiSelectAlunoRegion : '#modalMultiSelectAlunos',
			gridAlunosModalRegion : '#gridMultiselectAlunos',
		},

		initialize : function() {
			var that = this;

			this.alunos = this.collection;

			this.gridAlunos = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros adicionados",
				collection : this.alunos,
			});

			this.modalMultiSelectAluno = new ModalMultiSelectAluno({
				collection : this.collection
			});

			this.on('show', function() {
				that.modalMultiSelectAlunoRegion.show(that.modalMultiSelectAluno);
				that.gridAlunosModalRegion.show(that.gridAlunos);
			});
		},
		clear : function(){
			this.modalMultiSelectAluno.clear();
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

	return MultiSelectAluno
});
