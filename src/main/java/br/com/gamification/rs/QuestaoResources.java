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
import br.com.gamification.json.JsonQuestao;
import br.com.gamification.model.Aluno;
import br.com.gamification.model.Disciplina;
import br.com.gamification.model.Questao;
import br.com.gamification.service.QuestaoService;
import br.com.gamification.model.filter.FilterQuestao;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.service.UserService;
import br.com.gamification.core.utils.Parser;
import br.com.gamification.core.rs.exception.ValidationException;
import br.com.gamification.core.security.SpringSecurityUserContext;
/**
*  generated: 23/08/2016 08:32:12
**/

@Path("/crud/questaos")
public class QuestaoResources {

	@Inject
	QuestaoService questaoService;
	
	
	public static final Logger LOGGER = Logger.getLogger(QuestaoResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterQuestao> paginationParams = new PaginationParams<FilterQuestao>(uriInfo, FilterQuestao.class);

			List<JsonQuestao> jsonQuestaos = Parser.toListJsonQuestaos(questaoService.filter(paginationParams));
			response = Response.ok(jsonQuestaos).build();
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
			List<JsonQuestao> jsonQuestaos = Parser.toListJsonQuestaos(questaoService.all());
			response = Response.ok(jsonQuestaos).build();
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
		Pager<Questao> questaos = null;

		try {
			PaginationParams<FilterQuestao> paginationParams = new PaginationParams<FilterQuestao>(uriInfo, FilterQuestao.class);
			questaos = questaoService.all(paginationParams);
			JsonPaginator<JsonQuestao> paginator = new JsonPaginator<JsonQuestao>(Parser.toListJsonQuestaos(questaos.getItens()), questaos.getActualPage(), questaos.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar questaos para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Questao questao = questaoService.get(id);

			return Response.ok().entity(Parser.toJson(questao)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonQuestao jsonQuestao) {
		try {

			Questao questao = Parser.toEntity(jsonQuestao);
			questao = questaoService.save(questao);
			return Response.ok().entity(Parser.toJson(questao)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonQuestao.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonQuestao, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  questao [ %s ] parametros [ %s ]", e.getMessage(), jsonQuestao.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonQuestao)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonQuestao jsonQuestao) {
		try {
			Questao questao = Parser.toEntity(jsonQuestao);

			questao = questaoService.save(questao);
			return Response.ok().entity(Parser.toJson(questao)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonQuestao.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonQuestao, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonQuestao.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonQuestao)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(questaoService.delete(id)).build();
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
	@Path("responder/{idQuestao}/itemMarcado/{itemMarcado}/aluno/{idAluno}")
	public Response responder(@PathParam("idQuestao") Integer idQuestao, @PathParam("itemMarcado") String itemMarcado, @PathParam("idAluno") Integer idAluno) {
		try {
			Boolean questaoRespondidaCorretamente = questaoService.responder(idQuestao, itemMarcado, idAluno);
			return Response.ok().entity(questaoRespondidaCorretamente).build();
		} catch (ValidationException e) {
			String message = String.format("N�o foi possivel pontuar a questao [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), idQuestao);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("N�o foi possivel pontuar a questao [ %s ] parametros [ %s ]", e.getMessage(), idQuestao);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, idQuestao)).build();
		}
	}
}
