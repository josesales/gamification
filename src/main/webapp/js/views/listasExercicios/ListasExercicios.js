/* generated: 18/09/2015 09:02:56 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var Counter = require('views/components/Counter');
	var RowClick = require('views/components/CustomClickedRow');
	var util = require('utilities/utils');
	var ActionsCell = require('views/components/ActionsCell');
	var CustomStringCell = require('views/components/CustomStringCell');
	var CustomNumberCell = require('views/components/CustomNumberCell');
	var GeneralActionsCell = require('views/components/GeneralActionsCell');

	var ListasExerciciosTemplate = require('text!views/listasExercicios/tpl/ListasExerciciosTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var DisciplinaModel = require('models/DisciplinaModel');
	var AlunoModel = require('models/AlunoModel');
	var RankingPageCollection = require('collections/RankingPageCollection');

	var ListasExercicios = Marionette.LayoutView.extend({
		template : _.template(ListasExerciciosTemplate),

		regions : {
			rankingCounterRegion : '#counter_ranking',
			rankingGridRegion : '#grid_ranking',
			rankingPaginatorRegion : '#paginator_ranking',
//			disciplinaNaoCadastradaCounterRegion : '#counter_disciplina_nao_cadastrada',
//			disciplinaNaoCadastradaGridRegion : '#grid_disciplina_nao_cadastrada',
//			disciplinaNaoCadastradaPaginatorRegion : '#paginator_disciplina_nao_cadastrada',
		},

		events : {
		// 'click #botao' : 'chamaUrl'

		},

		// chamaUrl : function() {
		//
		// },
		ui : {
			nomeAluno : '#nomeAluno',
			xp : '#xp',
			level : '#level',
			barraProximoLevel : '#barraProximoLevel',
		// horaAtual : '#horaAtual',
		// mensagemExibida : '#mensagemExibida',
		// imgLogoGestor : '#imgLogoGestor',
		},

		initialize : function(opt) {
			var that = this;
			this.aluno = new AlunoModel();
			this.aluno.urlRoot = 'rs/crud/alunos/' + opt.idAluno;
			
			this.disciplina = new DisciplinaModel();
			this.aluno.urlRoot = 'rs/crud/disciplinas/' + opt.idDisciplina;

			this.rankingCollection = new RankingPageCollection();
			this.rankingCollection.state.pageSize = 5;
			this.rankingCollection.on('fetching', this._startFetch, this);
			this.rankingCollection.on('fetched', this._stopFetch, this);
			 
			this.rankingCollection.filterQueryParams = {
				aluno : opt.idAluno,
				disciplina : opt.idDisciplina,
			}
			
			 this.rankingCollection.fetch({
				 resetState : true,
				 success : function(_coll, _resp, _opt) {
					 //caso queira algum tratamento de sucesso adicional
				 },
				 error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				 }
			 });

			this.rankingGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getRankingColumns(),
				emptyText : "Sem registros",
				collection : this.rankingCollection,
				emptyText : "Sem registros para exibir."

			});

			this.rankingCounter = new Counter({
				collection : this.rankingCollection,
			});

			this.rankingPaginator = new Backgrid.Extension.Paginator({
				columns : this._getRankingColumns(),
				collection : this.rankingCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {

				this.aluno.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
//						that.ui.nomeAluno.text(_resp.nome);
//						that.ui.xp.text(_resp.pontos ? 'XP ' + _resp.pontos : 'XP 0');
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});

				// disciplinas cadastradas
				that.rankingGridRegion.show(that.rankingGrid);
				that.rankingCounterRegion.show(that.rankingCounter);
				that.rankingPaginatorRegion.show(that.rankingPaginator);

				// disciplinas nao cadastradas
//				that.disciplinaNaoCadastradaGridRegion.show(that.disciplinaNaoCadastradaGrid);
//				that.disciplinaNaoCadastradaCounterRegion.show(that.disciplinaNaoCadastradaCounter);
//				that.disciplinaNaoCadastradaPaginatorRegion.show(that.disciplinaNaoCadastradaPaginator);
			});

		},

		_getRankingColumns : function() {
			var columns = [

			   {
				name : "posicao",
				editable : false,
				sortable : true,
				label : "Posição",
				cell: "string",
				formatter: _.extend({},Backgrid.CellFormatter.prototype,{
					fromRaw : function(_id){
//						if(_id){
//							var index = this.rankingCollection.indexOf(this.model);
//							for(var i = 0, tamanho = myArray.length; i < len; i++) {
//							    if (myArray[i].hello === searchTerm) {
//							        index = i;
//							        break;
//							    }
//							}
//							
//							return _motorista.nome;
//						}
						return '2'
					}
				})
			}, {
				name : "aluno.nome",
				editable : false,
				sortable : true,
				label : "Aluno",
				cell : CustomStringCell.extend({
					fieldName : 'aluno.nome',
				}),
			}, {
				name : "pontos",
				editable : false,
				sortable : true,
				label : "Pontos",
				cell : "string",
			}];
			return columns;
		},

		_getDisciplinaNaoCadastradaColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : true,
				label : "Nome",
				cell : "string",
			}, {
				name : "professor.nome",
				editable : false,
				sortable : true,
				label : "Professor",
				cell : CustomStringCell.extend({
					fieldName : 'professor.nome',
				}),
			}, {
				name : "acoes",
				label : "Cadastrar",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDisciplinasNaoCadastradasCellButtons(),
					context : this,
				})
			} ];
			return columns;
		},

		_getDisciplinasCadastradasCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'lista_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'ListasExercicios de Exercício',
				onClick : that._getListasExerciciosExercicios,

			});
			buttons.push({
				id : 'regular_button',
				type : 'warning',
				icon : 'fa fa-thumbs-down',
				hint : 'Descadastrar Disciplina',
				onClick : that._descadastrar,

			});

			return buttons;
		},

		_getListasExerciciosExercicios : function(model) {
			util.goPage('app/listasExercicios/aluno/' + this.aluno.get("id") + '/disciplina/' + model.get("id"), true);
//			'app/listasExercicios/aluno/:idAluno/disciplina/:idDisciplina' : 'listasExercicios'
		},

		_descadastrar : function(model) {
			
			var that = this;
			var disciplina = new DisciplinaModel({
				id : model.id,
			});
			
			disciplina.url = 'rs/crud/disciplinas/descadastrarAluno/' + model.get("id") + '/aluno/' + that.aluno.get("id");

			util.Bootbox.confirm("Tem certeza que se descadastrar da disciplina de " + model.get('nome') + "?", function(yes) {
				if (yes) {
					
					disciplina.destroy({
						success : function() {
							that.disciplinaCadastradaCollection.remove(model);
							that.disciplinaNaoCadastradaCollection.add(model);
						},
						error : function() {
							util.showMessage('error', 'Problemas ao descadastrar disciplina!');
						}
					});
					
				}
			});
		},

		_getDisciplinasNaoCadastradasCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'regular_button',
				type : 'primary',
				icon : 'fa fa-thumbs-up',
				hint : 'Cadastrar Disciplina',
				onClick : that._cadastrar,

			});

			return buttons;
		},

		_cadastrar : function(model) {
			var that = this;
			var disciplina = new DisciplinaModel({
				id : model.id,
					// rs/crud/disciplina/50/aluno/60
			});
			disciplina.url = 'rs/crud/disciplinas/cadastrarAluno/'+ model.get("id") + '/aluno/' + that.aluno.get("id");

			util.Bootbox.confirm("Tem certeza que se cadastrar da disciplina de " + model.get('nome') + "?", function(yes) {
				if (yes) {
					
					
					disciplina.save({}, {
						success : function(_model, _resp, _options) {
							that.disciplinaNaoCadastradaCollection.remove(model);
							that.disciplinaCadastradaCollection.add(model);
						},

						error : function(_model, _resp, _options) {
							util.showMessage('error', 'Problemas ao cadastrar disciplina!');
						}
					});
					
					// TODO deletar do ranking
				}
			});
		},

		// Busca a mensagem a ser exibida e o logo gestor
		buscaConfiguracaoInicial : function() {
			// var that = this;
			// this.configuracaoInicialPainel.fetch({
			// resetState : true,
			// data : {
			// 'cnes' : that.cnes,
			// },
			// success : function(_coll, _resp, _opt) {
			// if (_resp) {
			// var configuracaoInicial = that.configuracaoInicialPainel;
			// that.exibeConfiguracao(configuracaoInicial);
			// }
			// },
			// error : function(_coll, _resp, _opt) {
			// util.logError(_resp);
			// }
			// });

		},

	// exibeDataCorrente : function() {
	// var dataCorrente = util.moment();
	// this.ui.dataAtual.text(dataCorrente.format('DD/MM/YYYY'));
	// this.ui.horaAtual.text(dataCorrente.format('HH:mm'));
	// },
	//
	// exibeConfiguracao : function(painelAtendimento) {
	// if (painelAtendimento.get('mensagemExibida')) {
	// this.ui.mensagemExibida.text(painelAtendimento.get('mensagemExibida'));
	// }
	// if (painelAtendimento.get('logoGestorBase64')) {
	// this.ui.imgLogoGestor.attr("src",
	// painelAtendimento.get("logoGestorBase64"));
	// }
	// },
	//
	// exibePaciente : function(painelAtendimento) {
	// this.informacoesPainel = new InformacoesPainel();
	// var that = this;
	// if (painelAtendimento.get('idAtendimento')) {
	// util.stopResfresh();
	// this.reiniciaVideo = true;
	// this.painelAtendimentoRegion.show(this.informacoesPainel);
	// this.informacoesPainel.setInformacoesPainel(painelAtendimento);
	// this.informacoesPainel.chamadaDeVoz(painelAtendimento,
	// this.urlTextToSpeech);
	// }
	//
	// if (that.reiniciaVideo) {
	// setTimeout(function() {
	//
	// var painelAtendimentoTemp = new PainelAtendimentoModel();
	// painelAtendimentoTemp.set({
	// "id" : painelAtendimento.get('idAtendimento')
	// });
	// painelAtendimentoTemp.urlRoot = 'rs/crud/painelAtendimento';
	// painelAtendimentoTemp.destroy({
	// success : function(_coll, _resp, _opt) {
	// if (that.reiniciaVideo) {
	// if(exibeVideo) {
	// that.videoPainel = new VideoPainel();
	// that.painelAtendimentoRegion.show(that.videoPainel);
	// } else {
	// that.painelAtendimentoRegion.reset();
	// }
	//								
	// that.reiniciaVideo = false;
	// util.resfresh(5, that.buscaInformacoesPainel);
	// }
	//
	// },
	// error : function(_coll, _resp, _opt) {
	// util.logError(_resp);
	// }
	// });
	//
	// }, 30000);
	// }
	//
	// },

	});

	return ListasExercicios;
});
