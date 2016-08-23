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

	var TemplateFormRankings = require('text!views/ranking/tpl/FormRankingTemplate.html');
	var RankingModel = require('models/RankingModel');
	var RankingCollection = require('collections/RankingCollection');
	var SearchDisciplinaModal = require('views/modalComponents/DisciplinaModal');
	var SearchAlunoModal = require('views/modalComponents/AlunoModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormRankings = Marionette.LayoutView.extend({
		template : _.template(TemplateFormRankings),

		regions : {
			searchDisciplinaModalRegion : '#disciplinaModal',
			searchAlunoModalRegion : '#alunoModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchDisciplinaModal' : '_showSearchDisciplinaModal',
			'click #searchAlunoModal' : '_showSearchAlunoModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputPontos : '#inputPontos',
		
			inputDisciplinaId : '#inputDisciplinaId',
			inputDisciplinaNome : '#inputDisciplinaNome',
			inputAlunoId : '#inputAlunoId',
			inputAlunoNome : '#inputAlunoNome',
			form : '#formRanking',
		},

		initialize : function() {
			var that = this;
			this.searchDisciplinaModal = new SearchDisciplinaModal({
				onSelectModel : function(model) {
					that._selectDisciplina(model);
				},
			});
			this.searchAlunoModal = new SearchAlunoModal({
				onSelectModel : function(model) {
					that._selectAluno(model);
				},
			});
			this.on('show', function() {
				this.searchDisciplinaModalRegion.show(this.searchDisciplinaModal);		
				this.searchAlunoModalRegion.show(this.searchAlunoModal);		
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
			var ranking = that._getModel();

			if (this._isValid()) {
				ranking.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Ranking salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/rankings');
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
			util.clear('inputDisciplinaId');
			util.clear('inputDisciplinaNome');
			util.clear('inputAlunoId');
			util.clear('inputAlunoNome');
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
			var ranking = that.model; 
			ranking.set({
				id: util.escapeById('inputId') || null,
		    	pontos : util.escapeById('inputPontos', true), 
				
					disciplina : that._getDisciplina(),
					aluno : that._getAluno(),
			});
			return ranking;
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
		_getAluno : function() {			
			var id = util.escapeById('inputAlunoId');
			var nome = util.escapeById('inputAlunoNome');
			var aluno = null;
			
			if (id && nome) {
				aluno = {
					id : id,
					nome : nome,
				}
			}
			return aluno;
		},	
		
		_showSearchDisciplinaModal : function() {
			this.searchDisciplinaModal.showPage();
		},
			
		_selectDisciplina : function(disciplina) {
			this.searchDisciplinaModal.hidePage();	
			this.ui.inputDisciplinaId.val(disciplina.get('id'));
			this.ui.inputDisciplinaNome.val(disciplina.get('nome'));		
		},
		_showSearchAlunoModal : function() {
			this.searchAlunoModal.showPage();
		},
			
		_selectAluno : function(aluno) {
			this.searchAlunoModal.hidePage();	
			this.ui.inputAlunoId.val(aluno.get('id'));
			this.ui.inputAlunoNome.val(aluno.get('nome'));		
		},
				
		
	});

	return FormRankings;
});