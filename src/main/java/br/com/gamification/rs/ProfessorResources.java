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
import br.com.gamification.json.JsonProfessor;

import br.com.gamification.model.Professor;

import br.com.gamification.service.ProfessorService;
import br.com.gamification.model.filter.FilterProfessor;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.service.UserService;
import br.com.gamification.core.utils.Parser;
import br.com.gamification.core.rs.exception.ValidationException;
import br.com.gamification.core.security.SpringSecurityUserContext;
/**
*  generated: 23/08/2016 08:32:11
**/

@Path("/crud/professors")
public class ProfessorResources {

	@Inject
	ProfessorService professorService;
	
	
	public static final Logger LOGGER = Logger.getLogger(ProfessorResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterProfessor> paginationParams = new PaginationParams<FilterProfessor>(uriInfo, FilterProfessor.class);

			List<JsonProfessor> jsonProfessors = Parser.toListJsonProfessors(professorService.filter(paginationParams));
			response = Response.ok(jsonProfessors).build();
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
			List<JsonProfessor> jsonProfessors = Parser.toListJsonProfessors(professorService.all());
			response = Response.ok(jsonProfessors).build();
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
		Pager<Professor> professors = null;

		try {
			PaginationParams<FilterProfessor> paginationParams = new PaginationParams<FilterProfessor>(uriInfo, FilterProfessor.class);
			professors = professorService.all(paginationParams);
			JsonPaginator<JsonProfessor> paginator = new JsonPaginator<JsonProfessor>(Parser.toListJsonProfessors(professors.getItens()), professors.getActualPage(), professors.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar professors para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Professor professor = professorService.get(id);

			return Response.ok().entity(Parser.toJson(professor)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonProfessor jsonProfessor) {
		try {

			Professor professor = Parser.toEntity(jsonProfessor);
			professor = professorService.save(professor);
			return Response.ok().entity(Parser.toJson(professor)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonProfessor.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonProfessor, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  professor [ %s ] parametros [ %s ]", e.getMessage(), jsonProfessor.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonProfessor)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonProfessor jsonProfessor) {
		try {
			Professor professor = Parser.toEntity(jsonProfessor);

			professor = professorService.save(professor);
			return Response.ok().entity(Parser.toJson(professor)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonProfessor.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonProfessor, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonProfessor.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonProfessor)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(professorService.delete(id)).build();
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
}
