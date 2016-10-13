package br.com.gamification.rs;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import br.com.gamification.core.json.JsonError;
import br.com.gamification.core.json.JsonPaginator;
import br.com.gamification.json.JsonQuestaoDesafio;
import br.com.gamification.model.Questao;
import br.com.gamification.model.QuestaoDesafio;
import br.com.gamification.service.QuestaoDesafioService;
import br.com.gamification.model.filter.FilterQuestaoDesafio;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.service.UserService;
import br.com.gamification.core.utils.Parser;
import br.com.gamification.core.rs.exception.ValidationException;
import br.com.gamification.core.security.SpringSecurityUserContext;
/**
*  generated: 23/08/2016 08:32:12
**/

@Path("/crud/questaoDesafios")
public class QuestaoDesafioResources {

	@Inject
	QuestaoDesafioService questaoDesafioService;
	
	
	public static final Logger LOGGER = Logger.getLogger(QuestaoDesafioResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterQuestaoDesafio> paginationParams = new PaginationParams<FilterQuestaoDesafio>(uriInfo, FilterQuestaoDesafio.class);

			List<JsonQuestaoDesafio> jsonQuestaoDesafios = Parser.toListJsonQuestaoDesafios(questaoDesafioService.filter(paginationParams));
			response = Response.ok(jsonQuestaoDesafios).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e,message, null)).build();
		}
		return response;
	}

	@GET
	@Path("all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all() {
		Response response = null;
		try {
			List<JsonQuestaoDesafio> jsonQuestaoDesafios = Parser.toListJsonQuestaoDesafios(questaoDesafioService.all());
			response = Response.ok(jsonQuestaoDesafios).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message, null)).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all(@Context UriInfo uriInfo) {
		Response response = null;
		Pager<QuestaoDesafio> questaoDesafios = null;

		try {
			PaginationParams<FilterQuestaoDesafio> paginationParams = new PaginationParams<FilterQuestaoDesafio>(uriInfo, FilterQuestaoDesafio.class);
			questaoDesafios = questaoDesafioService.all(paginationParams);
			JsonPaginator<JsonQuestaoDesafio> paginator = new JsonPaginator<JsonQuestaoDesafio>(Parser.toListJsonQuestaoDesafios(questaoDesafios.getItens()), questaoDesafios.getActualPage(), questaoDesafios.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar questaoDesafios para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message, uriInfo.getQueryParameters().toString())).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response get(@PathParam("id") Integer id) {
		try {

			QuestaoDesafio questaoDesafio = questaoDesafioService.get(id);

			return Response.ok().entity(Parser.toJson(questaoDesafio)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonQuestaoDesafio jsonQuestaoDesafio) {
		try {

			QuestaoDesafio questaoDesafio = Parser.toEntity(jsonQuestaoDesafio);
			questaoDesafio = questaoDesafioService.save(questaoDesafio);
			return Response.ok().entity(Parser.toJson(questaoDesafio)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonQuestaoDesafio.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonQuestaoDesafio, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  questaoDesafio [ %s ] parametros [ %s ]", e.getMessage(), jsonQuestaoDesafio.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonQuestaoDesafio)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonQuestaoDesafio jsonQuestaoDesafio) {
		try {
			QuestaoDesafio questaoDesafio = Parser.toEntity(jsonQuestaoDesafio);

			questaoDesafio = questaoDesafioService.save(questaoDesafio);
			return Response.ok().entity(Parser.toJson(questaoDesafio)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonQuestaoDesafio.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonQuestaoDesafio, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonQuestaoDesafio.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonQuestaoDesafio)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(questaoDesafioService.delete(id)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("responder/{idQuestaoDesafio}/respostaTexto/{respostaTexto}/resposta/{resposta}/aluno/{idAluno}")
	public Response responder(@PathParam("idQuestaoDesafio") Integer idQuestaoDesafio, @PathParam("respostaTexto") String respostaTexto, @PathParam("resposta") String resposta, @PathParam("idAluno") Integer idAluno) {
		try {
			Boolean questaoRespondidaCorretamente = questaoDesafioService.responder(idQuestaoDesafio, respostaTexto, resposta, idAluno);
			return Response.ok().entity(questaoRespondidaCorretamente).build();
		} catch (ValidationException e) {
			String message = String.format("N�o foi possivel pontuar a questao [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), idQuestaoDesafio);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("N�o foi possivel pontuar a questao [ %s ] parametros [ %s ]", e.getMessage(), idQuestaoDesafio);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, idQuestaoDesafio)).build();
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("getQuestoesDesafioComRespostas/lista/{idLista}/aluno/{idAluno}")
	public Response getQuestoesDesafioComRespostas(@PathParam("idLista") Integer idLista, @PathParam("idAluno") Integer idAluno) {
		try {

			List<QuestaoDesafio> questoesDesafio = questaoDesafioService.getQuestoesDesafioComRespostas(idLista, idAluno);

			return Response.ok().entity(Parser.toListJsonQuestaoDesafios(questoesDesafio)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), idLista);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, idLista)).build();
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("cadastrarResposta/{id}/aluno/{idAluno}/{isCorreta}")
	public Response cadastrarResposta(@PathParam("id") Integer id, @PathParam("idAluno") Integer idAluno, @PathParam("isCorreta") Boolean isCorreta) {
		try {

			Boolean respostaCadatrada = questaoDesafioService.cadastrarResposta(id, idAluno, isCorreta);

			return Response.ok().entity(respostaCadatrada).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(false).build();
		}
	}
}
