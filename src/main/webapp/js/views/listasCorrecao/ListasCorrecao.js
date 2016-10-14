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
	var ExpandableCell = require('views/components/ExpandableCell');

	var ListasCorrecaoTemplate = require('text!views/listasCorrecao/tpl/ListasCorrecaoTemplate.html');
	var DisciplinaPageCollection = require('collections/DisciplinaPageCollection');
	var DisciplinaModel = require('models/DisciplinaModel');
	var AlunoModel = require('models/AlunoModel');
	var RankingPageCollection = require('collections/RankingPageCollection');
	var ListaModel = require('models/ListaModel');
	var ListaCollection = require('collections/ListaCollection');
	var ListaPageCollection = require('collections/ListaPageCollection');
	var QuestaoModel = require('models/QuestaoModel');
	var QuestaoCollection = require('collections/QuestaoCollection');
	var QuestaoPageCollection = require('collections/QuestaoPageCollection');
	var QuestaoDesafioModel = require('models/QuestaoDesafioModel');
	var QuestaoDesafioCollection = require('collections/QuestaoDesafioCollection');
	var QuestaoDesafioPageCollection = require('collections/QuestaoDesafioPageCollection');

	var ListasCorrecao = Marionette.LayoutView.extend({
		template : _.template(ListasCorrecaoTemplate),

		regions : {
			rankingCounterRegion : '#counter_ranking',
			rankingGridRegion : '#grid_ranking',
			rankingPaginatorRegion : '#paginator_ranking',
			listaCounterRegion : '#counter_lista',
			listaGridRegion : '#grid_lista',
			listaPaginatorRegion : '#paginator_lista',
			questaoGridRegion : '#grid_questao',
			questaoPaginatorRegion : '#paginator_questao',
			desafioGridRegion : '#grid_desafio',
			desafioPaginatorRegion : '#paginator_desafio',
		},

		events : {
			'click 	#voltar' : 'voltar',
		},

		ui : {
			posicao1 : '#posicao1',
			posicao2 : '#posicao2',
			posicao3 : '#posicao3',
			top3Disciplina : '#top3Disciplina',
			divPosicao1 : '#divPosicao1',
			divPosicao2 : '#divPosicao2',
			divPosicao3 : '#divPosicao3',
			labelQuestao : '#labelQuestao',
			groupQuestoes : '#groupQuestoes',
			labelDesafio : '#labelDesafio',
			groupDesafios : '#groupDesafios',
			inputRespostaImage : '#inputRespostaImage',
			inputResposta : '#inputResposta',
			groupInputResposta : '#groupInputResposta',
		},

		initialize : function(opt) {
			var that = this;
			this.idProfessor = opt.idProfessor;
			this.aluno = new AlunoModel();
			this.aluno.urlRoot = 'rs/crud/alunos/' + opt.idAluno;
			
			this.disciplina = new DisciplinaModel();
			this.disciplina.urlRoot = 'rs/crud/disciplinas/' + opt.idDisciplina;

			//Ranking
			this.rankingCollection = new RankingPageCollection();
			this.rankingCollection.state.pageSize = 5;
			this.rankingCollection.on('fetching', this._startFetch, this);
			this.rankingCollection.on('fetched', this._stopFetch, this);
			 
			this.rankingCollection.filterQueryParams = {
				disciplina : opt.idDisciplina,
			}
			
			 this.rankingCollection.fetch({
				 resetState : true,
				 success : function(_coll, _resp, _opt) {
					 that._setTop3();
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
			
			//Listas
			this.listaCollection = new ListaPageCollection();
			this.listaCollection.state.pageSize = 5;
			this.listaCollection.on('fetching', this._startFetch, this);
			this.listaCollection.on('fetched', this._stopFetch, this);
			 
			this.listaCollection.filterQueryParams = {
				disciplina : opt.idDisciplina,
			}
			
			 this.listaCollection.fetch({
				 resetState : true,
				 success : function(_coll, _resp, _opt) {
					 
					var listaAluno = new ListaCollection();
					listaAluno.url = 'rs/crud/listas/getListasAlunoPorDisciplina/aluno/' + opt.idAluno +'/disciplina/' + opt.idDisciplina;
					
					listaAluno.fetch({
						resetState : true,
						success : function(_coll, _resp, _opt) {
							
							if(_resp && _resp.length && _resp.length > 0) {
								var tamanhoLista = _.size(that.listaCollection);
								var tamanhoListaAluno = _.size(listaAluno);
								
								//preenche atributos da lista para verificar se a mesma ja foi concluida pelo aluno
								for(var i = 0; i < tamanhoLista; i++) {
									for(var n = 0; n < tamanhoListaAluno; n++) {
										if(that.listaCollection.at(i).get('id') == listaAluno.at(n).get('id')){
											that.listaCollection.at(i).set('concluida', listaAluno.at(n).get('concluida'));
											that.listaCollection.at(i).set('desafioConcluido', listaAluno.at(n).get('desafioConcluido'));
											that.listaCollection.at(i).set('questaoAtual', listaAluno.at(n).get('questaoAtual'));
											that.listaCollection.at(i).set('desafioAtual', listaAluno.at(n).get('desafioAtual'));
										}
									}
								}
								
							}
						},
						error : function(_coll, _resp, _opt) {
							console.error(_coll, _resp, _opt)
						}
					});
					 
					 
					 
					 
					 //caso queira algum tratamento de sucesso adicional
				 },
				 error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt)
				 }
			 });

			this.listaGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getListaColumns(),
				emptyText : "Sem registros",
				collection : this.listaCollection,
				emptyText : "Sem registros para exibir."

			});

			this.listaCounter = new Counter({
				collection : this.listaCollection,
			});

			this.listaPaginator = new Backgrid.Extension.Paginator({
				columns : this._getListaColumns(),
				collection : this.listaCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});
			
			this.listaClicada = null;
			
			//Questoes da disciplina
			this.questaoCollection = new QuestaoPageCollection();
			this.questaoCollection.state.pageSize = 5;
			this.questaoCollection.on('fetching', this._startFetch, this);
			this.questaoCollection.on('fetched', this._stopFetch, this);
			this.questaoCollection.mode = "client";
			
			this.questaoGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getQuestaoColumns(),
				emptyText : "Sem registros",
				collection : this.questaoCollection,
				emptyText : "Sem registros para exibir."

			});

			this.questaoPaginator = new Backgrid.Extension.Paginator({
				columns : this._getQuestaoColumns(),
				collection : this.questaoCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});
			
			//Questoes desafios da disciplina
			this.desafioCollection = new QuestaoDesafioPageCollection();
			this.desafioCollection.state.pageSize = 5;
			this.desafioCollection.on('fetching', this._startFetch, this);
			this.desafioCollection.on('fetched', this._stopFetch, this);
			this.desafioCollection.mode = "client";
			
			this.desafioGrid = new Backgrid.Grid({
				row : RowClick,
				className : 'table backgrid table-striped table-bordered table-hover dataTable no-footer  ',
				columns : this._getDesafioColumns(),
				emptyText : "Sem registros",
				collection : this.desafioCollection,
				emptyText : "Sem registros para exibir."

			});

			this.desafioPaginator = new Backgrid.Extension.Paginator({
				columns : this._getDesafioColumns(),
				collection : this.desafioCollection,
				className : 'dataTables_paginate paging_simple_numbers',
				uiClassName : 'pagination',
			});

			this.on('show', function() {
				
				this.ui.divPosicao1.hide();
				this.ui.divPosicao2.hide();
				this.ui.divPosicao3.hide();
				
				this.aluno.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt);
					}
				});
				
				this.disciplina.fetch({
					resetState : true,
					success : function(_coll, _resp, _opt) {
						that.ui.top3Disciplina.text(_resp.nome + " - Top 3");
					},
					error : function(_coll, _resp, _opt) {
						console.error(_coll, _resp, _opt);
					}
				});
				
				// ranking
				that.rankingGridRegion.show(that.rankingGrid);
				that.rankingCounterRegion.show(that.rankingCounter);
				that.rankingPaginatorRegion.show(that.rankingPaginator);
				// listas
				that.listaGridRegion.show(that.listaGrid);
				that.listaCounterRegion.show(that.listaCounter);
				that.listaPaginatorRegion.show(that.listaPaginator);
			});

		},
		
		_setTop3 : function() {
			for(var a = 0; a < 3; a++) {
				if(this.rankingCollection.length < a + 1) {
					break;
				}else {
					var nomeAluno = this.rankingCollection.at(a).get("aluno").nome;
					$("#divPosicao" + (a+1)).show();
					$("#posicao" + (a+1)).text(nomeAluno);
				}
			}
		},

		_getRankingColumns : function() {
			var columns = [
			    {
				name : "posicao",
				editable : false,
				sortable : true,
				label : "Posição",
				cell : "string",
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

		_getListaColumns : function() {
			var columns = [

			{
				name : "nome",
				editable : false,
				sortable : true,
				label : "Nome",
				cell : "string",
			}, {
				name : "acoes",
				label : "Respostas",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getListaCellButtons(),
					context : this,
				})
			} ];
			return columns;
		},

		_getListaCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'lista_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Questões',
				onClick : that._getQuestoes,

			},{
				id : 'lista_desafio_button',
				type : 'primary',
				icon : 'fa-star-o',
				hint : 'Desafios',
				onClick : that._getDesafios,

			});

			return buttons;
		},
		
		_getQuestoes : function(model) {
			var that = this;
			this.listaClicada = model;
			this.ui.labelQuestao.text("Questões de " + model.get("nome"));
			var questaoAluno = new QuestaoCollection();
			questaoAluno.url = "rs/crud/questaos/getQuestoesComRespostas/lista/" + model.get("id") + "/aluno/" + this.aluno.get("id");
			questaoAluno.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					that.questaoCollection.add(_resp);
					
					that.ui.groupDesafios.prop("hidden", true);
					that.ui.inputRespostaImage.prop("hidden", true);
					that.ui.groupInputResposta.prop("hidden", true);
					that.ui.groupQuestoes.prop("hidden", false);
					
					
					that.questaoGridRegion.show(that.questaoGrid);
					that.questaoPaginatorRegion.show(that.questaoPaginator);
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt);
				}
			});
			
		},
		
		_getQuestaoColumns : function() {
			var columns = [
			{
				name : "pergunta",
				editable : false,
				sortable : true,
				label 	 : "Pergunta",
				cell 	 : ExpandableCell.extend({
					accordion: true,
				    expand: function (el, model) {

				      $(el).append($('<div>').html(model.get("pergunta")));

				    }
				})
			},
			
			{
				name : "itemCorreto",
				editable : false,
				sortable : true,
				label 	 : "Item Correto",
				cell 	 : "string",
			},
			
			{
				name : "itemMarcado",
				editable : false,
				sortable : true,
				label 	 : "Item Marcado",
				cell 	 : "string",
			},
			
			{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell 	 : "string",
			},
			];
			return columns;
		},
		
		_getDesafios : function(model) {
			var that = this;
			this.listaClicada = model;
			this.ui.labelDesafio.text("Desafios de " + model.get("nome"));
			var desafioAluno = new QuestaoDesafioCollection();
			desafioAluno.url = "rs/crud/questaoDesafios/getQuestoesDesafioComRespostas/lista/" + model.get("id") + "/aluno/" + this.aluno.get("id");
			desafioAluno.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					that.desafioCollection.add(_resp);
					
					that.ui.groupQuestoes.prop("hidden", true);
					that.ui.groupDesafios.prop("hidden", false);
					that.desafioGridRegion.show(that.desafioGrid);
					that.desafioPaginatorRegion.show(that.desafioPaginator);
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt);
				}
			});
			
		},
		
		_getDesafioColumns : function() {
			var columns = [
			{
				name : "pergunta",
				editable : false,
				sortable : true,
				label 	 : "Pergunta",
				cell 	 : ExpandableCell.extend({
					accordion: true,
				    expand: function (el, model) {

				      $(el).append($('<div>').html(model.get("pergunta")));

				    }
				})
			},
			{
				name : "pontos",
				editable : false,
				sortable : true,
				label 	 : "Pontos",
				cell 	 : "string",
			},
			{
				name : "respostaCorreta",
				editable : false,
				sortable : true,
				label 	 : "Resposta Correta?",
				cell 	 : "string",
				formatter : _.extend({},Backgrid.CellFormatter.prototype,{
					fromRaw : function(_respostaCorreta){
						if(_respostaCorreta == false){
							return 'Não'; 
						}else if(_respostaCorreta == true){
							return 'Sim';
						}
						
						return '';
					}
				})
			},
			{
				name : "acoes",
				label : "Respostas",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : this._getDesafioCellButtons(),
					context : this,
				})
			}
			
			];
			return columns;
		},
		
		_getDesafioCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'desafio_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Visualizar',
				onClick : that._getRespostaDesafio,

			},
			{
				id : 'resposta_correta_button',
				type : 'success',
				icon : 'fa fa-thumbs-up',
				hint : 'Cadastrar Resposta Correta',
				onClick : that._cadastrarRespostaCorreta,

			},
			{
				id : 'resposta_incorreta_button',
				type : 'danger',
				icon : 'fa fa-thumbs-down',
				hint : 'Cadastrar Resposta Incorreta',
				onClick : that._cadastrarRespostaIncorreta,

			});

			return buttons;
		},
		
		_getRespostaDesafio : function(model) {
			this.ui.inputRespostaImage.attr('src', 'uploads/' + model.get("resposta"));
			this.ui.inputResposta.text(model.get("respostaTexto"));
			this.ui.inputRespostaImage.prop("hidden", false);
			this.ui.groupInputResposta.prop("hidden", false);
		},
		
		_cadastrarRespostaCorreta : function(model) {
			var that = this;
			var desafioModel = new QuestaoDesafioModel();
			
			desafioModel.url = "rs/crud/questaoDesafios/cadastrarResposta/" + model.get("id") + "/aluno/" + this.aluno.get("id") + "/isCorreta/" + true;
			
			desafioModel.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					util.showSuccessMessage('Resposta correta cadastrada com sucecesso!');
					
					for(var i = 0; i < that.desafioCollection.length ; i++) {
						if(that.desafioCollection.at(i).get('id') == model.get('id')){
							that.desafioCollection.at(i).set('respostaCorreta', true);
						}
					}
					
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt);
				}
			});
			
		},
		
		_cadastrarRespostaIncorreta : function(model) {
			var that = this;
			var desafioModel = new QuestaoDesafioModel();
			
			desafioModel.url = "rs/crud/questaoDesafios/cadastrarResposta/" + model.get("id") + "/aluno/" + this.aluno.get("id") + "/isCorreta/" + false;
			
			desafioModel.fetch({
				resetState : true,
				success : function(_coll, _resp, _opt) {
					util.showSuccessMessage('Resposta incorreta cadastrada com sucecesso!');
					
					for(var i = 0; i < that.desafioCollection.length ; i++) {
						if(that.desafioCollection.at(i).get('id') == model.get('id')){
							that.desafioCollection.at(i).set('respostaCorreta', false);
						}
					}
				},
				error : function(_coll, _resp, _opt) {
					console.error(_coll, _resp, _opt);
				}
			});
		},

		voltar : function() {
			util.goPage("app/perfilProfessor/" + this.idProfessor);
		},


	});

	return ListasCorrecao;
});
