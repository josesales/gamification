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

	var TemplateFormAlunos = require('text!views/aluno/tpl/FormAlunoTemplate.html');
	var AlunoModel = require('models/AlunoModel');
	var AlunoCollection = require('collections/AlunoCollection');
	var SearchUsuarioModal = require('views/modalComponents/UserModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormAlunos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormAlunos),

		regions : {
			searchUsuarioModalRegion : '#usuarioModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchUsuarioModal' : '_showSearchUsuarioModal',
			'click 	#linkPerfilAluno' : 'exibirPerfilAluno',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			inputUsuarioId : '#inputUsuarioId',
			inputUsuarioNome : '#inputUsuarioNome',
			inputNome : '#inputNome',
			inputLevel : '#inputLevel',
			inputPontos : '#inputPontos',
			inputProximoLevel : '#inputProximoLevel',
			form : '#formAluno',
		},

		initialize : function() {
			var that = this;
			this.searchUsuarioModal = new SearchUsuarioModal({
				onSelectModel : function(model) {
					that._selectUsuario(model);
				},
			});
			this.on('show', function() {
				this.searchUsuarioModalRegion.show(this.searchUsuarioModal);		
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},
		
		exibirPerfilAluno : function() {
			util.openNewWindow("#app/perfilAluno/" + this.ui.inputId.val());
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var aluno = that._getModel();

			if (this._isValid()) {
				aluno.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Aluno salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/alunos');
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
			var aluno = that.model; 
			aluno.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				usuario : that._getUsuario(),
				pontos : util.escapeById('inputNome'), 
				level : util.escapeById('inputLevel'), 
				pontos : util.escapeById('inputPontos'), 
				proximoLevel : util.escapeById('inputProximoLevel'),
			});
			return aluno;
		},
		 
		_getUsuario : function() {			
			var id = util.escapeById('inputUsuarioId');
			var nome = util.escapeById('inputUsuarioNome');
			var usuario = null;
			
			if (id && nome) {
				usuario = {
					id : id,
					name : nome,
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
			this.ui.inputUsuarioNome.val(usuario.get('name'));		
		},
				
		
	});

	return FormAlunos;
});