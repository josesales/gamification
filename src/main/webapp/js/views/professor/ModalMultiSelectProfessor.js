/* generated: 23/08/2016 08:32:11 */
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
	var ProfessorPageCollection = require('collections/ProfessorPageCollection');
	var ModalMultiSelectProfessorTemplate = require('text!views/professor/tpl/ModalMultiSelectProfessorTemplate.html');
	// End of "Import´s" definition

	var ModalProfessors = Marionette.LayoutView.extend({
		template : _.template(ModalMultiSelectProfessorTemplate),

		regions : {
			gridRegion : '#grid-professors-modal',
			paginatorRegion : '#paginator-professors-modal',
		},
		events : {
			'click .btnOk' : 'close'
		},
		ui : {
			btnOk : ".btnOk",
		},

		initialize : function(opt) {
			var that = this;

			this.projetoProfessors = this.collection;
			
			this.professors = new ProfessorPageCollection();
			this.professors.on('fetched', this.endFetch, this);
			this.professors.on('backgrid:selected', this.selectModel, this);

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Nenhum registro para escolha",
				collection : this.professors,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.professors,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.professors.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid professor');
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
				this.projetoProfessors.add(model)
			else
				this.projetoProfessors.remove(model)
		},

		endFetch : function(_collection) {
			var that = this;
			this.professors.each(function(model) {
				if (that.projetoProfessors.findWhere({
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

	return ModalProfessors;
});
