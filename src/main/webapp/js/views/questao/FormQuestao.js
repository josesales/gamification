/* generated: 23/08/2016 08:32:12 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');

	var TemplateFormQuestaos = require('text!views/questao/tpl/FormQuestaoTemplate.html');
	var QuestaoModel = require('models/QuestaoModel');
	var QuestaoCollection = require('collections/QuestaoCollection');
	var SearchListaModal = require('views/modalComponents/ListaModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormQuestaos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormQuestaos),

		regions : {
			searchListaModalRegion : '#listaModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchListaModal' : '_showSearchListaModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputPergunta : '#inputPergunta',
			inputItemA : '#inputItemA',
			inputItemB : '#inputItemB',
			inputItemC : '#inputItemC',
			inputItemD : '#inputItemD',
			inputItemCorreto : '#inputItemCorreto',
			inputPontos : '#inputPontos',
		
			inputListaId : '#inputListaId',
			inputListaNome : '#inputListaNome',
			form : '#formQuestao',
		},

		initialize : function() {
			var that = this;
			this.searchListaModal = new SearchListaModal({
				onSelectModel : function(model) {
					that._selectLista(model);
				},
			});
			this.on('show', function() {
				this.searchListaModalRegion.show(this.searchListaModal);		
				this.ui.inputPontos.formatNumber(2);
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var questao = that._getModel();

			if (this._isValid()) {
				if(this._validarItemCorreto()) {
					
					questao = that._getModel();
					questao.save({}, {
						success : function(_model, _resp, _options) {
							util.showSuccessMessage('Questao salvo com sucesso!');
							that.clearForm();
	
							if (continua != true) {
								util.goPage('app/questaos');
							}
						},
	
						error : function(_model, _resp, _options) {
							util.showErrorMessage('Problema ao salvar registro',_resp);
						}
					});
					
				}else {
					util.showMessage('error', 'Para o campo item correto digite apenas o caracter correspondente ao item a, b, c ou d');
				}
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		_validarItemCorreto : function() {
			var retorno = false;
			var itemCorreto = this.ui.inputItemCorreto.val();
			if(itemCorreto) {
				itemCorreto = itemCorreto.toLowerCase();
				if(itemCorreto == 'a' || itemCorreto == 'b' || itemCorreto == 'c' || itemCorreto == 'd') {
					this.ui.inputItemCorreto.val(itemCorreto);
					retorno = true;
				}
			}
			
			return retorno;
		},
		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputPergunta'); 
			util.clear('inputItemA'); 
			util.clear('inputItemB'); 
			util.clear('inputItemC'); 
			util.clear('inputItemD'); 
			util.clear('inputItemCorreto'); 
			util.clear('inputPontos'); 
			util.clear('inputListaId');
			util.clear('inputListaNome');
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var questao = that.model; 
			questao.set({
				id: util.escapeById('inputId') || null,
		    	pergunta : util.escapeById('inputPergunta'), 
				
		    	itemA : util.escapeById('inputItemA'), 
				
		    	itemB : util.escapeById('inputItemB'), 
				
		    	itemC : util.escapeById('inputItemC'), 
				
		    	itemD : util.escapeById('inputItemD'), 
				
		    	itemCorreto : util.escapeById('inputItemCorreto'), 
				
		    	pontos : util.escapeById('inputPontos', true), 
				
					lista : that._getLista(),
			});
			return questao;
		},
		 
		_getLista : function() {			
			var id = util.escapeById('inputListaId');
			var nome = util.escapeById('inputListaNome');
			var lista = null;
			
			if (id && nome) {
				lista = {
					id : id,
					nome : nome,
				}
			}
			return lista;
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

	return FormQuestaos;
});