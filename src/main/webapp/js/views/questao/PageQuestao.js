/* generated: 23/08/2016 08:32:12 */
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

	var TemplateFormQuestaos = require('text!views/questao/tpl/FormQuestaoTemplate.html');
	var QuestaoModel = require('models/QuestaoModel');
	var QuestaoCollection = require('collections/QuestaoCollection');
	var QuestaoPageCollection = require('collections/QuestaoPageCollection');
	var PageQuestaoTemplate = require('text!views/questao/tpl/PageQuestaoTemplate.html');
	
	//Filter import
	var SearchListaModal = require('views/modalComponents/ListaModal');
	
	// End of "Import´s" definition

	var PageQuestao = Marionette.LayoutView.extend({
		template : _.template(PageQuestaoTemplate),

		regions : {
			gridRegion : '#grid',
			counterRegion : '#counter',
			paginatorRegion : '#paginator',
			searchListaModalRegion : '#listaModal',
		},
		
		events : {
			'click 	#query' : '_queryQuestao',			
			'click 	#reset' : '_resetQuestao',			
			'click #searchListaModal' : '_showSearchListaModal',
			'keypress' : 'treatKeypress',
		},
		
		
		ui : {
			inputPergunta : '#inputPergunta',
			inputItemA : '#inputItemA',
			inputItemB : '#inputItemB',
			inputItemC : '#inputItemC',
			inputItemD : '#inputItemD',
			inputItemCorreto : '#inputItemCorreto',
			inputPontos : '#inputPontos',
		
			inputListaId : '#inputListaId',
			inputListaNome : '#inputListaNome',
			form : '#formQuestaoFilter',
		},
		
		treatKeypress : function (e){
		    if (util.enterPressed(e)) {
	    		e.preventDefault();
	    		this._queryQuestao();
	    	}
		},

		initialize : function() {
			var that = this;

			this.questaos = new QuestaoPageCollection();

			this.grid = new Backgrid.Grid({
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getColumns(),
				emptyText : "Sem registros",
				collection : this.questaos
			});

			this.counter = new Counter({
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
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')) );
				}
			});
			this.searchListaModal = new SearchListaModal({
				onSelectModel : function(model) {
					that._selectLista(model);
				},
			});
			this.on('show', function() {
				that.gridRegion.show(that.grid);
				that.counterRegion.show(that.counter);
				that.paginatorRegion.show(that.paginator);
				this.searchListaModalRegion.show(this.searchListaModal);		
				this.ui.inputPontos.formatNumber(2);
		
			});
		},
		 
		_queryQuestao : function(){
			var that = this;

			this.questaos.filterQueryParams = {
	    		pergunta : util.escapeById('inputPergunta'),
	    		itemA : util.escapeById('inputItemA'),
	    		itemB : util.escapeById('inputItemB'),
	    		itemC : util.escapeById('inputItemC'),
	    		itemD : util.escapeById('inputItemD'),
	    		itemCorreto : util.escapeById('inputItemCorreto'),
	    		pontos : util.escapeById('inputPontos'),
			    lista : util.escapeById('inputListaId'), 
			}
			this.questaos.fetch({
				success : function(_coll, _resp, _opt) {
					console.info('Consulta para o grid questao');
				},
				error : function(_coll, _resp, _opt) {
					console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
				},
				complete : function() {
					
				},
			})		
		},
		_resetQuestao : function(){
			this.ui.form.get(0).reset();
			this.questaos.reset();
			util.clear('inputListaId');
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
				name : "lista.nome",
				editable : false,
				sortable : true,  //já é possivel ordenar por esses atributos compostos.
				label : "Lista",
				cell : CustomStringCell.extend({
					fieldName : 'lista.nome',
				}),
			},
			{
				name : "pergunta",
				editable : false,
				sortable : true,
				label 	 : "Pergunta",
				cell 	 : "string",
			}, 
			{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell : CustomNumberCell.extend({}),
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
							util.showSuccessMessage('Questao removido com sucesso!');
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
			return "app/editQuestao/" + model.get('id');
		},

		_editModel : function(model) {

		},
		_showSearchListaModal : function() {
			this.searchListaModal.showPage();
		},
			
		_selectLista : function(lista) {
			this.searchListaModal.hidePage();	
			this.ui.inputListaId.val(lista.get('id'));
			this.ui.inputListaNome.val(lista.get('nome'));		
		},
		

	});

	return PageQuestao;
});
