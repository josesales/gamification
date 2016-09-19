/* generated: 23/08/2016 08:32:11 */
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

	var TemplateFormListas = require('text!views/lista/tpl/FormListaTemplate.html');
	var ListaModel = require('models/ListaModel');
	var ListaCollection = require('collections/ListaCollection');
	var SearchDisciplinaModal = require('views/modalComponents/DisciplinaModal');
	var QuestaoCollection = require('collections/QuestaoCollection');
	var MultiSelectQuestao = require('views/questao/MultiSelectQuestao');			
	var QuestaoDesafioCollection = require('collections/QuestaoDesafioCollection');
	var MultiSelectQuestaoDesafio = require('views/questaoDesafio/MultiSelectQuestaoDesafio');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormListas = Marionette.LayoutView.extend({
		template : _.template(TemplateFormListas),

		regions : {
			questaosRegion : ".questaos-container",
			questaoDesafiosRegion : ".questaoDesafios-container",
			searchDisciplinaModalRegion : '#disciplinaModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchDisciplinaModal' : '_showSearchDisciplinaModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputQuestaoAtual : '#inputQuestaoAtual',
		
			inputDisciplinaId : '#inputDisciplinaId',
			inputDisciplinaNome : '#inputDisciplinaNome',
			form : '#formLista',
		},

		initialize : function() {
			var that = this;
			that.questaos = new QuestaoCollection();
			that.questaos.add(this.model.get('questaos'));
			this.multiSelectQuestao = new MultiSelectQuestao({
				collection : that.questaos,
			});
			that.questaoDesafios = new QuestaoDesafioCollection();
			that.questaoDesafios.add(this.model.get('questaoDesafios'));
			this.multiSelectQuestaoDesafio = new MultiSelectQuestaoDesafio({
				collection : that.questaoDesafios,
			});
			this.searchDisciplinaModal = new SearchDisciplinaModal({
				onSelectModel : function(model) {
					that._selectDisciplina(model);
				},
			});
			this.on('show', function() {
				this.searchDisciplinaModalRegion.show(this.searchDisciplinaModal);		
				this.questaosRegion.show(this.multiSelectQuestao);
				this.questaoDesafiosRegion.show(this.multiSelectQuestaoDesafio);
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
			var lista = that._getModel();

			if (this._isValid()) {
				lista.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Lista salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/listas');
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
			util.clear('inputQuestaoAtual');
			util.clear('inputNome'); 
			this.questaos.reset();
			this.multiSelectQuestao.clear();
			this.questaoDesafios.reset();
			this.multiSelectQuestaoDesafio.clear();
			util.clear('inputDisciplinaId');
			util.clear('inputDisciplinaNome');
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
			var lista = that.model; 
			lista.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
		    	questaoAtual: util.escapeById('inputQuestaoAtual') || null,
				questaos : that.questaos.toJSON(),
				questaoDesafios : that.questaoDesafios.toJSON(),
				disciplina : that._getDisciplina(),
			});
			return lista;
		},
		 
		_getDisciplina : function() {			
			var id = util.escapeById('inputDisciplinaId');
			var nome = util.escapeById('inputDisciplinaNome');
			var disciplina = null;
			
			if (id && nome) {
				disciplina = {
					id : id,
					nome : nome,
				}
			}
			return disciplina;
		},	
		
		_showSearchDisciplinaModal : function() {
			this.searchDisciplinaModal.showPage();
		},
			
		_selectDisciplina : function(disciplina) {
			this.searchDisciplinaModal.hidePage();	
			this.ui.inputDisciplinaId.val(disciplina.get('id'));
			this.ui.inputDisciplinaNome.val(disciplina.get('nome'));		
		},
				
		
	});

	return FormListas;
});