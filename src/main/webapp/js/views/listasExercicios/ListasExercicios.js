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
	var ListaModel = require('models/ListaModel');
	var ListaCollection = require('collections/ListaCollection');
	var ListaPageCollection = require('collections/ListaPageCollection');

	var ListasExercicios = Marionette.LayoutView.extend({
		template : _.template(ListasExerciciosTemplate),

		regions : {
			rankingCounterRegion : '#counter_ranking',
			rankingGridRegion : '#grid_ranking',
			rankingPaginatorRegion : '#paginator_ranking',
			listaCounterRegion : '#counter_lista',
			listaGridRegion : '#grid_lista',
			listaPaginatorRegion : '#paginator_lista',
		},

		events : {
		},

		ui : {
			posicao1 : '#posicao1',
			posicao2 : '#posicao2',
			posicao3 : '#posicao3',
			top3Disciplina : '#top3Disciplina',
			divPosicao1 : '#divPosicao1',
			divPosicao2 : '#divPosicao2',
			divPosicao3 : '#divPosicao3',
		},

		initialize : function(opt) {
			var that = this;
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
				label : "Resolver",
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
				onClick : that._getResolverLista,

			},{
				id : 'lista_desafio_button',
				type : 'primary',
				icon : 'fa-star-o',
				hint : 'Desafios',
				onClick : that._getResolverDesafios,

			});

			return buttons;
		},

		_getResolverLista : function(model) {
			if(model.get('concluida')) {
				util.showMessage("success", model.get("nome") + " concluída.")
			}else {
				util.goPage('app/listasExercicios/resolverLista/aluno/' + this.aluno.get("id") + '/disciplina/' + this.disciplina.get("id") + '/lista/' + model.get("id"), true);
			}
		},
		
		_getResolverDesafios : function(model) {
			if(!model.get('concluida')) {
				util.showMessage("error", "Necessário concluir " + model.get("nome"));
				return;
			}
			if(model.get('desafioConcluido')) {
				util.showMessage("success", "Desafios de " + model.get("nome") + " concluídos.")
				return;
			}
			util.goPage('app/listasExercicios/resolverDesafio/aluno/' + this.aluno.get("id") + '/disciplina/' + this.disciplina.get("id") + '/lista/' + model.get("id"), true);
		},


	});

	return ListasExercicios;
});
