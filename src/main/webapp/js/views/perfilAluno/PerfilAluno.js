/* generated: 18/09/2015 09:02:56 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
//	var PainelAtendimentoModel = require('models/PainelAtendimentoModel');
//	var ConfiguracaoCollection = require('collections/ConfiguracaoCollection');
//	var PainelAtendimentoCollection = require('collections/PainelAtendimentoCollection');
	var PerfilAlunoTemplate = require('text!views/perfilAluno/tpl/PerfilAlunoTemplate.html');
//	var InformacoesPainel = require('views/painelAtendimento/InformacoesPainel');
//	var VideoPainel = require('views/painelAtendimento/VideoPainel');
//	var exibeVideo = true;
	
	var PerfilAluno = Marionette.LayoutView.extend({
		template : _.template(PerfilAlunoTemplate),

		regions : {
//			painelAtendimentoRegion : '#painelAtendimento',
		},

		events : {
//			'click #botao' : 'chamaUrl'

		},

//		chamaUrl : function() {
//
//		},
		ui : {
//			dataAtual : '#dataAtual',
//			horaAtual : '#horaAtual',
//			mensagemExibida : '#mensagemExibida',
//			imgLogoGestor : '#imgLogoGestor',
		},

		initialize : function(opt) {

//			var that = this;
//			this.cnes = opt.cnes
//			this.idSetor = opt.idSetor;
//			this.painelAtendimentoModel = new PainelAtendimentoModel();
//			this.configuracaoInicialPainel = new PainelAtendimentoModel();
//			this.configuracaoInicialPainel.urlRoot = 'rs/crud/painelAtendimento/carregarConfiguracaoInicial'
////aquipainel
//				
//			this.videoPainel = new VideoPainel();
//			this.informacoesPainel = new InformacoesPainel();
//			this.consultasRealizadas = 0;
//			this.reiniciaVideo = false;
//			this.urlTextToSpeech = null;
//
//			var configuracaoCollection = new ConfiguracaoCollection();
//			configuracaoCollection.fetch({
//				resetState : true,
//
//				success : function(_coll, _resp, _opt) {
//					if (_resp) {
//						that.urlTextToSpeech = _.first(_resp).urlTextToSpeech;
//					}
//				},
//				error : function(_coll, _resp, _opt) {
//					util.Bootbox.alert("Erro ao buscar configuração. Certifique-se de ter preenchido todos os valores");
//					util.logError(_resp);
//				}
//			});

//			this.buscaConfiguracaoInicial();

			this.on('show', function() {

//				var isExibeVideo = new PainelAtendimentoModel();
//				isExibeVideo.urlRoot = 'rs/crud/painelAtendimento/isExibeVideo';
//				
//				isExibeVideo.fetch({
//					resetState : true,
//					success : function(_coll, _resp, _opt) {
//						if (_resp) {
//							that.painelAtendimentoRegion.show(that.videoPainel);
//						} else {
//							exibeVideo = false;
//						}
//					},
//					error : function(_coll, _resp, _opt) {
//						util.showMessage('error', 'Problema ao buscar por parâmetro que define se o video será exibido');
//						util.logError(_resp);
//					}
//				});
//				
//				this.exibeDataCorrente();
//
//				this.buscaInformacoesPainel = function() {
//
//					console.info("Número de acesso ao serviço do Aghos: " + that.consultasRealizadas);
//
//					that.consultasRealizadas++;
//					// that.idHospital = 165;
//					// that.idSetor = 255;
//
//					that.painelAtendimentoModel.set({
//						cnes : that.cnes,
//						idSetor : that.idSetor,
//					});
//
//					that.painelAtendimentoModel.fetch({
//						resetState : true,
//						data : {
//							'cnes' : that.cnes,
//							'idSetor' : that.idSetor,
//						},
//						success : function(_coll, _resp, _opt) {
//							that.exibeDataCorrente();
//							if (_resp) {
//								var painelAtendimento = that.painelAtendimentoModel;
//								that.exibeConfiguracao(painelAtendimento);
//								that.exibePaciente(painelAtendimento);
//							}
//						},
//						error : function(_coll, _resp, _opt) {
////							console.error(_coll, _resp, _opt);
//							util.logError(_resp);
//						}
//					});
//				};
//
//				// Executa de 5 em 5 segundos a funcao passada
//				util.resfresh(5, this.buscaInformacoesPainel);

			});
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
