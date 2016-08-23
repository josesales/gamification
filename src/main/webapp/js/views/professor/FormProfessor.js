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

	var TemplateFormProfessors = require('text!views/professor/tpl/FormProfessorTemplate.html');
	var ProfessorModel = require('models/ProfessorModel');
	var ProfessorCollection = require('collections/ProfessorCollection');
	var SearchUsuarioModal = require('views/modalComponents/UserModal');
	var DisciplinaCollection = require('collections/DisciplinaCollection');
	var MultiSelectDisciplina = require('views/disciplina/MultiSelectDisciplina');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormProfessors = Marionette.LayoutView.extend({
		template : _.template(TemplateFormProfessors),

		regions : {
			disciplinasRegion : ".disciplinas-container",
			searchUsuarioModalRegion : '#usuarioModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchUsuarioModal' : '_showSearchUsuarioModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			inputUsuarioId : '#inputUsuarioId',
			inputUsuarioNome : '#inputUsuarioNome',
			form : '#formProfessor',
		},

		initialize : function() {
			var that = this;
			that.disciplinas = new DisciplinaCollection();
			that.disciplinas.add(this.model.get('disciplinas'));
			this.multiSelectDisciplina = new MultiSelectDisciplina({
				collection : that.disciplinas,
			});
			this.searchUsuarioModal = new SearchUsuarioModal({
				onSelectModel : function(model) {
					that._selectUsuario(model);
				},
			});
			this.on('show', function() {
				this.searchUsuarioModalRegion.show(this.searchUsuarioModal);		
				this.disciplinasRegion.show(this.multiSelectDisciplina);
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
			var professor = that._getModel();

			if (this._isValid()) {
				professor.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Professor salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/professors');
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
			util.clear('inputNome'); 
			this.disciplinas.reset();
			this.multiSelectDisciplina.clear();
			util.clear('inputUsuarioId');
			util.clear('inputUsuarioNome');
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
			var professor = that.model; 
			professor.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
					disciplinas : that.disciplinas.toJSON(),
					usuario : that._getUsuario(),
			});
			return professor;
		},
		 
		_getUsuario : function() {			
			var id = util.escapeById('inputUsuarioId');
			var nome = util.escapeById('inputUsuarioNome');
			var usuario = null;
			
			if (id && nome) {
				usuario = {
					id : id,
					nome : nome,
				}
			}
			return usuario;
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

	return FormProfessors;
});