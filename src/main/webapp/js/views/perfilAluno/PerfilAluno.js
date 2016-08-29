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
	
	var PerfilAlunoTemplate = require('text!views/perfilAluno/tpl/PerfilAlunoTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var AlunoModel = require('models/AlunoModel');
	
	var PerfilAluno = Marionette.LayoutView.extend({
		template : _.template(PerfilAlunoTemplate),

		regions : {
			disciplinaCadastradaCounterRegion : 	 '#counter_disciplina_cadastrada',
			disciplinaCadastradaGridRegion : 		 '#grid_disciplina_cadastrada',
			disciplinaCadastradaPaginatorRegion : 	 '#paginator_disciplina_cadastrada',
			disciplinaNaoCadastradaCounterRegion : 	 '#counter_disciplina_nao_cadastrada',
			disciplinaNaoCadastradaGridRegion : 	 '#grid_disciplina_nao_cadastrada',
			disciplinaNaoCadastradaPaginatorRegion : '#paginator_disciplina_nao_cadastrada',
		},

		events : {
//			'click #botao' : 'chamaUrl'

		},

//		chamaUrl : function() {
//
//		},
		ui : {
			nomeAluno : '#nomeAluno',
			xp : '#xp',
			level : '#level',
			barraProximoLevel : '#barraProximoLevel',
//			horaAtual : '#horaAtual',
//			mensagemExibida : '#mensagemExibida',
//			imgLogoGestor : '#imgLogoGestor',
		},

		initialize : function(opt) {
			var that = this;
			this.aluno = new AlunoModel();
			this.aluno.on('fetching', this._startFetch, this);
			this.aluno.on('fetched', this._stopFetch, this);
			this.aluno.filterQueryParams = {
				id : opt.id,
			}
		
			//disciplinas cadastradas
			this.disciplinaCadastradaCollection = new DisciplinaPageCollection();
			this.disciplinaCadastradaCollection.state.pageSize = 5;
			this.disciplinaCadastradaCollection.on('fetching', this._startFetch, this);
			this.disciplinaCadastradaCollection.on('fetched', this._stopFetch, this);
			
			this.disciplinaCadastradaCollection.filterQueryParams = {
				aluno : opt.id,
				isAlunoIncluso : true,
			}
			this.disciplinaCadastradaCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});

			this.disciplinaCadastradaGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getDisciplinaCadastradaColumns(),
				emptyText : "Sem registros",
				collection : this.disciplinaCadastradaCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.disciplinaCadastradaCounter = new Counter({
				collection : this.disciplinaCadastradaCollection ,
			});
			

			this.disciplinaCadastradaPaginator = new Backgrid.Extension.Paginator({
				columns : this._getDisciplinaCadastradaColumns(),
				collection : this.disciplinaCadastradaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});
			
			//disciplinas nao cadastradas
			this.disciplinaNaoCadastradaCollection = new DisciplinaPageCollection();
			this.disciplinaNaoCadastradaCollection.state.pageSize = 5;
			this.disciplinaNaoCadastradaCollection.on('fetching', this._startFetch, this);
			this.disciplinaNaoCadastradaCollection.on('fetched', this._stopFetch, this);
			
			this.disciplinaNaoCadastradaCollection.filterQueryParams = {
				aluno : opt.id,
				isAlunoIncluso : false,
			}
			
			this.disciplinaNaoCadastradaCollection.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					//caso queira algum tratamento de sucesso adicional
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				}
			});

			this.disciplinaNaoCadastradaGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getDisciplinaNaoCadastradaColumns(),
				emptyText : "Sem registros",
				collection : this.disciplinaNaoCadastradaCollection,
				emptyText : "Sem registros para exibir."

			});
			
			this.disciplinaNaoCadastradaCounter = new Counter({
				collection : this.disciplinaNaoCadastradaCollection ,
			});
			

			this.disciplinaNaoCadastradaPaginator = new Backgrid.Extension.Paginator({
				columns : this._getDisciplinaNaoCadastradaColumns(),
				collection : this.disciplinaNaoCadastradaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				
				this.aluno.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						that.ui.nomeAluno.text(_resp.itens[0].nome);
						that.ui.xp.text(_resp.itens[0].pontos ? 'XP ' + _resp.itens[0].pontos : 'XP 0');
						that.ui.level.text(_resp.itens[0].level ? 'Level ' + _resp.itens[0].level : 'Level 1');
						that.ui.barraProximoLevel.prop("aria-valuenow", '' + _resp.itens[0].proximoLevel ? _resp.itens[0].proximoLevel : 0);
						that.ui.barraProximoLevel.prop("style", '' + "width:" + (_resp.itens[0].proximoLevel ? _resp.itens[0].proximoLevel : 0) + "%");
						var proxLevel = _resp.itens[0].proximoLevel ? _resp.itens[0].proximoLevel : 0;
						if(proxLevel >= 0 && proxLevel <= 30) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-danger');
						}else if(proxLevel >30 && proxLevel < 50) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-warning');
						}else if(proxLevel >= 50  && proxLevel < 60) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-info');
						}else if(proxLevel >= 60) {
							that.ui.barraProximoLevel.prop('class', 'progress-bar progress-bar-success');
						}
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt)
					}
				});
				
				//disciplinas cadastradas
				that.disciplinaCadastradaGridRegion.show(that.disciplinaCadastradaGrid);
				that.disciplinaCadastradaCounterRegion.show(that.disciplinaCadastradaCounter);
				that.disciplinaCadastradaPaginatorRegion.show(that.disciplinaCadastradaPaginator);
				
				//disciplinas nao cadastradas
				that.disciplinaNaoCadastradaGridRegion.show(that.disciplinaNaoCadastradaGrid);
				that.disciplinaNaoCadastradaCounterRegion.show(that.disciplinaNaoCadastradaCounter);
				that.disciplinaNaoCadastradaPaginatorRegion.show(that.disciplinaNaoCadastradaPaginator);
			});


			
		},
		
		_getDisciplinaCadastradaColumns : function() {
			var columns = [	

			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "professor.nome",
				editable : false,
				sortable : true,
				label : "Professor",
				cell : CustomStringCell.extend({
					fieldName : 'professor.nome',
				}),
			},	
			{
				name : "acoes",
				label : "Listas, Descadastrar",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDisciplinasCadastradasCellButtons(),
					context : this,
				})
			}
			];
			return columns;
		},
		
		_getDisciplinaNaoCadastradaColumns : function() {
			var columns = [	

			{
				name : "nome",
				editable : false,
				sortable : true,
				label 	 : "Nome",
				cell 	 : "string",
			}, 
			{
				name : "professor.nome",
				editable : false,
				sortable : true,
				label : "Professor",
				cell : CustomStringCell.extend({
					fieldName : 'professor.nome',
				}),
			},	
			{
				name : "acoes",
				label : "Cadastrar",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDisciplinasNaoCadastradasCellButtons(),
					context : this,
				})
			}
			];
			return columns;
		},
		
		_getDisciplinasCadastradasCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'lista_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Listas de Exercício',
				onClick : that._getListasExercicios,

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
		
		_getListasExercicios : function(model) {
			//ir para lista de exercicios da disciplina
			//util.goPage("app/editAtendimento/" + model.get('id'), true);
		},

		_descadastrar : function(model) {
			//descadastrar disciplina
			//util.goPage("app/historicoAtendimentos/" + model.get('id'), true);
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
			//descadastrar disciplina
			//util.goPage("app/historicoAtendimentos/" + model.get('id'), true);
		},

		// Busca a mensagem a ser exibida e o logo gestor
		buscaConfiguracaoInicial : function() {
//			var that = this;
//			this.configuracaoInicialPainel.fetch({
//				resetState : true,
//				data : {
//					'cnes' : that.cnes,
//				},
//				success : function(_coll, _resp, _opt) {
//					if (_resp) {
//						var configuracaoInicial = that.configuracaoInicialPainel;
//						that.exibeConfiguracao(configuracaoInicial);
//					}
//				},
//				error : function(_coll, _resp, _opt) {
//					util.logError(_resp);
//				}
//			});

		},

//		exibeDataCorrente : function() {
//			var dataCorrente = util.moment();
//			this.ui.dataAtual.text(dataCorrente.format('DD/MM/YYYY'));
//			this.ui.horaAtual.text(dataCorrente.format('HH:mm'));
//		},
//
//		exibeConfiguracao : function(painelAtendimento) {
//			if (painelAtendimento.get('mensagemExibida')) {
//				this.ui.mensagemExibida.text(painelAtendimento.get('mensagemExibida'));
//			}
//			if (painelAtendimento.get('logoGestorBase64')) {
//				this.ui.imgLogoGestor.attr("src", painelAtendimento.get("logoGestorBase64"));
//			}
//		},
//
//		exibePaciente : function(painelAtendimento) {
//			this.informacoesPainel = new InformacoesPainel();
//			var that = this;
//			if (painelAtendimento.get('idAtendimento')) {
//				util.stopResfresh();
//				this.reiniciaVideo = true;
//				this.painelAtendimentoRegion.show(this.informacoesPainel);
//				this.informacoesPainel.setInformacoesPainel(painelAtendimento);
//				this.informacoesPainel.chamadaDeVoz(painelAtendimento, this.urlTextToSpeech);
//			}
//
//			if (that.reiniciaVideo) {
//				setTimeout(function() {
//
//					var painelAtendimentoTemp = new PainelAtendimentoModel();
//					painelAtendimentoTemp.set({
//						"id" : painelAtendimento.get('idAtendimento')
//					});
//					painelAtendimentoTemp.urlRoot = 'rs/crud/painelAtendimento';
//					painelAtendimentoTemp.destroy({
//						success : function(_coll, _resp, _opt) {
//							if (that.reiniciaVideo) {
//								if(exibeVideo) {
//									that.videoPainel = new VideoPainel();
//									that.painelAtendimentoRegion.show(that.videoPainel);
//								} else {
//									that.painelAtendimentoRegion.reset();
//								}
//								
//								that.reiniciaVideo = false;
//								util.resfresh(5, that.buscaInformacoesPainel);
//							}
//
//						},
//						error : function(_coll, _resp, _opt) {
//							util.logError(_resp);
//						}
//					});
//
//				}, 30000);
//			}
//
//		},

	});

	return PerfilAluno;
});
