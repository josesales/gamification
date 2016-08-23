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

	var TemplateFormQuestaoDesafios = require('text!views/questaoDesafio/tpl/FormQuestaoDesafioTemplate.html');
	var QuestaoDesafioModel = require('models/QuestaoDesafioModel');
	var QuestaoDesafioCollection = require('collections/QuestaoDesafioCollection');
	var SearchListaModal = require('views/modalComponents/ListaModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormQuestaoDesafios = Marionette.LayoutView.extend({
		template : _.template(TemplateFormQuestaoDesafios),

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
			inputPontos : '#inputPontos',
			inputPergunta : '#inputPergunta',
			inputResposta : '#inputResposta',
		
			inputListaId : '#inputListaId',
			inputListaNome : '#inputListaNome',
			form : '#formQuestaoDesafio',
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
			var questaoDesafio = that._getModel();

			if (this._isValid()) {
				questaoDesafio.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('QuestaoDesafio salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/questaoDesafios');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputPontos'); 
			util.clear('inputPergunta'); 
			util.clear('inputResposta'); 
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
			var questaoDesafio = that.model; 
			questaoDesafio.set({
				id: util.escapeById('inputId') || null,
		    	pontos : util.escapeById('inputPontos', true), 
				
		    	pergunta : util.escapeById('inputPergunta'), 
				
		    	resposta : util.escapeById('inputResposta'), 
				
					lista : that._getLista(),
			});
			return questaoDesafio;
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

	return FormQuestaoDesafios;
});