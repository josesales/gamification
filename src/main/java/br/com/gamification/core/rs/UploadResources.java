package br.com.gamification.core.rs;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

import javax.activation.DataHandler;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.StringUtils;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;

import br.com.gamification.core.json.JsonError;
import br.com.gamification.core.utils.ImageUtils;
import br.com.gamification.core.utils.Util;

@Path("/crud/uploads/")
public class UploadResources {

	private static final int THUMBNAIL_WIDTH = 240;

	@POST
	@Path("/file")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadFile(List<Attachment> attachments, @Context HttpServletRequest httpServletRequest) {
		DataUpload dataUpload = null;
		String uploadFolder = httpServletRequest.getServletContext().getRealPath("/uploads");
		for (Attachment attr : attachments) {
			DataHandler handler = attr.getDataHandler();
			String nameFile = "";
			try {
				InputStream stream = handler.getInputStream();

				String contentType = handler.getContentType();
				nameFile = System.currentTimeMillis() + "_" + Util.removeNonUnicodeCharAndSpaces(handler.getName());
				String folder = uploadFolder + File.separator;
				ByteArrayOutputStream bos = null;
				if (contentType != null) {
					
					boolean isImagem = StringUtils.containsIgnoreCase(handler.getName(), ".jpg") || StringUtils.containsIgnoreCase(handler.getName(), ".jpeg") || StringUtils.containsIgnoreCase(handler.getName(), ".png");
					if(!isImagem) {
						throw new RuntimeException("Selecione uma imagem jpeg, jpg ou png.");
					}
					
					if (contentType.toLowerCase().contains("image")) {
						BufferedImage image = ImageIO.read(stream);
						
//						ImageUtils.createThumbnail(image, THUMBNAIL_WIDTH, contentType, folder, nameFile);
						ImageUtils.createFullHdImage(image, contentType, folder, nameFile);
//						ImageUtils.createHdImage(image, contentType, folder, nameFile);
//						ImageUtils.createNormalImage(image, contentType, folder, nameFile);
						ImageUtils.saveImage(image, contentType, folder, nameFile);
					} else {
						bos = new ByteArrayOutputStream();
						int read = 0;
						byte[] bytes = new byte[1024];
						while ((read = stream.read(bytes)) != -1) {
							bos.write(bytes);
						}
						FileOutputStream fileOutputStream = new FileOutputStream(new File(folder + nameFile));
						fileOutputStream.write(bos.toByteArray());
						fileOutputStream.close();
						bos.close();
					}
					dataUpload = new DataUpload(contentType, "uploads/" + nameFile);
				}
				stream.close();
			} catch (RuntimeException e) {
				e.printStackTrace();
				return Response.serverError().entity(new JsonError(e.getMessage(), nameFile)).build();
			} catch (Exception e) {
				e.printStackTrace();
				return Response.serverError().entity(new JsonError("Problema durante upload da mídia [ " + nameFile + " ] error [" + e.getMessage() + "]", nameFile)).build();
			}
		}
		return Response.ok(dataUpload).build();
	}
}
