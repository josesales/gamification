define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var util = require('utilities/utils');
		
	var PageAluno = require('views/aluno/PageAluno');
	var FormAluno = require('views/aluno/FormAluno');
	var AlunoModel = require('models/AlunoModel');
	
	var PageDisciplina = require('views/disciplina/PageDisciplina');
	var FormDisciplina = require('views/disciplina/FormDisciplina');
	var DisciplinaModel = require('models/DisciplinaModel');
	
	//Paginas da aplicacao
	var PerfilAluno = require('views/perfilAluno/PerfilAluno');
	var ListasExercicios = require('views/listasExercicios/ListasExercicios');
	
	var PageLista = require('views/lista/PageLista');
	var FormLista = require('views/lista/FormLista');
	var ListaModel = require('models/ListaModel');
	
	var PageProfessor = require('views/professor/PageProfessor');
	var FormProfessor = require('views/professor/FormProfessor');
	var ProfessorModel = require('models/ProfessorModel');
	
	var PageQuestao = require('views/questao/PageQuestao');
	var FormQuestao = require('views/questao/FormQuestao');
	var QuestaoModel = require('models/QuestaoModel');
	
	var PageQuestaoDesafio = require('views/questaoDesafio/PageQuestaoDesafio');
	var FormQuestaoDesafio = require('views/questaoDesafio/FormQuestaoDesafio');
	var QuestaoDesafioModel = require('models/QuestaoDesafioModel');
	
	var PageRanking = require('views/ranking/PageRanking');
	var FormRanking = require('views/ranking/FormRanking');
	var RankingModel = require('models/RankingModel');
	
	var PageBairro = require('views/bairro/PageBairro');
	var FormBairro = require('views/bairro/FormBairro');
	var BairroModel = require('models/BairroModel');
	
	var PageCep = require('views/cep/PageCep');
	var FormCep = require('views/cep/FormCep');
	var CepModel = require('models/CepModel');
	
	var PageCidade = require('views/cidade/PageCidade');
	var FormCidade = require('views/cidade/FormCidade');
	var CidadeModel = require('models/CidadeModel');
	
	var PageEndereco = require('views/endereco/PageEndereco');
	var FormEndereco = require('views/endereco/FormEndereco');
	var EnderecoModel = require('models/EnderecoModel');
	
	var PageEstado = require('views/estado/PageEstado');
	var FormEstado = require('views/estado/FormEstado');
	var EstadoModel = require('models/EstadoModel');
	
	var PagePais = require('views/pais/PagePais');
	var FormPais = require('views/pais/FormPais');
	var PaisModel = require('models/PaisModel');
	
	var PageClient = require('views/client/PageClient');
	var FormClient = require('views/client/FormClient');
	var ClientModel = require('models/ClientModel');
	
	var PageItem = require('views/item/PageItem');
	var FormItem = require('views/item/FormItem');
	var ItemModel = require('models/ItemModel');
	
	var PageItemType = require('views/itemType/PageItemType');
	var FormItemType = require('views/itemType/FormItemType');
	var ItemTypeModel = require('models/ItemTypeModel');
	
	var PageOperation = require('views/operation/PageOperation');
	var FormOperation = require('views/operation/FormOperation');
	var OperationModel = require('models/OperationModel');
	
	var PagePermission = require('views/permission/PagePermission');
	var FormPermission = require('views/permission/FormPermission');
	var PermissionModel = require('models/PermissionModel');
	
	var PageRole = require('views/role/PageRole');
	var FormRole = require('views/role/FormRole');
	var RoleModel = require('models/RoleModel');
	
	var PageSession = require('views/session/PageSession');
	var FormSession = require('views/session/FormSession');
	var SessionModel = require('models/SessionModel');
	
	var PageUser = require('views/user/PageUser');
	var FormUser = require('views/user/FormUser');
	var UserModel = require('models/UserModel');
	
	util.NProgress.setBlockerPanel('block_panel');
	
	var CustomRegion = Marionette.Region.extend({
		el : ".main-content",

		attachHtml : function(view) {
			this.$el.hide();
			this.$el.html(view.el);
			//this.$el.slideDown(300);
			//this.$el.show("slide", { direction: "up" }, 300);
			util.scrollTop();
			this.$el.fadeIn(300);
			view.listenTo(view, 'show', function() {
				setTimeout(function() {
					// ver tambem backbone-adapter
					util.NProgress.done(false, true);
					// uma pequena espera para garantir que o componente foi
					// renderizado antes de mandar remove-lo.
				}, 100);
			});
		},
	});

	var AppRouter = Backbone.Router.extend({
		routes : {
			'' : 'index',
			//hashs da Aplicacao
			'app/perfilAluno/:id' : 'perfilAluno',
			'app/listasExercicios/aluno/:idAluno/disciplina/:idDisciplina' : 'listasExercicios',
			// hashs de Aluno
			'app/alunos' : 'alunos',
			'app/newAluno' : 'newAluno',
			'app/editAluno/:id' : 'editAluno',
			// hashs de Disciplina
			'app/disciplinas' : 'disciplinas',
			'app/newDisciplina' : 'newDisciplina',
			'app/editDisciplina/:id' : 'editDisciplina',
			// hashs de Lista
			'app/listas' : 'listas',
			'app/newLista' : 'newLista',
			'app/editLista/:id' : 'editLista',
			// hashs de Professor
			'app/professors' : 'professors',
			'app/newProfessor' : 'newProfessor',
			'app/editProfessor/:id' : 'editProfessor',
			// hashs de Questao
			'app/questaos' : 'questaos',
			'app/newQuestao' : 'newQuestao',
			'app/editQuestao/:id' : 'editQuestao',
			// hashs de QuestaoDesafio
			'app/questaoDesafios' : 'questaoDesafios',
			'app/newQuestaoDesafio' : 'newQuestaoDesafio',
			'app/editQuestaoDesafio/:id' : 'editQuestaoDesafio',
			// hashs de Ranking
			'app/rankings' : 'rankings',
			'app/newRanking' : 'newRanking',
			'app/editRanking/:id' : 'editRanking',
			// hashs de Bairro
			'app/bairros' : 'bairros',
			'app/newBairro' : 'newBairro',
			'app/editBairro/:id' : 'editBairro',
			// hashs de Cep
			'app/ceps' : 'ceps',
			'app/newCep' : 'newCep',
			'app/editCep/:id' : 'editCep',
			// hashs de Cidade
			'app/cidades' : 'cidades',
			'app/newCidade' : 'newCidade',
			'app/editCidade/:id' : 'editCidade',
			// hashs de Endereco
			'app/enderecos' : 'enderecos',
			'app/newEndereco' : 'newEndereco',
			'app/editEndereco/:id' : 'editEndereco',
			// hashs de Estado
			'app/estados' : 'estados',
			'app/newEstado' : 'newEstado',
			'app/editEstado/:id' : 'editEstado',
			// hashs de Pais
			'app/paiss' : 'paiss',
			'app/newPais' : 'newPais',
			'app/editPais/:id' : 'editPais',
			// hashs de Client
			'app/clients' : 'clients',
			'app/newClient' : 'newClient',
			'app/editClient/:id' : 'editClient',
			// hashs de Item
			'app/items' : 'items',
			'app/newItem' : 'newItem',
			'app/editItem/:id' : 'editItem',
			// hashs de ItemType
			'app/itemTypes' : 'itemTypes',
			'app/newItemType' : 'newItemType',
			'app/editItemType/:id' : 'editItemType',
			// hashs de Operation
			'app/operations' : 'operations',
			'app/newOperation' : 'newOperation',
			'app/editOperation/:id' : 'editOperation',
			// hashs de Permission
			'app/permissions' : 'permissions',
			'app/newPermission' : 'newPermission',
			'app/editPermission/:id' : 'editPermission',
			// hashs de Role
			'app/roles' : 'roles',
			'app/newRole' : 'newRole',
			'app/editRole/:id' : 'editRole',
			// hashs de Session
			'app/sessions' : 'sessions',
			'app/newSession' : 'newSession',
			'app/editSession/:id' : 'editSession',
			// hashs de User
			'app/users' : 'users',
			'app/newUser' : 'newUser',
			'app/editUser/:id' : 'editUser',
		},
		initialize : function() {
			this.App = new Marionette.Application();
			this.App.addRegions({
				mainRegion : CustomRegion
			});
			this.on('route', function(abc) {
				util.NProgress.start(true);
			});
		},

		index : function(path) {
			util.markActiveItem('dashboard');
			setTimeout(function() {
				util.NProgress.done(false, true);
			}, 500);
		},
		
		//configuracoes da aplicacao
		perfilAluno : function(id) {
			util.markActiveItem('perfilAluno');
			this.perfilAluno = new PerfilAluno({
				id : id,
			});
			this.App.mainRegion.show(this.perfilAluno);
		},
		
		listasExercicios : function(idAluno, idDisciplina) {
			util.markActiveItem('listasExercicios');
			this.listasExercicios = new ListasExercicios({
				idAluno : idAluno,
				idDisciplina : idDisciplina,
			});
			this.App.mainRegion.show(this.listasExercicios);
		},
		
		//configuração das rotas de Aluno
		alunos: function() {
			util.markActiveItem('alunos');
			this.pageAluno = new PageAluno();
			this.App.mainRegion.show(this.pageAluno);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Aluno',
				itemSubFolderName : 'Grid',
				url : 'app/alunos'
			});
		},

		newAluno: function() {
			util.markActiveItem('alunos');
			var formAluno = new FormAluno({
				model : new AlunoModel(),
			});
			this.App.mainRegion.show(formAluno);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Aluno',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/alunos'
			});
		},
		
		editAluno: function(idAluno) {
			var that = this;
			util.markActiveItem('alunos');
			var formAluno = null;
			if (this.pageAluno) {
				formAluno = new FormAluno({
					model : this.pageAluno.alunos.get(idAluno),
				});
				that.App.mainRegion.show(formAluno);
			} else {
				var model = new AlunoModel({
					id : idAluno,
				})
				model.fetch({
					success : function(model) {
						formAluno = new FormAluno({
							model : model,
						});
						that.App.mainRegion.show(formAluno);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Alunoos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/alunos'
				});
			}
		},
		
		//configuração das rotas de Disciplina
		disciplinas: function() {
			util.markActiveItem('disciplinas');
			this.pageDisciplina = new PageDisciplina();
			this.App.mainRegion.show(this.pageDisciplina);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Disciplina',
				itemSubFolderName : 'Grid',
				url : 'app/disciplinas'
			});
		},

		newDisciplina: function() {
			util.markActiveItem('disciplinas');
			var formDisciplina = new FormDisciplina({
				model : new DisciplinaModel(),
			});
			this.App.mainRegion.show(formDisciplina);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Disciplina',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/disciplinas'
			});
		},
		
		editDisciplina: function(idDisciplina) {
			var that = this;
			util.markActiveItem('disciplinas');
			var formDisciplina = null;
			if (this.pageDisciplina) {
				formDisciplina = new FormDisciplina({
					model : this.pageDisciplina.disciplinas.get(idDisciplina),
				});
				that.App.mainRegion.show(formDisciplina);
			} else {
				var model = new DisciplinaModel({
					id : idDisciplina,
				})
				model.fetch({
					success : function(model) {
						formDisciplina = new FormDisciplina({
							model : model,
						});
						that.App.mainRegion.show(formDisciplina);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Disciplinaos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/disciplinas'
				});
			}
		},
		
		//configuração das rotas de Lista
		listas: function() {
			util.markActiveItem('listas');
			this.pageLista = new PageLista();
			this.App.mainRegion.show(this.pageLista);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Lista',
				itemSubFolderName : 'Grid',
				url : 'app/listas'
			});
		},

		newLista: function() {
			util.markActiveItem('listas');
			var formLista = new FormLista({
				model : new ListaModel(),
			});
			this.App.mainRegion.show(formLista);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Lista',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/listas'
			});
		},
		
		editLista: function(idLista) {
			var that = this;
			util.markActiveItem('listas');
			var formLista = null;
			if (this.pageLista) {
				formLista = new FormLista({
					model : this.pageLista.listas.get(idLista),
				});
				that.App.mainRegion.show(formLista);
			} else {
				var model = new ListaModel({
					id : idLista,
				})
				model.fetch({
					success : function(model) {
						formLista = new FormLista({
							model : model,
						});
						that.App.mainRegion.show(formLista);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Listaos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/listas'
				});
			}
		},
		
		//configuração das rotas de Professor
		professors: function() {
			util.markActiveItem('professors');
			this.pageProfessor = new PageProfessor();
			this.App.mainRegion.show(this.pageProfessor);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Professor',
				itemSubFolderName : 'Grid',
				url : 'app/professors'
			});
		},

		newProfessor: function() {
			util.markActiveItem('professors');
			var formProfessor = new FormProfessor({
				model : new ProfessorModel(),
			});
			this.App.mainRegion.show(formProfessor);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Professor',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/professors'
			});
		},
		
		editProfessor: function(idProfessor) {
			var that = this;
			util.markActiveItem('professors');
			var formProfessor = null;
			if (this.pageProfessor) {
				formProfessor = new FormProfessor({
					model : this.pageProfessor.professors.get(idProfessor),
				});
				that.App.mainRegion.show(formProfessor);
			} else {
				var model = new ProfessorModel({
					id : idProfessor,
				})
				model.fetch({
					success : function(model) {
						formProfessor = new FormProfessor({
							model : model,
						});
						that.App.mainRegion.show(formProfessor);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Professoros',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/professors'
				});
			}
		},
		
		//configuração das rotas de Questao
		questaos: function() {
			util.markActiveItem('questaos');
			this.pageQuestao = new PageQuestao();
			this.App.mainRegion.show(this.pageQuestao);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Questão',
				itemSubFolderName : 'Grid',
				url : 'app/questaos'
			});
		},

		newQuestao: function() {
			util.markActiveItem('questaos');
			var formQuestao = new FormQuestao({
				model : new QuestaoModel(),
			});
			this.App.mainRegion.show(formQuestao);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Questão',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/questaos'
			});
		},
		
		editQuestao: function(idQuestao) {
			var that = this;
			util.markActiveItem('questaos');
			var formQuestao = null;
			if (this.pageQuestao) {
				formQuestao = new FormQuestao({
					model : this.pageQuestao.questaos.get(idQuestao),
				});
				that.App.mainRegion.show(formQuestao);
			} else {
				var model = new QuestaoModel({
					id : idQuestao,
				})
				model.fetch({
					success : function(model) {
						formQuestao = new FormQuestao({
							model : model,
						});
						that.App.mainRegion.show(formQuestao);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Questaoos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/questaos'
				});
			}
		},
		
		//configuração das rotas de QuestaoDesafio
		questaoDesafios: function() {
			util.markActiveItem('questaoDesafios');
			this.pageQuestaoDesafio = new PageQuestaoDesafio();
			this.App.mainRegion.show(this.pageQuestaoDesafio);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Questão Desafio',
				itemSubFolderName : 'Grid',
				url : 'app/questaoDesafios'
			});
		},

		newQuestaoDesafio: function() {
			util.markActiveItem('questaoDesafios');
			var formQuestaoDesafio = new FormQuestaoDesafio({
				model : new QuestaoDesafioModel(),
			});
			this.App.mainRegion.show(formQuestaoDesafio);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Questão Desafio',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/questaoDesafios'
			});
		},
		
		editQuestaoDesafio: function(idQuestaoDesafio) {
			var that = this;
			util.markActiveItem('questaoDesafios');
			var formQuestaoDesafio = null;
			if (this.pageQuestaoDesafio) {
				formQuestaoDesafio = new FormQuestaoDesafio({
					model : this.pageQuestaoDesafio.questaoDesafios.get(idQuestaoDesafio),
				});
				that.App.mainRegion.show(formQuestaoDesafio);
			} else {
				var model = new QuestaoDesafioModel({
					id : idQuestaoDesafio,
				})
				model.fetch({
					success : function(model) {
						formQuestaoDesafio = new FormQuestaoDesafio({
							model : model,
						});
						that.App.mainRegion.show(formQuestaoDesafio);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'QuestaoDesafioos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/questaoDesafios'
				});
			}
		},
		
		//configuração das rotas de Ranking
		rankings: function() {
			util.markActiveItem('rankings');
			this.pageRanking = new PageRanking();
			this.App.mainRegion.show(this.pageRanking);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Ranking',
				itemSubFolderName : 'Grid',
				url : 'app/rankings'
			});
		},

		newRanking: function() {
			util.markActiveItem('rankings');
			var formRanking = new FormRanking({
				model : new RankingModel(),
			});
			this.App.mainRegion.show(formRanking);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Ranking',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/rankings'
			});
		},
		
		editRanking: function(idRanking) {
			var that = this;
			util.markActiveItem('rankings');
			var formRanking = null;
			if (this.pageRanking) {
				formRanking = new FormRanking({
					model : this.pageRanking.rankings.get(idRanking),
				});
				that.App.mainRegion.show(formRanking);
			} else {
				var model = new RankingModel({
					id : idRanking,
				})
				model.fetch({
					success : function(model) {
						formRanking = new FormRanking({
							model : model,
						});
						that.App.mainRegion.show(formRanking);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Rankingos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/rankings'
				});
			}
		},
		
		//configuração das rotas de Bairro
		bairros: function() {
			util.markActiveItem('bairros');
			this.pageBairro = new PageBairro();
			this.App.mainRegion.show(this.pageBairro);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Bairro',
				itemSubFolderName : 'Grid',
				url : 'app/bairros'
			});
		},

		newBairro: function() {
			util.markActiveItem('bairros');
			var formBairro = new FormBairro({
				model : new BairroModel(),
			});
			this.App.mainRegion.show(formBairro);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Bairro',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/bairros'
			});
		},
		
		editBairro: function(idBairro) {
			var that = this;
			util.markActiveItem('bairros');
			var formBairro = null;
			if (this.pageBairro) {
				formBairro = new FormBairro({
					model : this.pageBairro.bairros.get(idBairro),
				});
				that.App.mainRegion.show(formBairro);
			} else {
				var model = new BairroModel({
					id : idBairro,
				})
				model.fetch({
					success : function(model) {
						formBairro = new FormBairro({
							model : model,
						});
						that.App.mainRegion.show(formBairro);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Bairroos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/bairros'
				});
			}
		},
		
		//configuração das rotas de Cep
		ceps: function() {
			util.markActiveItem('ceps');
			this.pageCep = new PageCep();
			this.App.mainRegion.show(this.pageCep);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cep',
				itemSubFolderName : 'Grid',
				url : 'app/ceps'
			});
		},

		newCep: function() {
			util.markActiveItem('ceps');
			var formCep = new FormCep({
				model : new CepModel(),
			});
			this.App.mainRegion.show(formCep);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cep',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/ceps'
			});
		},
		
		editCep: function(idCep) {
			var that = this;
			util.markActiveItem('ceps');
			var formCep = null;
			if (this.pageCep) {
				formCep = new FormCep({
					model : this.pageCep.ceps.get(idCep),
				});
				that.App.mainRegion.show(formCep);
			} else {
				var model = new CepModel({
					id : idCep,
				})
				model.fetch({
					success : function(model) {
						formCep = new FormCep({
							model : model,
						});
						that.App.mainRegion.show(formCep);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cepos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/ceps'
				});
			}
		},
		
		//configuração das rotas de Cidade
		cidades: function() {
			util.markActiveItem('cidades');
			this.pageCidade = new PageCidade();
			this.App.mainRegion.show(this.pageCidade);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cidade',
				itemSubFolderName : 'Grid',
				url : 'app/cidades'
			});
		},

		newCidade: function() {
			util.markActiveItem('cidades');
			var formCidade = new FormCidade({
				model : new CidadeModel(),
			});
			this.App.mainRegion.show(formCidade);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cidade',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/cidades'
			});
		},
		
		editCidade: function(idCidade) {
			var that = this;
			util.markActiveItem('cidades');
			var formCidade = null;
			if (this.pageCidade) {
				formCidade = new FormCidade({
					model : this.pageCidade.cidades.get(idCidade),
				});
				that.App.mainRegion.show(formCidade);
			} else {
				var model = new CidadeModel({
					id : idCidade,
				})
				model.fetch({
					success : function(model) {
						formCidade = new FormCidade({
							model : model,
						});
						that.App.mainRegion.show(formCidade);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Cidadeos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/cidades'
				});
			}
		},
		
		//configuração das rotas de Endereco
		enderecos: function() {
			util.markActiveItem('enderecos');
			this.pageEndereco = new PageEndereco();
			this.App.mainRegion.show(this.pageEndereco);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Endereco',
				itemSubFolderName : 'Grid',
				url : 'app/enderecos'
			});
		},

		newEndereco: function() {
			util.markActiveItem('enderecos');
			var formEndereco = new FormEndereco({
				model : new EnderecoModel(),
			});
			this.App.mainRegion.show(formEndereco);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Endereco',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/enderecos'
			});
		},
		
		editEndereco: function(idEndereco) {
			var that = this;
			util.markActiveItem('enderecos');
			var formEndereco = null;
			if (this.pageEndereco) {
				formEndereco = new FormEndereco({
					model : this.pageEndereco.enderecos.get(idEndereco),
				});
				that.App.mainRegion.show(formEndereco);
			} else {
				var model = new EnderecoModel({
					id : idEndereco,
				})
				model.fetch({
					success : function(model) {
						formEndereco = new FormEndereco({
							model : model,
						});
						that.App.mainRegion.show(formEndereco);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Enderecoos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/enderecos'
				});
			}
		},
		
		//configuração das rotas de Estado
		estados: function() {
			util.markActiveItem('estados');
			this.pageEstado = new PageEstado();
			this.App.mainRegion.show(this.pageEstado);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Estado',
				itemSubFolderName : 'Grid',
				url : 'app/estados'
			});
		},

		newEstado: function() {
			util.markActiveItem('estados');
			var formEstado = new FormEstado({
				model : new EstadoModel(),
			});
			this.App.mainRegion.show(formEstado);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Estado',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/estados'
			});
		},
		
		editEstado: function(idEstado) {
			var that = this;
			util.markActiveItem('estados');
			var formEstado = null;
			if (this.pageEstado) {
				formEstado = new FormEstado({
					model : this.pageEstado.estados.get(idEstado),
				});
				that.App.mainRegion.show(formEstado);
			} else {
				var model = new EstadoModel({
					id : idEstado,
				})
				model.fetch({
					success : function(model) {
						formEstado = new FormEstado({
							model : model,
						});
						that.App.mainRegion.show(formEstado);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Estadoos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/estados'
				});
			}
		},
		
		//configuração das rotas de Pais
		paiss: function() {
			util.markActiveItem('paiss');
			this.pagePais = new PagePais();
			this.App.mainRegion.show(this.pagePais);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Pais',
				itemSubFolderName : 'Grid',
				url : 'app/paiss'
			});
		},

		newPais: function() {
			util.markActiveItem('paiss');
			var formPais = new FormPais({
				model : new PaisModel(),
			});
			this.App.mainRegion.show(formPais);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Pais',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/paiss'
			});
		},
		
		editPais: function(idPais) {
			var that = this;
			util.markActiveItem('paiss');
			var formPais = null;
			if (this.pagePais) {
				formPais = new FormPais({
					model : this.pagePais.paiss.get(idPais),
				});
				that.App.mainRegion.show(formPais);
			} else {
				var model = new PaisModel({
					id : idPais,
				})
				model.fetch({
					success : function(model) {
						formPais = new FormPais({
							model : model,
						});
						that.App.mainRegion.show(formPais);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Paisos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/paiss'
				});
			}
		},
		
		//configuração das rotas de Client
		clients: function() {
			util.markActiveItem('clients');
			this.pageClient = new PageClient();
			this.App.mainRegion.show(this.pageClient);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cliente',
				itemSubFolderName : 'Grid',
				url : 'app/clients'
			});
		},

		newClient: function() {
			util.markActiveItem('clients');
			var formClient = new FormClient({
				model : new ClientModel(),
			});
			this.App.mainRegion.show(formClient);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Cliente',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/clients'
			});
		},
		
		editClient: function(idClient) {
			var that = this;
			util.markActiveItem('clients');
			var formClient = null;
			if (this.pageClient) {
				formClient = new FormClient({
					model : this.pageClient.clients.get(idClient),
				});
				that.App.mainRegion.show(formClient);
			} else {
				var model = new ClientModel({
					id : idClient,
				})
				model.fetch({
					success : function(model) {
						formClient = new FormClient({
							model : model,
						});
						that.App.mainRegion.show(formClient);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Clientos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/clients'
				});
			}
		},
		
		//configuração das rotas de Item
		items: function() {
			util.markActiveItem('items');
			this.pageItem = new PageItem();
			this.App.mainRegion.show(this.pageItem);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Item',
				itemSubFolderName : 'Grid',
				url : 'app/items'
			});
		},

		newItem: function() {
			util.markActiveItem('items');
			var formItem = new FormItem({
				model : new ItemModel(),
			});
			this.App.mainRegion.show(formItem);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Item',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/items'
			});
		},
		
		editItem: function(idItem) {
			var that = this;
			util.markActiveItem('items');
			var formItem = null;
			if (this.pageItem) {
				formItem = new FormItem({
					model : this.pageItem.items.get(idItem),
				});
				that.App.mainRegion.show(formItem);
			} else {
				var model = new ItemModel({
					id : idItem,
				})
				model.fetch({
					success : function(model) {
						formItem = new FormItem({
							model : model,
						});
						that.App.mainRegion.show(formItem);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Itemos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/items'
				});
			}
		},
		
		//configuração das rotas de ItemType
		itemTypes: function() {
			util.markActiveItem('itemTypes');
			this.pageItemType = new PageItemType();
			this.App.mainRegion.show(this.pageItemType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Tipo de Item',
				itemSubFolderName : 'Grid',
				url : 'app/itemTypes'
			});
		},

		newItemType: function() {
			util.markActiveItem('itemTypes');
			var formItemType = new FormItemType({
				model : new ItemTypeModel(),
			});
			this.App.mainRegion.show(formItemType);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Tipo de Item',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/itemTypes'
			});
		},
		
		editItemType: function(idItemType) {
			var that = this;
			util.markActiveItem('itemTypes');
			var formItemType = null;
			if (this.pageItemType) {
				formItemType = new FormItemType({
					model : this.pageItemType.itemTypes.get(idItemType),
				});
				that.App.mainRegion.show(formItemType);
			} else {
				var model = new ItemTypeModel({
					id : idItemType,
				})
				model.fetch({
					success : function(model) {
						formItemType = new FormItemType({
							model : model,
						});
						that.App.mainRegion.show(formItemType);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'ItemTypeos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/itemTypes'
				});
			}
		},
		
		//configuração das rotas de Operation
		operations: function() {
			util.markActiveItem('operations');
			this.pageOperation = new PageOperation();
			this.App.mainRegion.show(this.pageOperation);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Operação',
				itemSubFolderName : 'Grid',
				url : 'app/operations'
			});
		},

		newOperation: function() {
			util.markActiveItem('operations');
			var formOperation = new FormOperation({
				model : new OperationModel(),
			});
			this.App.mainRegion.show(formOperation);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Operação',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/operations'
			});
		},
		
		editOperation: function(idOperation) {
			var that = this;
			util.markActiveItem('operations');
			var formOperation = null;
			if (this.pageOperation) {
				formOperation = new FormOperation({
					model : this.pageOperation.operations.get(idOperation),
				});
				that.App.mainRegion.show(formOperation);
			} else {
				var model = new OperationModel({
					id : idOperation,
				})
				model.fetch({
					success : function(model) {
						formOperation = new FormOperation({
							model : model,
						});
						that.App.mainRegion.show(formOperation);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Operationos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/operations'
				});
			}
		},
		
		//configuração das rotas de Permission
		permissions: function() {
			util.markActiveItem('permissions');
			this.pagePermission = new PagePermission();
			this.App.mainRegion.show(this.pagePermission);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Permissão',
				itemSubFolderName : 'Grid',
				url : 'app/permissions'
			});
		},

		newPermission: function() {
			util.markActiveItem('permissions');
			var formPermission = new FormPermission({
				model : new PermissionModel(),
			});
			this.App.mainRegion.show(formPermission);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Permissão',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/permissions'
			});
		},
		
		editPermission: function(idPermission) {
			var that = this;
			util.markActiveItem('permissions');
			var formPermission = null;
			if (this.pagePermission) {
				formPermission = new FormPermission({
					model : this.pagePermission.permissions.get(idPermission),
				});
				that.App.mainRegion.show(formPermission);
			} else {
				var model = new PermissionModel({
					id : idPermission,
				})
				model.fetch({
					success : function(model) {
						formPermission = new FormPermission({
							model : model,
						});
						that.App.mainRegion.show(formPermission);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Permissionos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/permissions'
				});
			}
		},
		
		//configuração das rotas de Role
		roles: function() {
			util.markActiveItem('roles');
			this.pageRole = new PageRole();
			this.App.mainRegion.show(this.pageRole);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Papel',
				itemSubFolderName : 'Grid',
				url : 'app/roles'
			});
		},

		newRole: function() {
			util.markActiveItem('roles');
			var formRole = new FormRole({
				model : new RoleModel(),
			});
			this.App.mainRegion.show(formRole);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Papel',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/roles'
			});
		},
		
		editRole: function(idRole) {
			var that = this;
			util.markActiveItem('roles');
			var formRole = null;
			if (this.pageRole) {
				formRole = new FormRole({
					model : this.pageRole.roles.get(idRole),
				});
				that.App.mainRegion.show(formRole);
			} else {
				var model = new RoleModel({
					id : idRole,
				})
				model.fetch({
					success : function(model) {
						formRole = new FormRole({
							model : model,
						});
						that.App.mainRegion.show(formRole);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Roleos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/roles'
				});
			}
		},
		
		//configuração das rotas de Session
		sessions: function() {
			util.markActiveItem('sessions');
			this.pageSession = new PageSession();
			this.App.mainRegion.show(this.pageSession);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Sessão',
				itemSubFolderName : 'Grid',
				url : 'app/sessions'
			});
		},

		newSession: function() {
			util.markActiveItem('sessions');
			var formSession = new FormSession({
				model : new SessionModel(),
			});
			this.App.mainRegion.show(formSession);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Sessão',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/sessions'
			});
		},
		
		editSession: function(idSession) {
			var that = this;
			util.markActiveItem('sessions');
			var formSession = null;
			if (this.pageSession) {
				formSession = new FormSession({
					model : this.pageSession.sessions.get(idSession),
				});
				that.App.mainRegion.show(formSession);
			} else {
				var model = new SessionModel({
					id : idSession,
				})
				model.fetch({
					success : function(model) {
						formSession = new FormSession({
							model : model,
						});
						that.App.mainRegion.show(formSession);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Sessionos',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/sessions'
				});
			}
		},
		
		//configuração das rotas de User
		users: function() {
			util.markActiveItem('users');
			this.pageUser = new PageUser();
			this.App.mainRegion.show(this.pageUser);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Usuário',
				itemSubFolderName : 'Grid',
				url : 'app/users'
			});
		},

		newUser: function() {
			util.markActiveItem('users');
			var formUser = new FormUser({
				model : new UserModel(),
			});
			this.App.mainRegion.show(formUser);
			util.breadcrumb({
				iconClass : 'fa-desktop',
				itemLabel : 'Usuário',
				itemSubFolderName : 'Formulário de cadastro',
				url : 'app/users'
			});
		},
		
		editUser: function(idUser) {
			var that = this;
			util.markActiveItem('users');
			var formUser = null;
			if (this.pageUser) {
				formUser = new FormUser({
					model : this.pageUser.users.get(idUser),
				});
				that.App.mainRegion.show(formUser);
			} else {
				var model = new UserModel({
					id : idUser,
				})
				model.fetch({
					success : function(model) {
						formUser = new FormUser({
							model : model,
						});
						that.App.mainRegion.show(formUser);
					},
					error : function(x, y, z) {
						console.error(x, y, z);
					}
				})
				util.breadcrumb({
					iconClass : 'fa-calendar',
					itemLabel : 'Useros',
					itemSubFolderName : 'Formulário de atualização',
					url : 'app/users'
				});
			}
		},
		
		start : function() {
			Backbone.history.start();
		}
	});
	return AppRouter;
});
