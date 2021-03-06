package br.com.gamification.core.rs.exception;

import javax.ws.rs.core.Response;

import javax.ws.rs.ext.ExceptionMapper;

import org.apache.log4j.Logger;

public class ExceptionHandler implements ExceptionMapper<Exception> {
	private static final Logger LOGGER = Logger.getLogger(ExceptionHandler.class);

	public Response toResponse(Exception exception) {
		Response.Status status;
		LOGGER.warn("Erro durante a requisição", exception);
		status = Response.Status.INTERNAL_SERVER_ERROR;
		return Response.status(status).header("exception", exception.getMessage()).build();
	}
}