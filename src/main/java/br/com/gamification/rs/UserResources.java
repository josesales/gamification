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
import br.com.gamification.json.JsonUser;
import br.com.gamification.model.User;
import br.com.gamification.model.filter.FilterUser;
import br.com.gamification.service.RoleService;
import br.com.gamification.service.UserService;
/**
*  generated: 23/08/2016 08:32:12
**/

@Path("/crud/users")
public class UserResources {

	@Inject
	UserService userService;
	@Inject
	RoleService roleService;
	
	public static final Logger LOGGER = Logger.getLogger(UserResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterUser> paginationParams = new PaginationParams<FilterUser>(uriInfo, FilterUser.class);

			List<JsonUser> jsonUsers = Parser.toListJsonUsers(userService.filter(paginationParams));
			response = Response.ok(jsonUsers).build();
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
			List<JsonUser> jsonUsers = Parser.toListJsonUsers(userService.all());
			response = Response.ok(jsonUsers).build();
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
		Pager<User> users = null;

		try {
			PaginationParams<FilterUser> paginationParams = new PaginationParams<FilterUser>(uriInfo, FilterUser.class);
			users = userService.all(paginationParams);
			JsonPaginator<JsonUser> paginator = new JsonPaginator<JsonUser>(Parser.toListJsonUsers(users.getItens()), users.getActualPage(), users.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar users para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			User user = userService.get(id);

			return Response.ok().entity(Parser.toJson(user)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonUser jsonUser) {
		try {

			User user = Parser.toEntity(jsonUser);
			user = userService.save(user);
			return Response.ok().entity(Parser.toJson(user)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonUser.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonUser, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  user [ %s ] parametros [ %s ]", e.getMessage(), jsonUser.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonUser)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonUser jsonUser) {
		try {
			User user = Parser.toEntity(jsonUser);

			user = userService.save(user);
			return Response.ok().entity(Parser.toJson(user)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonUser.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonUser, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonUser.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonUser)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(userService.delete(id)).build();
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
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("cadastrarUsuarioAluno")
	public Response cadastrarUsuarioAluno(JsonUser jsonUser) {
		try {

			User user = Parser.toEntity(jsonUser);
			user = userService.cadastrarUsuarioAluno(user);
			
			return Response.ok().entity(Parser.toJson(user)).build();
		} catch (ValidationException e) {
			String message = String.format(e.getLegalMessage());
			return Response.serverError().entity(message).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  user [ %s ] parametros [ %s ]", e.getMessage(), jsonUser.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonUser)).build();
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("getUsuarioLogado")
	public Response getUsuarioLogado() {
		try {

			User user = userService.getUsuarioLogado();
			
			if(user != null && user.getRoles() != null && !user.getRoles().isEmpty() ) {
				return Response.ok().entity(Parser.toJson(user)).build();
			}

			return Response.noContent().build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar usuario logado");
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message)).build();
		}
	}
}
