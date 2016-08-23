define(function(require) {
	var Router = require('Router');
	describe("Rotas", function() {

		beforeEach(function() {
			try {
				Backbone.history.stop();
			} catch (e) {
				console.error(e);
			}
		});
		
		afterEach(function() {
			// Reset URL
			var router = new Router();
			router.navigate("");
		});
				it("Rota de \"Alunos\"", function() {
			spyOn(Router.prototype, "Alunos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Alunos', true);
			expect(Router.prototype.Alunos).toHaveBeenCalled();
		});

		it("Rota de \"newaluno\"", function() {
			spyOn(Router.prototype, "newaluno")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newaluno', true);
			expect(Router.prototype.newaluno).toHaveBeenCalled();
		});
		
		it("Rota de \"editaluno\"", function() {
			spyOn(Router.prototype, "editaluno")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editaluno/1', true);
			expect(Router.prototype.editaluno).toHaveBeenCalled();
		});
		it("Rota de \"Disciplinas\"", function() {
			spyOn(Router.prototype, "Disciplinas")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Disciplinas', true);
			expect(Router.prototype.Disciplinas).toHaveBeenCalled();
		});

		it("Rota de \"newdisciplina\"", function() {
			spyOn(Router.prototype, "newdisciplina")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newdisciplina', true);
			expect(Router.prototype.newdisciplina).toHaveBeenCalled();
		});
		
		it("Rota de \"editdisciplina\"", function() {
			spyOn(Router.prototype, "editdisciplina")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editdisciplina/1', true);
			expect(Router.prototype.editdisciplina).toHaveBeenCalled();
		});
		it("Rota de \"Listas\"", function() {
			spyOn(Router.prototype, "Listas")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Listas', true);
			expect(Router.prototype.Listas).toHaveBeenCalled();
		});

		it("Rota de \"newlista\"", function() {
			spyOn(Router.prototype, "newlista")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newlista', true);
			expect(Router.prototype.newlista).toHaveBeenCalled();
		});
		
		it("Rota de \"editlista\"", function() {
			spyOn(Router.prototype, "editlista")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editlista/1', true);
			expect(Router.prototype.editlista).toHaveBeenCalled();
		});
		it("Rota de \"Professors\"", function() {
			spyOn(Router.prototype, "Professors")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Professors', true);
			expect(Router.prototype.Professors).toHaveBeenCalled();
		});

		it("Rota de \"newprofessor\"", function() {
			spyOn(Router.prototype, "newprofessor")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newprofessor', true);
			expect(Router.prototype.newprofessor).toHaveBeenCalled();
		});
		
		it("Rota de \"editprofessor\"", function() {
			spyOn(Router.prototype, "editprofessor")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editprofessor/1', true);
			expect(Router.prototype.editprofessor).toHaveBeenCalled();
		});
		it("Rota de \"Questaos\"", function() {
			spyOn(Router.prototype, "Questaos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Questaos', true);
			expect(Router.prototype.Questaos).toHaveBeenCalled();
		});

		it("Rota de \"newquestao\"", function() {
			spyOn(Router.prototype, "newquestao")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newquestao', true);
			expect(Router.prototype.newquestao).toHaveBeenCalled();
		});
		
		it("Rota de \"editquestao\"", function() {
			spyOn(Router.prototype, "editquestao")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editquestao/1', true);
			expect(Router.prototype.editquestao).toHaveBeenCalled();
		});
		it("Rota de \"QuestaoDesafios\"", function() {
			spyOn(Router.prototype, "QuestaoDesafios")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/QuestaoDesafios', true);
			expect(Router.prototype.QuestaoDesafios).toHaveBeenCalled();
		});

		it("Rota de \"newquestaoDesafio\"", function() {
			spyOn(Router.prototype, "newquestaoDesafio")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newquestaoDesafio', true);
			expect(Router.prototype.newquestaoDesafio).toHaveBeenCalled();
		});
		
		it("Rota de \"editquestaoDesafio\"", function() {
			spyOn(Router.prototype, "editquestaoDesafio")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editquestaoDesafio/1', true);
			expect(Router.prototype.editquestaoDesafio).toHaveBeenCalled();
		});
		it("Rota de \"Rankings\"", function() {
			spyOn(Router.prototype, "Rankings")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Rankings', true);
			expect(Router.prototype.Rankings).toHaveBeenCalled();
		});

		it("Rota de \"newranking\"", function() {
			spyOn(Router.prototype, "newranking")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newranking', true);
			expect(Router.prototype.newranking).toHaveBeenCalled();
		});
		
		it("Rota de \"editranking\"", function() {
			spyOn(Router.prototype, "editranking")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editranking/1', true);
			expect(Router.prototype.editranking).toHaveBeenCalled();
		});
		it("Rota de \"Bairros\"", function() {
			spyOn(Router.prototype, "Bairros")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Bairros', true);
			expect(Router.prototype.Bairros).toHaveBeenCalled();
		});

		it("Rota de \"newbairro\"", function() {
			spyOn(Router.prototype, "newbairro")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newbairro', true);
			expect(Router.prototype.newbairro).toHaveBeenCalled();
		});
		
		it("Rota de \"editbairro\"", function() {
			spyOn(Router.prototype, "editbairro")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editbairro/1', true);
			expect(Router.prototype.editbairro).toHaveBeenCalled();
		});
		it("Rota de \"Ceps\"", function() {
			spyOn(Router.prototype, "Ceps")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Ceps', true);
			expect(Router.prototype.Ceps).toHaveBeenCalled();
		});

		it("Rota de \"newcep\"", function() {
			spyOn(Router.prototype, "newcep")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcep', true);
			expect(Router.prototype.newcep).toHaveBeenCalled();
		});
		
		it("Rota de \"editcep\"", function() {
			spyOn(Router.prototype, "editcep")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcep/1', true);
			expect(Router.prototype.editcep).toHaveBeenCalled();
		});
		it("Rota de \"Cidades\"", function() {
			spyOn(Router.prototype, "Cidades")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Cidades', true);
			expect(Router.prototype.Cidades).toHaveBeenCalled();
		});

		it("Rota de \"newcidade\"", function() {
			spyOn(Router.prototype, "newcidade")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newcidade', true);
			expect(Router.prototype.newcidade).toHaveBeenCalled();
		});
		
		it("Rota de \"editcidade\"", function() {
			spyOn(Router.prototype, "editcidade")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editcidade/1', true);
			expect(Router.prototype.editcidade).toHaveBeenCalled();
		});
		it("Rota de \"Enderecos\"", function() {
			spyOn(Router.prototype, "Enderecos")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Enderecos', true);
			expect(Router.prototype.Enderecos).toHaveBeenCalled();
		});

		it("Rota de \"newendereco\"", function() {
			spyOn(Router.prototype, "newendereco")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newendereco', true);
			expect(Router.prototype.newendereco).toHaveBeenCalled();
		});
		
		it("Rota de \"editendereco\"", function() {
			spyOn(Router.prototype, "editendereco")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editendereco/1', true);
			expect(Router.prototype.editendereco).toHaveBeenCalled();
		});
		it("Rota de \"Estados\"", function() {
			spyOn(Router.prototype, "Estados")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Estados', true);
			expect(Router.prototype.Estados).toHaveBeenCalled();
		});

		it("Rota de \"newestado\"", function() {
			spyOn(Router.prototype, "newestado")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newestado', true);
			expect(Router.prototype.newestado).toHaveBeenCalled();
		});
		
		it("Rota de \"editestado\"", function() {
			spyOn(Router.prototype, "editestado")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editestado/1', true);
			expect(Router.prototype.editestado).toHaveBeenCalled();
		});
		it("Rota de \"Paiss\"", function() {
			spyOn(Router.prototype, "Paiss")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Paiss', true);
			expect(Router.prototype.Paiss).toHaveBeenCalled();
		});

		it("Rota de \"newpais\"", function() {
			spyOn(Router.prototype, "newpais")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newpais', true);
			expect(Router.prototype.newpais).toHaveBeenCalled();
		});
		
		it("Rota de \"editpais\"", function() {
			spyOn(Router.prototype, "editpais")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editpais/1', true);
			expect(Router.prototype.editpais).toHaveBeenCalled();
		});
		it("Rota de \"Clients\"", function() {
			spyOn(Router.prototype, "Clients")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Clients', true);
			expect(Router.prototype.Clients).toHaveBeenCalled();
		});

		it("Rota de \"newclient\"", function() {
			spyOn(Router.prototype, "newclient")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newclient', true);
			expect(Router.prototype.newclient).toHaveBeenCalled();
		});
		
		it("Rota de \"editclient\"", function() {
			spyOn(Router.prototype, "editclient")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editclient/1', true);
			expect(Router.prototype.editclient).toHaveBeenCalled();
		});
		it("Rota de \"Items\"", function() {
			spyOn(Router.prototype, "Items")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Items', true);
			expect(Router.prototype.Items).toHaveBeenCalled();
		});

		it("Rota de \"newitem\"", function() {
			spyOn(Router.prototype, "newitem")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newitem', true);
			expect(Router.prototype.newitem).toHaveBeenCalled();
		});
		
		it("Rota de \"edititem\"", function() {
			spyOn(Router.prototype, "edititem")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edititem/1', true);
			expect(Router.prototype.edititem).toHaveBeenCalled();
		});
		it("Rota de \"ItemTypes\"", function() {
			spyOn(Router.prototype, "ItemTypes")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/ItemTypes', true);
			expect(Router.prototype.ItemTypes).toHaveBeenCalled();
		});

		it("Rota de \"newitemType\"", function() {
			spyOn(Router.prototype, "newitemType")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newitemType', true);
			expect(Router.prototype.newitemType).toHaveBeenCalled();
		});
		
		it("Rota de \"edititemType\"", function() {
			spyOn(Router.prototype, "edititemType")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edititemType/1', true);
			expect(Router.prototype.edititemType).toHaveBeenCalled();
		});
		it("Rota de \"Operations\"", function() {
			spyOn(Router.prototype, "Operations")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Operations', true);
			expect(Router.prototype.Operations).toHaveBeenCalled();
		});

		it("Rota de \"newoperation\"", function() {
			spyOn(Router.prototype, "newoperation")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newoperation', true);
			expect(Router.prototype.newoperation).toHaveBeenCalled();
		});
		
		it("Rota de \"editoperation\"", function() {
			spyOn(Router.prototype, "editoperation")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editoperation/1', true);
			expect(Router.prototype.editoperation).toHaveBeenCalled();
		});
		it("Rota de \"Permissions\"", function() {
			spyOn(Router.prototype, "Permissions")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Permissions', true);
			expect(Router.prototype.Permissions).toHaveBeenCalled();
		});

		it("Rota de \"newpermission\"", function() {
			spyOn(Router.prototype, "newpermission")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newpermission', true);
			expect(Router.prototype.newpermission).toHaveBeenCalled();
		});
		
		it("Rota de \"editpermission\"", function() {
			spyOn(Router.prototype, "editpermission")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editpermission/1', true);
			expect(Router.prototype.editpermission).toHaveBeenCalled();
		});
		it("Rota de \"Roles\"", function() {
			spyOn(Router.prototype, "Roles")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Roles', true);
			expect(Router.prototype.Roles).toHaveBeenCalled();
		});

		it("Rota de \"newrole\"", function() {
			spyOn(Router.prototype, "newrole")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newrole', true);
			expect(Router.prototype.newrole).toHaveBeenCalled();
		});
		
		it("Rota de \"editrole\"", function() {
			spyOn(Router.prototype, "editrole")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editrole/1', true);
			expect(Router.prototype.editrole).toHaveBeenCalled();
		});
		it("Rota de \"Sessions\"", function() {
			spyOn(Router.prototype, "Sessions")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Sessions', true);
			expect(Router.prototype.Sessions).toHaveBeenCalled();
		});

		it("Rota de \"newsession\"", function() {
			spyOn(Router.prototype, "newsession")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newsession', true);
			expect(Router.prototype.newsession).toHaveBeenCalled();
		});
		
		it("Rota de \"editsession\"", function() {
			spyOn(Router.prototype, "editsession")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/editsession/1', true);
			expect(Router.prototype.editsession).toHaveBeenCalled();
		});
		it("Rota de \"Users\"", function() {
			spyOn(Router.prototype, "Users")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/Users', true);
			expect(Router.prototype.Users).toHaveBeenCalled();
		});

		it("Rota de \"newuser\"", function() {
			spyOn(Router.prototype, "newuser")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/newuser', true);
			expect(Router.prototype.newuser).toHaveBeenCalled();
		});
		
		it("Rota de \"edituser\"", function() {
			spyOn(Router.prototype, "edituser")
			var router = new Router();
			Backbone.history.start();
			router.navigate('app/edituser/1', true);
			expect(Router.prototype.edituser).toHaveBeenCalled();
		});
	});
})
