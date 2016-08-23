/* generated: 23/08/2016 08:32:11 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var CustomStringCell = require('views/components/CustomStringCell');
	var Counter = require('views/components/Counter');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');

	var TemplateFormAlunos = require('text!views/aluno/tpl/FormAlunoTemplate.html');
	var AlunoModel = require('models/AlunoModel');
	var AlunoCollection = require('collections/AlunoCollection');
	var AlunoPageCollection = require('collections/AlunoPageCollection');
	var PageAlunoTemplate = require('text!views/aluno/tpl/PageAlunoTemplate.html');
	
	//Filter import
	var SearchUsuarioModal = require('views/modalComponents/UserModal');
	
	// End of "Import´s" definition

	var PageAluno = Marionette.LayoutView.extend({
		template : _.template(PageAlunoTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchUsuarioModalRegion : '#usuarioModal',
		},
		
		events : {
			'click 	#query' : '_queryAluno',			
			'click 	#reset' : '_resetAluno',			
			'click #searchUsuarioModal' : '_showSearchUsuarioModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputNome : '#inputNome',
		
			inputUsuarioId : '#inputUsuarioId',
			inputUsuarioNome : '#inputUsuarioNome',
			form : '#formAlunoFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryAluno();
	    	}
		},

		initialize : function() {
			var that = this;

			this.alunos = new AlunoPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.alunos
			});

			this.counter = new Counter({
				collection : this.alunos,
			});

			this.paginator = new Backgrid.Extension.Paginator({
				columns : this._getColumns(),
				collection : this.alunos,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.alunos.getFirstPage({
				success : function(_col, _resp, _opts) {
					console.info('Primeira pagina do grid aluno');
				},
				error : function(_col, _resp, _opts) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchUsuarioModal = new SearchUsuarioModal({
				onSelectModel : function(model) {
					that._selectUsuario(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchUsuarioModalRegion.show(this.searchUsuarioModal);		
		
			});
		},
		 
		_queryAluno : function(){
			var that = this;

			this.alunos.filterQueryParams = {
	    		nome : util.escapeById('inputNome'),
			    usuario : util.escapeById('inputUsuarioId'), 
			}
			this.alunos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid aluno');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetAluno : function(){
			this.ui.form.get(0).reset();
			this.alunos.reset();
			util.clear('inputUsuarioId');
		},
				
		_getColumns : function() {
			var columns = [
			//{
			//	name : "id",
			//	label : "id",
			//	editable : false,
			//	cell : Backgrid.IntegerCell.extend({
			//		orderSeparator : ''
			//	})
			//}, 
			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "usuario.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Usuario",
				cell : CustomStringCell.extend({
					fieldName : 'usuario.nome',
				}),
			},	
			{
				name : "acoes",
				label : "Ações(Editar, Deletar)",
				sortable : false,
				cell : ActionsCell.extend({
					editPath : this._getEditPath,
					deletePath : this._getDeletePath,
					editModel : this._editModel,
					deleteModel : this._deleteModel
				})
			} ];
			return columns;
		},

		_deleteModel : function(model) {
			util.Bootbox.confirm("Tem certeza que deseja remover o registro [ " + model.get('id') + "] ?", function(yes) {
				if (yes) {
					model.destroy({
						success : function() {
							util.showSuccessMessage('Aluno removido com sucesso!');
						},
						error : function(_model, _resp) {
							util.showErrorMessage('Problema ao salvar registro',_resp);
						}
					});
				}
			});
		},

		_getDeletePath : function(model) {
			// alert('Delete,,, ' + JSON.stringify(model));
		},

		_getEditPath : function(model) {
			return "app/editAluno/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchUsuarioModal : function() {
			this.searchUsuarioModal.showPage();
		},
			
		_selectUsuario : function(usuario) {
			this.searchUsuarioModal.hidePage();	
			this.ui.inputUsuarioId.val(usuario.get('id'));
			this.ui.inputUsuarioNome.val(usuario.get('nome'));		
		},
		

	});

	return PageAluno;
});
