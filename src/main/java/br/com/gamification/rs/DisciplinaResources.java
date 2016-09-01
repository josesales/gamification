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
import br.com.gamification.json.JsonDisciplina;
import br.com.gamification.model.Aluno;
import br.com.gamification.model.Disciplina;
import br.com.gamification.model.filter.FilterDisciplina;
import br.com.gamification.service.AlunoService;
import br.com.gamification.service.DisciplinaService;
/**
*  generated: 23/08/2016 08:32:11
**/

@Path("/crud/disciplinas")
public class DisciplinaResources {

	@Inject
	DisciplinaService disciplinaService;
	@Inject
	AlunoService alunoService;
	
	
	public static final Logger LOGGER = Logger.getLogger(DisciplinaResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterDisciplina> paginationParams = new PaginationParams<FilterDisciplina>(uriInfo, FilterDisciplina.class);

			List<JsonDisciplina> jsonDisciplinas = Parser.toListJsonDisciplinas(disciplinaService.filter(paginationParams));
			response = Response.ok(jsonDisciplinas).build();
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
			List<JsonDisciplina> jsonDisciplinas = Parser.toListJsonDisciplinas(disciplinaService.all());
			response = Response.ok(jsonDisciplinas).build();
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
		Pager<Disciplina> disciplinas = null;

		try {
			PaginationParams<FilterDisciplina> paginationParams = new PaginationParams<FilterDisciplina>(uriInfo, FilterDisciplina.class);
			disciplinas = disciplinaService.all(paginationParams);
			JsonPaginator<JsonDisciplina> paginator = new JsonPaginator<JsonDisciplina>(Parser.toListJsonDisciplinas(disciplinas.getItens()), disciplinas.getActualPage(), disciplinas.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar disciplinas para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Disciplina disciplina = disciplinaService.get(id);

			return Response.ok().entity(Parser.toJson(disciplina)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonDisciplina jsonDisciplina) {
		try {

			Disciplina disciplina = Parser.toEntity(jsonDisciplina);
			disciplina = disciplinaService.save(disciplina);
			return Response.ok().entity(Parser.toJson(disciplina)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonDisciplina.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonDisciplina, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  disciplina [ %s ] parametros [ %s ]", e.getMessage(), jsonDisciplina.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonDisciplina)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonDisciplina jsonDisciplina) {
		try {
			Disciplina disciplina = Parser.toEntity(jsonDisciplina);

			disciplina = disciplinaService.save(disciplina);
			return Response.ok().entity(Parser.toJson(disciplina)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonDisciplina.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonDisciplina, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonDisciplina.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonDisciplina)).build();
		}
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("cadastrarAluno/{idDisciplina}/aluno/{idAluno}")
	public Response cadastrarAluno(@PathParam("idDisciplina") Integer idDisciplina, @PathParam("idAluno") Integer idAluno) {
		try {
			Disciplina disciplina = disciplinaService.get(idDisciplina);
			Aluno aluno = alunoService.get(idAluno);
			disciplina.getAlunos().add(aluno);
			disciplina = disciplinaService.save(disciplina);
			return Response.ok().entity(Parser.toJson(disciplina)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), idDisciplina);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), idDisciplina);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, idDisciplina)).build();
		}
	}

	@DELETE
	@Path("descadastrarAluno/{idDisciplina}/aluno/{idAluno}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response descadastrarAluno(@PathParam("idDisciplina") Integer idDisciplina, @PathParam("idAluno") Integer idAluno) {
		try {
			
			return Response.ok().entity(disciplinaService.removeAluno(idDisciplina, idAluno)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), idDisciplina);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), idDisciplina);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, idDisciplina)).build();
		}
	}
	
	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(disciplinaService.delete(id)).build();
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
