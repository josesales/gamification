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
import br.com.gamification.json.JsonEstado;

import br.com.gamification.model.Estado;

import br.com.gamification.service.EstadoService;
import br.com.gamification.model.filter.FilterEstado;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.service.UserService;
import br.com.gamification.core.utils.Parser;
import br.com.gamification.core.rs.exception.ValidationException;
import br.com.gamification.core.security.SpringSecurityUserContext;
/**
*  generated: 23/08/2016 08:32:12
**/

@Path("/crud/estados")
public class EstadoResources {

	@Inject
	EstadoService estadoService;
	
	
	public static final Logger LOGGER = Logger.getLogger(EstadoResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterEstado> paginationParams = new PaginationParams<FilterEstado>(uriInfo, FilterEstado.class);

			List<JsonEstado> jsonEstados = Parser.toListJsonEstados(estadoService.filter(paginationParams));
			response = Response.ok(jsonEstados).build();
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
			List<JsonEstado> jsonEstados = Parser.toListJsonEstados(estadoService.all());
			response = Response.ok(jsonEstados).build();
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
		Pager<Estado> estados = null;

		try {
			PaginationParams<FilterEstado> paginationParams = new PaginationParams<FilterEstado>(uriInfo, FilterEstado.class);
			estados = estadoService.all(paginationParams);
			JsonPaginator<JsonEstado> paginator = new JsonPaginator<JsonEstado>(Parser.toListJsonEstados(estados.getItens()), estados.getActualPage(), estados.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar estados para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Estado estado = estadoService.get(id);

			return Response.ok().entity(Parser.toJson(estado)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonEstado jsonEstado) {
		try {

			Estado estado = Parser.toEntity(jsonEstado);
			estado = estadoService.save(estado);
			return Response.ok().entity(Parser.toJson(estado)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonEstado.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonEstado, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  estado [ %s ] parametros [ %s ]", e.getMessage(), jsonEstado.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonEstado)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonEstado jsonEstado) {
		try {
			Estado estado = Parser.toEntity(jsonEstado);

			estado = estadoService.save(estado);
			return Response.ok().entity(Parser.toJson(estado)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonEstado.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonEstado, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonEstado.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonEstado)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(estadoService.delete(id)).build();
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
