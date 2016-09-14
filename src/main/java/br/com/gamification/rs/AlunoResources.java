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
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import br.com.gamification.core.json.JsonError;
import br.com.gamification.core.json.JsonPaginator;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.rs.exception.ValidationException;
import br.com.gamification.core.utils.Parser;
import br.com.gamification.json.JsonAluno;
import br.com.gamification.model.Aluno;
import br.com.gamification.model.filter.FilterAluno;
import br.com.gamification.service.AlunoService;
/**
*  generated: 23/08/2016 08:32:11
**/

@Path("/crud/alunos")
public class AlunoResources {

	@Inject
	AlunoService alunoService;
	
	public static final Logger LOGGER = Logger.getLogger(AlunoResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterAluno> paginationParams = new PaginationParams<FilterAluno>(uriInfo, FilterAluno.class);

			List<JsonAluno> jsonAlunos = Parser.toListJsonAlunos(alunoService.filter(paginationParams));
			response = Response.ok(jsonAlunos).build();
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
			List<JsonAluno> jsonAlunos = Parser.toListJsonAlunos(alunoService.all());
			response = Response.ok(jsonAlunos).build();
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
		Pager<Aluno> alunos = null;

		try {
			PaginationParams<FilterAluno> paginationParams = new PaginationParams<FilterAluno>(uriInfo, FilterAluno.class);
			alunos = alunoService.all(paginationParams);
			JsonPaginator<JsonAluno> paginator = new JsonPaginator<JsonAluno>(Parser.toListJsonAlunos(alunos.getItens()), alunos.getActualPage(), alunos.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar alunos para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Aluno aluno = alunoService.get(id);

			return Response.ok().entity(Parser.toJson(aluno)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonAluno jsonAluno) {
		try {

			Aluno aluno = Parser.toEntity(jsonAluno);
			aluno = alunoService.save(aluno);
			return Response.ok().entity(Parser.toJson(aluno)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonAluno.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonAluno, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  aluno [ %s ] parametros [ %s ]", e.getMessage(), jsonAluno.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonAluno)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonAluno jsonAluno) {
		try {
			Aluno aluno = Parser.toEntity(jsonAluno);

			aluno = alunoService.save(aluno);
			return Response.ok().entity(Parser.toJson(aluno)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonAluno.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonAluno, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonAluno.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonAluno)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(alunoService.delete(id)).build();
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
