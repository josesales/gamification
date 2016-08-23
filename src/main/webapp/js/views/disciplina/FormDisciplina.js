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

	var TemplateFormDisciplinas = require('text!views/disciplina/tpl/FormDisciplinaTemplate.html');
	var DisciplinaModel = require('models/DisciplinaModel');
	var DisciplinaCollection = require('collections/DisciplinaCollection');
	var SearchProfessorModal = require('views/modalComponents/ProfessorModal');
	var AlunoCollection = require('collections/AlunoCollection');
	var MultiSelectAluno = require('views/aluno/MultiSelectAluno');			
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormDisciplinas = Marionette.LayoutView.extend({
		template : _.template(TemplateFormDisciplinas),

		regions : {
			alunosRegion : ".alunos-container",
			searchProfessorModalRegion : '#professorModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchProfessorModal' : '_showSearchProfessorModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			inputProfessorId : '#inputProfessorId',
			inputProfessorNome : '#inputProfessorNome',
			form : '#formDisciplina',
		},

		initialize : function() {
			var that = this;
			that.alunos = new AlunoCollection();
			that.alunos.add(this.model.get('alunos'));
			this.multiSelectAluno = new MultiSelectAluno({
				collection : that.alunos,
			});
			this.searchProfessorModal = new SearchProfessorModal({
				onSelectModel : function(model) {
					that._selectProfessor(model);
				},
			});
			this.on('show', function() {
				this.searchProfessorModalRegion.show(this.searchProfessorModal);		
				this.alunosRegion.show(this.multiSelectAluno);
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
			var disciplina = that._getModel();

			if (this._isValid()) {
				disciplina.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Disciplina salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/disciplinas');
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
			this.alunos.reset();
			this.multiSelectAluno.clear();
			util.clear('inputProfessorId');
			util.clear('inputProfessorNome');
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
			var disciplina = that.model; 
			disciplina.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
					alunos : that.alunos.toJSON(),
					professor : that._getProfessor(),
			});
			return disciplina;
		},
		 
		_getProfessor : function() {			
			var id = util.escapeById('inputProfessorId');
			var nome = util.escapeById('inputProfessorNome');
			var professor = null;
			
			if (id && nome) {
				professor = {
					id : id,
					nome : nome,
				}
			}
			return professor;
		},	
		
		_showSearchProfessorModal : function() {
			this.searchProfessorModal.showPage();
		},
			
		_selectProfessor : function(professor) {
			this.searchProfessorModal.hidePage();	
			this.ui.inputProfessorId.val(professor.get('id'));
			this.ui.inputProfessorNome.val(professor.get('nome'));		
		},
				
		
	});

	return FormDisciplinas;
});