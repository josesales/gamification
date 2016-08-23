package br.com.gamification.core.utils;

import java.util.ArrayList;

import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import br.com.gamification.json.JsonAluno;
import br.com.gamification.model.Aluno;
import br.com.gamification.json.JsonDisciplina;
import br.com.gamification.model.Disciplina;
import br.com.gamification.json.JsonLista;
import br.com.gamification.model.Lista;
import br.com.gamification.json.JsonProfessor;
import br.com.gamification.model.Professor;
import br.com.gamification.json.JsonQuestao;
import br.com.gamification.model.Questao;
import br.com.gamification.json.JsonQuestaoDesafio;
import br.com.gamification.model.QuestaoDesafio;
import br.com.gamification.json.JsonRanking;
import br.com.gamification.model.Ranking;
import br.com.gamification.json.JsonBairro;
import br.com.gamification.model.Bairro;
import br.com.gamification.json.JsonCep;
import br.com.gamification.model.Cep;
import br.com.gamification.json.JsonCidade;
import br.com.gamification.model.Cidade;
import br.com.gamification.json.JsonEndereco;
import br.com.gamification.model.Endereco;
import br.com.gamification.json.JsonEstado;
import br.com.gamification.model.Estado;
import br.com.gamification.json.JsonPais;
import br.com.gamification.model.Pais;
import br.com.gamification.json.JsonClient;
import br.com.gamification.model.Client;
import br.com.gamification.json.JsonItem;
import br.com.gamification.model.Item;
import br.com.gamification.json.JsonItemType;
import br.com.gamification.model.ItemType;
import br.com.gamification.json.JsonOperation;
import br.com.gamification.model.Operation;
import br.com.gamification.json.JsonPermission;
import br.com.gamification.model.Permission;
import br.com.gamification.json.JsonRole;
import br.com.gamification.model.Role;
import br.com.gamification.json.JsonSession;
import br.com.gamification.model.Session;
import br.com.gamification.json.JsonUser;
import br.com.gamification.model.User;
import br.com.gamification.model.User;
import br.com.gamification.json.JsonUser;

//saporra
public class Parser {

	private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");
	private static final DateTimeFormatter HOUR_FORMAT = DateTimeFormat.forPattern("HH:mm");

	public static String getHourAsString(LocalDateTime date) {
		String format = "";
		try {
			format = HOUR_FORMAT.print(date);
		} catch (Exception e) {
			format = "00:00";
		}
		return format;
	}

	public static String getDateTimeAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_TIME_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_TIME_FORMAT.print(new DateTime());
		}
		return format;
	}

	public static String getDateAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_FORMAT.print(new DateTime());
		}
		return format;
	}

	//
	private static DateTime getHour(String date) {
		if (!date.isEmpty()) {
			try {
				return HOUR_FORMAT.parseDateTime(date);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDate(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDateTime(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_TIME_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	//converte de entidade para json --------------------
	private static JsonAluno toBasicJson(Aluno aluno) {
		JsonAluno jsonAluno = new JsonAluno();
		applyBasicJsonValues(jsonAluno, aluno);
		return jsonAluno;
	}
	
	private static Aluno toBasicEntity(JsonAluno jsonAluno) {
		Aluno aluno = new Aluno();
		applyBasicEntityValues(aluno, jsonAluno);
		return aluno;
	}
	
	private static void applyBasicJsonValues(JsonAluno jsonAluno, Aluno aluno) {
		jsonAluno.setId(aluno.getId());
	    jsonAluno.setNome(aluno.getNome());
	}	
	private static void applyBasicEntityValues(Aluno aluno, JsonAluno jsonAluno) {
		aluno.setId(jsonAluno.getId());
		aluno.setNome(jsonAluno.getNome());
	}	
	
	public static JsonAluno toJson(Aluno aluno) {
		JsonAluno jsonAluno = new JsonAluno();

		applyBasicJsonValues(jsonAluno, aluno);

		List<Disciplina> listDiciplinas = aluno.getDiciplinas();
		if (listDiciplinas != null) {
			for (Disciplina loopDisciplina : listDiciplinas) {
				jsonAluno.getDiciplinas().add(toBasicJson(loopDisciplina));
			}
		}			

		List<Ranking> listRankings = aluno.getRankings();
		if (listRankings != null) {
			for (Ranking loopRanking : listRankings) {
				jsonAluno.getRankings().add(toBasicJson(loopRanking));
			}
		}
		User usuario_ = aluno.getUsuario();
		if (usuario_ != null) {
			jsonAluno.setUsuario(toJson(usuario_));
		}
		return jsonAluno;
	}


	public static Aluno apply(Aluno aluno, JsonAluno jsonAluno) {
	
		if(aluno ==  null)
			aluno = new Aluno();
		
		applyBasicEntityValues(aluno, jsonAluno) ;

		ArrayList<JsonDisciplina> listDiciplinas = jsonAluno.getDiciplinas();			
		if (listDiciplinas != null) {
			for (JsonDisciplina loopJsonDisciplina : listDiciplinas) {
				aluno.addDiciplinas(toBasicEntity(loopJsonDisciplina));
			}
		}
			
		ArrayList<JsonRanking> listRankings = jsonAluno.getRankings();
		if (listRankings != null) {
			for (JsonRanking loopJsonRanking : listRankings) {
				aluno.addRankings(toBasicEntity(loopJsonRanking));
			}
		}
					
		JsonUser usuario_ = jsonAluno.getUsuario();
		if (usuario_ != null) {
			aluno.setUsuario(toEntity(usuario_));
		}	
		return aluno;
		
	}		
	public static Aluno toEntity(JsonAluno jsonAluno) {
		Aluno aluno = new Aluno();
		
		return apply(aluno, jsonAluno);
	}		
	
	public static List<JsonAluno> toListJsonAlunos(List<Aluno> all) {
		List<JsonAluno> jsonAlunos = new ArrayList<JsonAluno>();
		for (Aluno aluno : all) {
			jsonAlunos.add(toJson(aluno));
		}
		return jsonAlunos;
	}
	//converte de entidade para json --------------------
	private static JsonDisciplina toBasicJson(Disciplina disciplina) {
		JsonDisciplina jsonDisciplina = new JsonDisciplina();
		applyBasicJsonValues(jsonDisciplina, disciplina);
		return jsonDisciplina;
	}
	
	private static Disciplina toBasicEntity(JsonDisciplina jsonDisciplina) {
		Disciplina disciplina = new Disciplina();
		applyBasicEntityValues(disciplina, jsonDisciplina);
		return disciplina;
	}
	
	private static void applyBasicJsonValues(JsonDisciplina jsonDisciplina, Disciplina disciplina) {
		jsonDisciplina.setId(disciplina.getId());
	    jsonDisciplina.setNome(disciplina.getNome());
	}	
	private static void applyBasicEntityValues(Disciplina disciplina, JsonDisciplina jsonDisciplina) {
		disciplina.setId(jsonDisciplina.getId());
		disciplina.setNome(jsonDisciplina.getNome());
	}	
	
	public static JsonDisciplina toJson(Disciplina disciplina) {
		JsonDisciplina jsonDisciplina = new JsonDisciplina();

		applyBasicJsonValues(jsonDisciplina, disciplina);

		List<Aluno> listAlunos = disciplina.getAlunos();
		if (listAlunos != null) {
			for (Aluno loopAluno : listAlunos) {
				jsonDisciplina.getAlunos().add(toJson(loopAluno));
			}
		}

		List<Lista> listListas = disciplina.getListas();
		if (listListas != null) {
			for (Lista loopLista : listListas) {
				jsonDisciplina.getListas().add(toBasicJson(loopLista));
			}
		}
		List<Ranking> listRankings = disciplina.getRankings();
		if (listRankings != null) {
			for (Ranking loopRanking : listRankings) {
				jsonDisciplina.getRankings().add(toBasicJson(loopRanking));
			}
		}
		Professor professor_ = disciplina.getProfessor();
		if (professor_ != null) {
			jsonDisciplina.setProfessor(toJson(professor_));
		}
		return jsonDisciplina;
	}


	public static Disciplina apply(Disciplina disciplina, JsonDisciplina jsonDisciplina) {
	
		if(disciplina ==  null)
			disciplina = new Disciplina();
		
		applyBasicEntityValues(disciplina, jsonDisciplina) ;

		ArrayList<JsonAluno> listAlunos = jsonDisciplina.getAlunos();			
		if (listAlunos != null) {
			for (JsonAluno loopJsonAluno : listAlunos) {
				disciplina.addAlunos(toEntity(loopJsonAluno));
			}
		}
		ArrayList<JsonLista> listListas = jsonDisciplina.getListas();
		if (listListas != null) {
			for (JsonLista loopJsonLista : listListas) {
				disciplina.addListas(toBasicEntity(loopJsonLista));
			}
		}
					
		ArrayList<JsonRanking> listRankings = jsonDisciplina.getRankings();
		if (listRankings != null) {
			for (JsonRanking loopJsonRanking : listRankings) {
				disciplina.addRankings(toBasicEntity(loopJsonRanking));
			}
		}
					
		JsonProfessor professor_ = jsonDisciplina.getProfessor();
		if (professor_ != null) {
			disciplina.setProfessor(toEntity(professor_));
		}	
		return disciplina;
		
	}		
	public static Disciplina toEntity(JsonDisciplina jsonDisciplina) {
		Disciplina disciplina = new Disciplina();
		
		return apply(disciplina, jsonDisciplina);
	}		
	
	public static List<JsonDisciplina> toListJsonDisciplinas(List<Disciplina> all) {
		List<JsonDisciplina> jsonDisciplinas = new ArrayList<JsonDisciplina>();
		for (Disciplina disciplina : all) {
			jsonDisciplinas.add(toJson(disciplina));
		}
		return jsonDisciplinas;
	}
	//converte de entidade para json --------------------
	private static JsonLista toBasicJson(Lista lista) {
		JsonLista jsonLista = new JsonLista();
		applyBasicJsonValues(jsonLista, lista);
		return jsonLista;
	}
	
	private static Lista toBasicEntity(JsonLista jsonLista) {
		Lista lista = new Lista();
		applyBasicEntityValues(lista, jsonLista);
		return lista;
	}
	
	private static void applyBasicJsonValues(JsonLista jsonLista, Lista lista) {
		jsonLista.setId(lista.getId());
	    jsonLista.setNome(lista.getNome());
	}	
	private static void applyBasicEntityValues(Lista lista, JsonLista jsonLista) {
		lista.setId(jsonLista.getId());
		lista.setNome(jsonLista.getNome());
	}	
	
	public static JsonLista toJson(Lista lista) {
		JsonLista jsonLista = new JsonLista();

		applyBasicJsonValues(jsonLista, lista);

		List<Questao> listQuestaos = lista.getQuestaos();
		if (listQuestaos != null) {
			for (Questao loopQuestao : listQuestaos) {
				jsonLista.getQuestaos().add(toBasicJson(loopQuestao));
			}
		}
		List<QuestaoDesafio> listQuestaoDesafios = lista.getQuestaoDesafios();
		if (listQuestaoDesafios != null) {
			for (QuestaoDesafio loopQuestaoDesafio : listQuestaoDesafios) {
				jsonLista.getQuestaoDesafios().add(toBasicJson(loopQuestaoDesafio));
			}
		}
		Disciplina disciplina_ = lista.getDisciplina();
		if (disciplina_ != null) {
			jsonLista.setDisciplina(toJson(disciplina_));
		}
		return jsonLista;
	}


	public static Lista apply(Lista lista, JsonLista jsonLista) {
	
		if(lista ==  null)
			lista = new Lista();
		
		applyBasicEntityValues(lista, jsonLista) ;

		ArrayList<JsonQuestao> listQuestaos = jsonLista.getQuestaos();
		if (listQuestaos != null) {
			for (JsonQuestao loopJsonQuestao : listQuestaos) {
				lista.addQuestaos(toBasicEntity(loopJsonQuestao));
			}
		}
					
		ArrayList<JsonQuestaoDesafio> listQuestaoDesafios = jsonLista.getQuestaoDesafios();
		if (listQuestaoDesafios != null) {
			for (JsonQuestaoDesafio loopJsonQuestaoDesafio : listQuestaoDesafios) {
				lista.addQuestaoDesafios(toBasicEntity(loopJsonQuestaoDesafio));
			}
		}
					
		JsonDisciplina disciplina_ = jsonLista.getDisciplina();
		if (disciplina_ != null) {
			lista.setDisciplina(toEntity(disciplina_));
		}	
		return lista;
		
	}		
	public static Lista toEntity(JsonLista jsonLista) {
		Lista lista = new Lista();
		
		return apply(lista, jsonLista);
	}		
	
	public static List<JsonLista> toListJsonListas(List<Lista> all) {
		List<JsonLista> jsonListas = new ArrayList<JsonLista>();
		for (Lista lista : all) {
			jsonListas.add(toJson(lista));
		}
		return jsonListas;
	}
	//converte de entidade para json --------------------
	private static JsonProfessor toBasicJson(Professor professor) {
		JsonProfessor jsonProfessor = new JsonProfessor();
		applyBasicJsonValues(jsonProfessor, professor);
		return jsonProfessor;
	}
	
	private static Professor toBasicEntity(JsonProfessor jsonProfessor) {
		Professor professor = new Professor();
		applyBasicEntityValues(professor, jsonProfessor);
		return professor;
	}
	
	private static void applyBasicJsonValues(JsonProfessor jsonProfessor, Professor professor) {
		jsonProfessor.setId(professor.getId());
	    jsonProfessor.setNome(professor.getNome());
	}	
	private static void applyBasicEntityValues(Professor professor, JsonProfessor jsonProfessor) {
		professor.setId(jsonProfessor.getId());
		professor.setNome(jsonProfessor.getNome());
	}	
	
	public static JsonProfessor toJson(Professor professor) {
		JsonProfessor jsonProfessor = new JsonProfessor();

		applyBasicJsonValues(jsonProfessor, professor);

		List<Disciplina> listDisciplinas = professor.getDisciplinas();
		if (listDisciplinas != null) {
			for (Disciplina loopDisciplina : listDisciplinas) {
				jsonProfessor.getDisciplinas().add(toBasicJson(loopDisciplina));
			}
		}
		User usuario_ = professor.getUsuario();
		if (usuario_ != null) {
			jsonProfessor.setUsuario(toJson(usuario_));
		}
		return jsonProfessor;
	}


	public static Professor apply(Professor professor, JsonProfessor jsonProfessor) {
	
		if(professor ==  null)
			professor = new Professor();
		
		applyBasicEntityValues(professor, jsonProfessor) ;

		ArrayList<JsonDisciplina> listDisciplinas = jsonProfessor.getDisciplinas();
		if (listDisciplinas != null) {
			for (JsonDisciplina loopJsonDisciplina : listDisciplinas) {
				professor.addDisciplinas(toBasicEntity(loopJsonDisciplina));
			}
		}
					
		JsonUser usuario_ = jsonProfessor.getUsuario();
		if (usuario_ != null) {
			professor.setUsuario(toEntity(usuario_));
		}	
		return professor;
		
	}		
	public static Professor toEntity(JsonProfessor jsonProfessor) {
		Professor professor = new Professor();
		
		return apply(professor, jsonProfessor);
	}		
	
	public static List<JsonProfessor> toListJsonProfessors(List<Professor> all) {
		List<JsonProfessor> jsonProfessors = new ArrayList<JsonProfessor>();
		for (Professor professor : all) {
			jsonProfessors.add(toJson(professor));
		}
		return jsonProfessors;
	}
	//converte de entidade para json --------------------
	private static JsonQuestao toBasicJson(Questao questao) {
		JsonQuestao jsonQuestao = new JsonQuestao();
		applyBasicJsonValues(jsonQuestao, questao);
		return jsonQuestao;
	}
	
	private static Questao toBasicEntity(JsonQuestao jsonQuestao) {
		Questao questao = new Questao();
		applyBasicEntityValues(questao, jsonQuestao);
		return questao;
	}
	
	private static void applyBasicJsonValues(JsonQuestao jsonQuestao, Questao questao) {
		jsonQuestao.setId(questao.getId());
	    jsonQuestao.setPergunta(questao.getPergunta());
	    jsonQuestao.setItemA(questao.getItemA());
	    jsonQuestao.setItemB(questao.getItemB());
	    jsonQuestao.setItemC(questao.getItemC());
	    jsonQuestao.setItemD(questao.getItemD());
	    jsonQuestao.setItemCorreto(questao.getItemCorreto());
	    jsonQuestao.setPontos(questao.getPontos());
	}	
	private static void applyBasicEntityValues(Questao questao, JsonQuestao jsonQuestao) {
		questao.setId(jsonQuestao.getId());
		questao.setPergunta(jsonQuestao.getPergunta());
		questao.setItemA(jsonQuestao.getItemA());
		questao.setItemB(jsonQuestao.getItemB());
		questao.setItemC(jsonQuestao.getItemC());
		questao.setItemD(jsonQuestao.getItemD());
		questao.setItemCorreto(jsonQuestao.getItemCorreto());
		questao.setPontos(jsonQuestao.getPontos());
	}	
	
	public static JsonQuestao toJson(Questao questao) {
		JsonQuestao jsonQuestao = new JsonQuestao();

		applyBasicJsonValues(jsonQuestao, questao);

		Lista lista_ = questao.getLista();
		if (lista_ != null) {
			jsonQuestao.setLista(toJson(lista_));
		}
		return jsonQuestao;
	}


	public static Questao apply(Questao questao, JsonQuestao jsonQuestao) {
	
		if(questao ==  null)
			questao = new Questao();
		
		applyBasicEntityValues(questao, jsonQuestao) ;

		JsonLista lista_ = jsonQuestao.getLista();
		if (lista_ != null) {
			questao.setLista(toEntity(lista_));
		}	
		return questao;
		
	}		
	public static Questao toEntity(JsonQuestao jsonQuestao) {
		Questao questao = new Questao();
		
		return apply(questao, jsonQuestao);
	}		
	
	public static List<JsonQuestao> toListJsonQuestaos(List<Questao> all) {
		List<JsonQuestao> jsonQuestaos = new ArrayList<JsonQuestao>();
		for (Questao questao : all) {
			jsonQuestaos.add(toJson(questao));
		}
		return jsonQuestaos;
	}
	//converte de entidade para json --------------------
	private static JsonQuestaoDesafio toBasicJson(QuestaoDesafio questaoDesafio) {
		JsonQuestaoDesafio jsonQuestaoDesafio = new JsonQuestaoDesafio();
		applyBasicJsonValues(jsonQuestaoDesafio, questaoDesafio);
		return jsonQuestaoDesafio;
	}
	
	private static QuestaoDesafio toBasicEntity(JsonQuestaoDesafio jsonQuestaoDesafio) {
		QuestaoDesafio questaoDesafio = new QuestaoDesafio();
		applyBasicEntityValues(questaoDesafio, jsonQuestaoDesafio);
		return questaoDesafio;
	}
	
	private static void applyBasicJsonValues(JsonQuestaoDesafio jsonQuestaoDesafio, QuestaoDesafio questaoDesafio) {
		jsonQuestaoDesafio.setId(questaoDesafio.getId());
	    jsonQuestaoDesafio.setPontos(questaoDesafio.getPontos());
	    jsonQuestaoDesafio.setPergunta(questaoDesafio.getPergunta());
	    jsonQuestaoDesafio.setResposta(questaoDesafio.getResposta());
	}	
	private static void applyBasicEntityValues(QuestaoDesafio questaoDesafio, JsonQuestaoDesafio jsonQuestaoDesafio) {
		questaoDesafio.setId(jsonQuestaoDesafio.getId());
		questaoDesafio.setPontos(jsonQuestaoDesafio.getPontos());
		questaoDesafio.setPergunta(jsonQuestaoDesafio.getPergunta());
		questaoDesafio.setResposta(jsonQuestaoDesafio.getResposta());
	}	
	
	public static JsonQuestaoDesafio toJson(QuestaoDesafio questaoDesafio) {
		JsonQuestaoDesafio jsonQuestaoDesafio = new JsonQuestaoDesafio();

		applyBasicJsonValues(jsonQuestaoDesafio, questaoDesafio);

		Lista lista_ = questaoDesafio.getLista();
		if (lista_ != null) {
			jsonQuestaoDesafio.setLista(toJson(lista_));
		}
		return jsonQuestaoDesafio;
	}


	public static QuestaoDesafio apply(QuestaoDesafio questaoDesafio, JsonQuestaoDesafio jsonQuestaoDesafio) {
	
		if(questaoDesafio ==  null)
			questaoDesafio = new QuestaoDesafio();
		
		applyBasicEntityValues(questaoDesafio, jsonQuestaoDesafio) ;

		JsonLista lista_ = jsonQuestaoDesafio.getLista();
		if (lista_ != null) {
			questaoDesafio.setLista(toEntity(lista_));
		}	
		return questaoDesafio;
		
	}		
	public static QuestaoDesafio toEntity(JsonQuestaoDesafio jsonQuestaoDesafio) {
		QuestaoDesafio questaoDesafio = new QuestaoDesafio();
		
		return apply(questaoDesafio, jsonQuestaoDesafio);
	}		
	
	public static List<JsonQuestaoDesafio> toListJsonQuestaoDesafios(List<QuestaoDesafio> all) {
		List<JsonQuestaoDesafio> jsonQuestaoDesafios = new ArrayList<JsonQuestaoDesafio>();
		for (QuestaoDesafio questaoDesafio : all) {
			jsonQuestaoDesafios.add(toJson(questaoDesafio));
		}
		return jsonQuestaoDesafios;
	}
	//converte de entidade para json --------------------
	private static JsonRanking toBasicJson(Ranking ranking) {
		JsonRanking jsonRanking = new JsonRanking();
		applyBasicJsonValues(jsonRanking, ranking);
		return jsonRanking;
	}
	
	private static Ranking toBasicEntity(JsonRanking jsonRanking) {
		Ranking ranking = new Ranking();
		applyBasicEntityValues(ranking, jsonRanking);
		return ranking;
	}
	
	private static void applyBasicJsonValues(JsonRanking jsonRanking, Ranking ranking) {
		jsonRanking.setId(ranking.getId());
	    jsonRanking.setPontos(ranking.getPontos());
	}	
	private static void applyBasicEntityValues(Ranking ranking, JsonRanking jsonRanking) {
		ranking.setId(jsonRanking.getId());
		ranking.setPontos(jsonRanking.getPontos());
	}	
	
	public static JsonRanking toJson(Ranking ranking) {
		JsonRanking jsonRanking = new JsonRanking();

		applyBasicJsonValues(jsonRanking, ranking);

		Disciplina disciplina_ = ranking.getDisciplina();
		if (disciplina_ != null) {
			jsonRanking.setDisciplina(toJson(disciplina_));
		}
		Aluno aluno_ = ranking.getAluno();
		if (aluno_ != null) {
			jsonRanking.setAluno(toJson(aluno_));
		}
		return jsonRanking;
	}


	public static Ranking apply(Ranking ranking, JsonRanking jsonRanking) {
	
		if(ranking ==  null)
			ranking = new Ranking();
		
		applyBasicEntityValues(ranking, jsonRanking) ;

		JsonDisciplina disciplina_ = jsonRanking.getDisciplina();
		if (disciplina_ != null) {
			ranking.setDisciplina(toEntity(disciplina_));
		}	
		JsonAluno aluno_ = jsonRanking.getAluno();
		if (aluno_ != null) {
			ranking.setAluno(toEntity(aluno_));
		}	
		return ranking;
		
	}		
	public static Ranking toEntity(JsonRanking jsonRanking) {
		Ranking ranking = new Ranking();
		
		return apply(ranking, jsonRanking);
	}		
	
	public static List<JsonRanking> toListJsonRankings(List<Ranking> all) {
		List<JsonRanking> jsonRankings = new ArrayList<JsonRanking>();
		for (Ranking ranking : all) {
			jsonRankings.add(toJson(ranking));
		}
		return jsonRankings;
	}
	//converte de entidade para json --------------------
	private static JsonBairro toBasicJson(Bairro bairro) {
		JsonBairro jsonBairro = new JsonBairro();
		applyBasicJsonValues(jsonBairro, bairro);
		return jsonBairro;
	}
	
	private static Bairro toBasicEntity(JsonBairro jsonBairro) {
		Bairro bairro = new Bairro();
		applyBasicEntityValues(bairro, jsonBairro);
		return bairro;
	}
	
	private static void applyBasicJsonValues(JsonBairro jsonBairro, Bairro bairro) {
		jsonBairro.setId(bairro.getId());
	    jsonBairro.setNome(bairro.getNome());
	}	
	private static void applyBasicEntityValues(Bairro bairro, JsonBairro jsonBairro) {
		bairro.setId(jsonBairro.getId());
		bairro.setNome(jsonBairro.getNome());
	}	
	
	public static JsonBairro toJson(Bairro bairro) {
		JsonBairro jsonBairro = new JsonBairro();

		applyBasicJsonValues(jsonBairro, bairro);

		Cidade cidade_ = bairro.getCidade();
		if (cidade_ != null) {
			jsonBairro.setCidade(toJson(cidade_));
		}
		Estado estado_ = bairro.getEstado();
		if (estado_ != null) {
			jsonBairro.setEstado(toJson(estado_));
		}
		return jsonBairro;
	}


	public static Bairro apply(Bairro bairro, JsonBairro jsonBairro) {
	
		if(bairro ==  null)
			bairro = new Bairro();
		
		applyBasicEntityValues(bairro, jsonBairro) ;

		JsonCidade cidade_ = jsonBairro.getCidade();
		if (cidade_ != null) {
			bairro.setCidade(toEntity(cidade_));
		}	
		JsonEstado estado_ = jsonBairro.getEstado();
		if (estado_ != null) {
			bairro.setEstado(toEntity(estado_));
		}	
		return bairro;
		
	}		
	public static Bairro toEntity(JsonBairro jsonBairro) {
		Bairro bairro = new Bairro();
		
		return apply(bairro, jsonBairro);
	}		
	
	public static List<JsonBairro> toListJsonBairros(List<Bairro> all) {
		List<JsonBairro> jsonBairros = new ArrayList<JsonBairro>();
		for (Bairro bairro : all) {
			jsonBairros.add(toJson(bairro));
		}
		return jsonBairros;
	}
	//converte de entidade para json --------------------
	private static JsonCep toBasicJson(Cep cep) {
		JsonCep jsonCep = new JsonCep();
		applyBasicJsonValues(jsonCep, cep);
		return jsonCep;
	}
	
	private static Cep toBasicEntity(JsonCep jsonCep) {
		Cep cep = new Cep();
		applyBasicEntityValues(cep, jsonCep);
		return cep;
	}
	
	private static void applyBasicJsonValues(JsonCep jsonCep, Cep cep) {
		jsonCep.setId(cep.getId());
	    jsonCep.setLogradouro(cep.getLogradouro());
	    jsonCep.setNumero(cep.getNumero());
	}	
	private static void applyBasicEntityValues(Cep cep, JsonCep jsonCep) {
		cep.setId(jsonCep.getId());
		cep.setLogradouro(jsonCep.getLogradouro());
		cep.setNumero(jsonCep.getNumero());
	}	
	
	public static JsonCep toJson(Cep cep) {
		JsonCep jsonCep = new JsonCep();

		applyBasicJsonValues(jsonCep, cep);

		Bairro bairro_ = cep.getBairro();
		if (bairro_ != null) {
			jsonCep.setBairro(toJson(bairro_));
		}
		Cidade cidade_ = cep.getCidade();
		if (cidade_ != null) {
			jsonCep.setCidade(toJson(cidade_));
		}
		Estado estado_ = cep.getEstado();
		if (estado_ != null) {
			jsonCep.setEstado(toJson(estado_));
		}
		return jsonCep;
	}


	public static Cep apply(Cep cep, JsonCep jsonCep) {
	
		if(cep ==  null)
			cep = new Cep();
		
		applyBasicEntityValues(cep, jsonCep) ;

		JsonBairro bairro_ = jsonCep.getBairro();
		if (bairro_ != null) {
			cep.setBairro(toEntity(bairro_));
		}	
		JsonCidade cidade_ = jsonCep.getCidade();
		if (cidade_ != null) {
			cep.setCidade(toEntity(cidade_));
		}	
		JsonEstado estado_ = jsonCep.getEstado();
		if (estado_ != null) {
			cep.setEstado(toEntity(estado_));
		}	
		return cep;
		
	}		
	public static Cep toEntity(JsonCep jsonCep) {
		Cep cep = new Cep();
		
		return apply(cep, jsonCep);
	}		
	
	public static List<JsonCep> toListJsonCeps(List<Cep> all) {
		List<JsonCep> jsonCeps = new ArrayList<JsonCep>();
		for (Cep cep : all) {
			jsonCeps.add(toJson(cep));
		}
		return jsonCeps;
	}
	//converte de entidade para json --------------------
	private static JsonCidade toBasicJson(Cidade cidade) {
		JsonCidade jsonCidade = new JsonCidade();
		applyBasicJsonValues(jsonCidade, cidade);
		return jsonCidade;
	}
	
	private static Cidade toBasicEntity(JsonCidade jsonCidade) {
		Cidade cidade = new Cidade();
		applyBasicEntityValues(cidade, jsonCidade);
		return cidade;
	}
	
	private static void applyBasicJsonValues(JsonCidade jsonCidade, Cidade cidade) {
		jsonCidade.setId(cidade.getId());
	    jsonCidade.setNome(cidade.getNome());
	    jsonCidade.setCep(cidade.getCep());
	}	
	private static void applyBasicEntityValues(Cidade cidade, JsonCidade jsonCidade) {
		cidade.setId(jsonCidade.getId());
		cidade.setNome(jsonCidade.getNome());
		cidade.setCep(jsonCidade.getCep());
	}	
	
	public static JsonCidade toJson(Cidade cidade) {
		JsonCidade jsonCidade = new JsonCidade();

		applyBasicJsonValues(jsonCidade, cidade);

		Estado estado_ = cidade.getEstado();
		if (estado_ != null) {
			jsonCidade.setEstado(toJson(estado_));
		}
		return jsonCidade;
	}


	public static Cidade apply(Cidade cidade, JsonCidade jsonCidade) {
	
		if(cidade ==  null)
			cidade = new Cidade();
		
		applyBasicEntityValues(cidade, jsonCidade) ;

		JsonEstado estado_ = jsonCidade.getEstado();
		if (estado_ != null) {
			cidade.setEstado(toEntity(estado_));
		}	
		return cidade;
		
	}		
	public static Cidade toEntity(JsonCidade jsonCidade) {
		Cidade cidade = new Cidade();
		
		return apply(cidade, jsonCidade);
	}		
	
	public static List<JsonCidade> toListJsonCidades(List<Cidade> all) {
		List<JsonCidade> jsonCidades = new ArrayList<JsonCidade>();
		for (Cidade cidade : all) {
			jsonCidades.add(toJson(cidade));
		}
		return jsonCidades;
	}
	//converte de entidade para json --------------------
	private static JsonEndereco toBasicJson(Endereco endereco) {
		JsonEndereco jsonEndereco = new JsonEndereco();
		applyBasicJsonValues(jsonEndereco, endereco);
		return jsonEndereco;
	}
	
	private static Endereco toBasicEntity(JsonEndereco jsonEndereco) {
		Endereco endereco = new Endereco();
		applyBasicEntityValues(endereco, jsonEndereco);
		return endereco;
	}
	
	private static void applyBasicJsonValues(JsonEndereco jsonEndereco, Endereco endereco) {
		jsonEndereco.setId(endereco.getId());
	    jsonEndereco.setComplemento(endereco.getComplemento());
	    jsonEndereco.setNumero(endereco.getNumero());
	}	
	private static void applyBasicEntityValues(Endereco endereco, JsonEndereco jsonEndereco) {
		endereco.setId(jsonEndereco.getId());
		endereco.setComplemento(jsonEndereco.getComplemento());
		endereco.setNumero(jsonEndereco.getNumero());
	}	
	
	public static JsonEndereco toJson(Endereco endereco) {
		JsonEndereco jsonEndereco = new JsonEndereco();

		applyBasicJsonValues(jsonEndereco, endereco);

		Cep cep_ = endereco.getCep();
		if (cep_ != null) {
			jsonEndereco.setCep(toJson(cep_));
		}
		return jsonEndereco;
	}


	public static Endereco apply(Endereco endereco, JsonEndereco jsonEndereco) {
	
		if(endereco ==  null)
			endereco = new Endereco();
		
		applyBasicEntityValues(endereco, jsonEndereco) ;

		JsonCep cep_ = jsonEndereco.getCep();
		if (cep_ != null) {
			endereco.setCep(toEntity(cep_));
		}	
		return endereco;
		
	}		
	public static Endereco toEntity(JsonEndereco jsonEndereco) {
		Endereco endereco = new Endereco();
		
		return apply(endereco, jsonEndereco);
	}		
	
	public static List<JsonEndereco> toListJsonEnderecos(List<Endereco> all) {
		List<JsonEndereco> jsonEnderecos = new ArrayList<JsonEndereco>();
		for (Endereco endereco : all) {
			jsonEnderecos.add(toJson(endereco));
		}
		return jsonEnderecos;
	}
	//converte de entidade para json --------------------
	private static JsonEstado toBasicJson(Estado estado) {
		JsonEstado jsonEstado = new JsonEstado();
		applyBasicJsonValues(jsonEstado, estado);
		return jsonEstado;
	}
	
	private static Estado toBasicEntity(JsonEstado jsonEstado) {
		Estado estado = new Estado();
		applyBasicEntityValues(estado, jsonEstado);
		return estado;
	}
	
	private static void applyBasicJsonValues(JsonEstado jsonEstado, Estado estado) {
		jsonEstado.setId(estado.getId());
	    jsonEstado.setNome(estado.getNome());
	    jsonEstado.setFaixaCep1Ini(estado.getFaixaCep1Ini());
	    jsonEstado.setFaixaCep1Fim(estado.getFaixaCep1Fim());
	    jsonEstado.setFaixaCep2Ini(estado.getFaixaCep2Ini());
	    jsonEstado.setFaixaCep2Fim(estado.getFaixaCep2Fim());
	}	
	private static void applyBasicEntityValues(Estado estado, JsonEstado jsonEstado) {
		estado.setId(jsonEstado.getId());
		estado.setNome(jsonEstado.getNome());
		estado.setFaixaCep1Ini(jsonEstado.getFaixaCep1Ini());
		estado.setFaixaCep1Fim(jsonEstado.getFaixaCep1Fim());
		estado.setFaixaCep2Ini(jsonEstado.getFaixaCep2Ini());
		estado.setFaixaCep2Fim(jsonEstado.getFaixaCep2Fim());
	}	
	
	public static JsonEstado toJson(Estado estado) {
		JsonEstado jsonEstado = new JsonEstado();

		applyBasicJsonValues(jsonEstado, estado);

		return jsonEstado;
	}


	public static Estado apply(Estado estado, JsonEstado jsonEstado) {
	
		if(estado ==  null)
			estado = new Estado();
		
		applyBasicEntityValues(estado, jsonEstado) ;

		return estado;
		
	}		
	public static Estado toEntity(JsonEstado jsonEstado) {
		Estado estado = new Estado();
		
		return apply(estado, jsonEstado);
	}		
	
	public static List<JsonEstado> toListJsonEstados(List<Estado> all) {
		List<JsonEstado> jsonEstados = new ArrayList<JsonEstado>();
		for (Estado estado : all) {
			jsonEstados.add(toJson(estado));
		}
		return jsonEstados;
	}
	//converte de entidade para json --------------------
	private static JsonPais toBasicJson(Pais pais) {
		JsonPais jsonPais = new JsonPais();
		applyBasicJsonValues(jsonPais, pais);
		return jsonPais;
	}
	
	private static Pais toBasicEntity(JsonPais jsonPais) {
		Pais pais = new Pais();
		applyBasicEntityValues(pais, jsonPais);
		return pais;
	}
	
	private static void applyBasicJsonValues(JsonPais jsonPais, Pais pais) {
		jsonPais.setId(pais.getId());
	    jsonPais.setCodigo(pais.getCodigo());
	    jsonPais.setNome(pais.getNome());
	}	
	private static void applyBasicEntityValues(Pais pais, JsonPais jsonPais) {
		pais.setId(jsonPais.getId());
		pais.setCodigo(jsonPais.getCodigo());
		pais.setNome(jsonPais.getNome());
	}	
	
	public static JsonPais toJson(Pais pais) {
		JsonPais jsonPais = new JsonPais();

		applyBasicJsonValues(jsonPais, pais);

		return jsonPais;
	}


	public static Pais apply(Pais pais, JsonPais jsonPais) {
	
		if(pais ==  null)
			pais = new Pais();
		
		applyBasicEntityValues(pais, jsonPais) ;

		return pais;
		
	}		
	public static Pais toEntity(JsonPais jsonPais) {
		Pais pais = new Pais();
		
		return apply(pais, jsonPais);
	}		
	
	public static List<JsonPais> toListJsonPaiss(List<Pais> all) {
		List<JsonPais> jsonPaiss = new ArrayList<JsonPais>();
		for (Pais pais : all) {
			jsonPaiss.add(toJson(pais));
		}
		return jsonPaiss;
	}
	//converte de entidade para json --------------------
	private static JsonClient toBasicJson(Client client) {
		JsonClient jsonClient = new JsonClient();
		applyBasicJsonValues(jsonClient, client);
		return jsonClient;
	}
	
	private static Client toBasicEntity(JsonClient jsonClient) {
		Client client = new Client();
		applyBasicEntityValues(client, jsonClient);
		return client;
	}
	
	private static void applyBasicJsonValues(JsonClient jsonClient, Client client) {
		jsonClient.setId(client.getId());
	    jsonClient.setLogo(client.getLogo());
	    jsonClient.setName(client.getName());
	    jsonClient.setCnpj(client.getCnpj());
	    jsonClient.setPhoneNumber(client.getPhoneNumber());
	    jsonClient.setCorporateName(client.getCorporateName());
	}	
	private static void applyBasicEntityValues(Client client, JsonClient jsonClient) {
		client.setId(jsonClient.getId());
		client.setLogo(jsonClient.getLogo());
		client.setName(jsonClient.getName());
		client.setCnpj(jsonClient.getCnpj());
		client.setPhoneNumber(jsonClient.getPhoneNumber());
		client.setCorporateName(jsonClient.getCorporateName());
	}	
	
	public static JsonClient toJson(Client client) {
		JsonClient jsonClient = new JsonClient();

		applyBasicJsonValues(jsonClient, client);

		return jsonClient;
	}


	public static Client apply(Client client, JsonClient jsonClient) {
	
		if(client ==  null)
			client = new Client();
		
		applyBasicEntityValues(client, jsonClient) ;

		return client;
		
	}		
	public static Client toEntity(JsonClient jsonClient) {
		Client client = new Client();
		
		return apply(client, jsonClient);
	}		
	
	public static List<JsonClient> toListJsonClients(List<Client> all) {
		List<JsonClient> jsonClients = new ArrayList<JsonClient>();
		for (Client client : all) {
			jsonClients.add(toJson(client));
		}
		return jsonClients;
	}
	//converte de entidade para json --------------------
	private static JsonItem toBasicJson(Item item) {
		JsonItem jsonItem = new JsonItem();
		applyBasicJsonValues(jsonItem, item);
		return jsonItem;
	}
	
	private static Item toBasicEntity(JsonItem jsonItem) {
		Item item = new Item();
		applyBasicEntityValues(item, jsonItem);
		return item;
	}
	
	private static void applyBasicJsonValues(JsonItem jsonItem, Item item) {
		jsonItem.setId(item.getId());
	    jsonItem.setName(item.getName());
	    jsonItem.setDescription(item.getDescription());
	}	
	private static void applyBasicEntityValues(Item item, JsonItem jsonItem) {
		item.setId(jsonItem.getId());
		item.setName(jsonItem.getName());
		item.setDescription(jsonItem.getDescription());
	}	
	
	public static JsonItem toJson(Item item) {
		JsonItem jsonItem = new JsonItem();

		applyBasicJsonValues(jsonItem, item);

		ItemType type_ = item.getType();
		if (type_ != null) {
			jsonItem.setType(toJson(type_));
		}
		List<Permission> listPermissions = item.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonItem.getPermissions().add(toBasicJson(loopPermission));
			}
		}
		return jsonItem;
	}


	public static Item apply(Item item, JsonItem jsonItem) {
	
		if(item ==  null)
			item = new Item();
		
		applyBasicEntityValues(item, jsonItem) ;

		JsonItemType type_ = jsonItem.getType();
		if (type_ != null) {
			item.setType(toEntity(type_));
		}	
		ArrayList<JsonPermission> listPermissions = jsonItem.getPermissions();
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				item.addPermissions(toBasicEntity(loopJsonPermission));
			}
		}
					
		return item;
		
	}		
	public static Item toEntity(JsonItem jsonItem) {
		Item item = new Item();
		
		return apply(item, jsonItem);
	}		
	
	public static List<JsonItem> toListJsonItems(List<Item> all) {
		List<JsonItem> jsonItems = new ArrayList<JsonItem>();
		for (Item item : all) {
			jsonItems.add(toJson(item));
		}
		return jsonItems;
	}
	//converte de entidade para json --------------------
	private static JsonItemType toBasicJson(ItemType itemType) {
		JsonItemType jsonItemType = new JsonItemType();
		applyBasicJsonValues(jsonItemType, itemType);
		return jsonItemType;
	}
	
	private static ItemType toBasicEntity(JsonItemType jsonItemType) {
		ItemType itemType = new ItemType();
		applyBasicEntityValues(itemType, jsonItemType);
		return itemType;
	}
	
	private static void applyBasicJsonValues(JsonItemType jsonItemType, ItemType itemType) {
		jsonItemType.setId(itemType.getId());
	    jsonItemType.setName(itemType.getName());
	    jsonItemType.setDescription(itemType.getDescription());
	}	
	private static void applyBasicEntityValues(ItemType itemType, JsonItemType jsonItemType) {
		itemType.setId(jsonItemType.getId());
		itemType.setName(jsonItemType.getName());
		itemType.setDescription(jsonItemType.getDescription());
	}	
	
	public static JsonItemType toJson(ItemType itemType) {
		JsonItemType jsonItemType = new JsonItemType();

		applyBasicJsonValues(jsonItemType, itemType);

		return jsonItemType;
	}


	public static ItemType apply(ItemType itemType, JsonItemType jsonItemType) {
	
		if(itemType ==  null)
			itemType = new ItemType();
		
		applyBasicEntityValues(itemType, jsonItemType) ;

		return itemType;
		
	}		
	public static ItemType toEntity(JsonItemType jsonItemType) {
		ItemType itemType = new ItemType();
		
		return apply(itemType, jsonItemType);
	}		
	
	public static List<JsonItemType> toListJsonItemTypes(List<ItemType> all) {
		List<JsonItemType> jsonItemTypes = new ArrayList<JsonItemType>();
		for (ItemType itemType : all) {
			jsonItemTypes.add(toJson(itemType));
		}
		return jsonItemTypes;
	}
	//converte de entidade para json --------------------
	private static JsonOperation toBasicJson(Operation operation) {
		JsonOperation jsonOperation = new JsonOperation();
		applyBasicJsonValues(jsonOperation, operation);
		return jsonOperation;
	}
	
	private static Operation toBasicEntity(JsonOperation jsonOperation) {
		Operation operation = new Operation();
		applyBasicEntityValues(operation, jsonOperation);
		return operation;
	}
	
	private static void applyBasicJsonValues(JsonOperation jsonOperation, Operation operation) {
		jsonOperation.setId(operation.getId());
	    jsonOperation.setName(operation.getName());
	    jsonOperation.setCanEdit(operation.getCanEdit());
	    jsonOperation.setCanRead(operation.getCanRead());
	    jsonOperation.setCanUpdate(operation.getCanUpdate());
	    jsonOperation.setCanDelete(operation.getCanDelete());
	    jsonOperation.setCanExecute(operation.getCanExecute());
	}	
	private static void applyBasicEntityValues(Operation operation, JsonOperation jsonOperation) {
		operation.setId(jsonOperation.getId());
		operation.setName(jsonOperation.getName());
		operation.setCanEdit(jsonOperation.getCanEdit());
		operation.setCanRead(jsonOperation.getCanRead());
		operation.setCanUpdate(jsonOperation.getCanUpdate());
		operation.setCanDelete(jsonOperation.getCanDelete());
		operation.setCanExecute(jsonOperation.getCanExecute());
	}	
	
	public static JsonOperation toJson(Operation operation) {
		JsonOperation jsonOperation = new JsonOperation();

		applyBasicJsonValues(jsonOperation, operation);

		List<Permission> listPermissions = operation.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonOperation.getPermissions().add(toBasicJson(loopPermission));
			}
		}
		return jsonOperation;
	}


	public static Operation apply(Operation operation, JsonOperation jsonOperation) {
	
		if(operation ==  null)
			operation = new Operation();
		
		applyBasicEntityValues(operation, jsonOperation) ;

		ArrayList<JsonPermission> listPermissions = jsonOperation.getPermissions();
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				operation.addPermissions(toBasicEntity(loopJsonPermission));
			}
		}
					
		return operation;
		
	}		
	public static Operation toEntity(JsonOperation jsonOperation) {
		Operation operation = new Operation();
		
		return apply(operation, jsonOperation);
	}		
	
	public static List<JsonOperation> toListJsonOperations(List<Operation> all) {
		List<JsonOperation> jsonOperations = new ArrayList<JsonOperation>();
		for (Operation operation : all) {
			jsonOperations.add(toJson(operation));
		}
		return jsonOperations;
	}
	//converte de entidade para json --------------------
	private static JsonPermission toBasicJson(Permission permission) {
		JsonPermission jsonPermission = new JsonPermission();
		applyBasicJsonValues(jsonPermission, permission);
		return jsonPermission;
	}
	
	private static Permission toBasicEntity(JsonPermission jsonPermission) {
		Permission permission = new Permission();
		applyBasicEntityValues(permission, jsonPermission);
		return permission;
	}
	
	private static void applyBasicJsonValues(JsonPermission jsonPermission, Permission permission) {
		jsonPermission.setId(permission.getId());
	    jsonPermission.setName(permission.getName());
	}	
	private static void applyBasicEntityValues(Permission permission, JsonPermission jsonPermission) {
		permission.setId(jsonPermission.getId());
		permission.setName(jsonPermission.getName());
	}	
	
	public static JsonPermission toJson(Permission permission) {
		JsonPermission jsonPermission = new JsonPermission();

		applyBasicJsonValues(jsonPermission, permission);

		List<Role> listRoles = permission.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonPermission.getRoles().add(toBasicJson(loopRole));
			}
		}			

		Operation operation_ = permission.getOperation();
		if (operation_ != null) {
			jsonPermission.setOperation(toJson(operation_));
		}
		Item item_ = permission.getItem();
		if (item_ != null) {
			jsonPermission.setItem(toJson(item_));
		}
		return jsonPermission;
	}


	public static Permission apply(Permission permission, JsonPermission jsonPermission) {
	
		if(permission ==  null)
			permission = new Permission();
		
		applyBasicEntityValues(permission, jsonPermission) ;

		ArrayList<JsonRole> listRoles = jsonPermission.getRoles();			
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				permission.addRoles(toBasicEntity(loopJsonRole));
			}
		}
			
		JsonOperation operation_ = jsonPermission.getOperation();
		if (operation_ != null) {
			permission.setOperation(toEntity(operation_));
		}	
		JsonItem item_ = jsonPermission.getItem();
		if (item_ != null) {
			permission.setItem(toEntity(item_));
		}	
		return permission;
		
	}		
	public static Permission toEntity(JsonPermission jsonPermission) {
		Permission permission = new Permission();
		
		return apply(permission, jsonPermission);
	}		
	
	public static List<JsonPermission> toListJsonPermissions(List<Permission> all) {
		List<JsonPermission> jsonPermissions = new ArrayList<JsonPermission>();
		for (Permission permission : all) {
			jsonPermissions.add(toJson(permission));
		}
		return jsonPermissions;
	}
	//converte de entidade para json --------------------
	private static JsonRole toBasicJson(Role role) {
		JsonRole jsonRole = new JsonRole();
		applyBasicJsonValues(jsonRole, role);
		return jsonRole;
	}
	
	private static Role toBasicEntity(JsonRole jsonRole) {
		Role role = new Role();
		applyBasicEntityValues(role, jsonRole);
		return role;
	}
	
	private static void applyBasicJsonValues(JsonRole jsonRole, Role role) {
		jsonRole.setId(role.getId());
	    jsonRole.setAuthority(role.getAuthority());
	    jsonRole.setDescription(role.getDescription());
	}	
	private static void applyBasicEntityValues(Role role, JsonRole jsonRole) {
		role.setId(jsonRole.getId());
		role.setAuthority(jsonRole.getAuthority());
		role.setDescription(jsonRole.getDescription());
	}	
	
	public static JsonRole toJson(Role role) {
		JsonRole jsonRole = new JsonRole();

		applyBasicJsonValues(jsonRole, role);

		List<Session> listSessions = role.getSessions();
		if (listSessions != null) {
			for (Session loopSession : listSessions) {
				jsonRole.getSessions().add(toBasicJson(loopSession));
			}
		}			

		List<User> listUsers = role.getUsers();
		if (listUsers != null) {
			for (User loopUser : listUsers) {
				jsonRole.getUsers().add(toBasicJson(loopUser));
			}
		}			

		List<Permission> listPermissions = role.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonRole.getPermissions().add(toJson(loopPermission));
			}
		}

		return jsonRole;
	}


	public static Role apply(Role role, JsonRole jsonRole) {
	
		if(role ==  null)
			role = new Role();
		
		applyBasicEntityValues(role, jsonRole) ;

		ArrayList<JsonSession> listSessions = jsonRole.getSessions();			
		if (listSessions != null) {
			for (JsonSession loopJsonSession : listSessions) {
				role.addSessions(toBasicEntity(loopJsonSession));
			}
		}
			
		ArrayList<JsonUser> listUsers = jsonRole.getUsers();			
		if (listUsers != null) {
			for (JsonUser loopJsonUser : listUsers) {
				role.addUsers(toBasicEntity(loopJsonUser));
			}
		}
			
		ArrayList<JsonPermission> listPermissions = jsonRole.getPermissions();			
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				role.addPermissions(toEntity(loopJsonPermission));
			}
		}
		return role;
		
	}		
	public static Role toEntity(JsonRole jsonRole) {
		Role role = new Role();
		
		return apply(role, jsonRole);
	}		
	
	public static List<JsonRole> toListJsonRoles(List<Role> all) {
		List<JsonRole> jsonRoles = new ArrayList<JsonRole>();
		for (Role role : all) {
			jsonRoles.add(toJson(role));
		}
		return jsonRoles;
	}
	//converte de entidade para json --------------------
	private static JsonSession toBasicJson(Session session) {
		JsonSession jsonSession = new JsonSession();
		applyBasicJsonValues(jsonSession, session);
		return jsonSession;
	}
	
	private static Session toBasicEntity(JsonSession jsonSession) {
		Session session = new Session();
		applyBasicEntityValues(session, jsonSession);
		return session;
	}
	
	private static void applyBasicJsonValues(JsonSession jsonSession, Session session) {
		jsonSession.setId(session.getId());
	    jsonSession.setName(session.getName());
	    jsonSession.setCreationDate(DateUtil.localDateTimeAsString(session.getCreationDate()));
	}	
	private static void applyBasicEntityValues(Session session, JsonSession jsonSession) {
		session.setId(jsonSession.getId());
		session.setName(jsonSession.getName());
	    session.setCreationDate(DateUtil.stringAsLocalDateTime(jsonSession.getCreationDate()));
	}	
	
	public static JsonSession toJson(Session session) {
		JsonSession jsonSession = new JsonSession();

		applyBasicJsonValues(jsonSession, session);

		List<Role> listRoles = session.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonSession.getRoles().add(toJson(loopRole));
			}
		}

		User user_ = session.getUser();
		if (user_ != null) {
			jsonSession.setUser(toJson(user_));
		}
		return jsonSession;
	}


	public static Session apply(Session session, JsonSession jsonSession) {
	
		if(session ==  null)
			session = new Session();
		
		applyBasicEntityValues(session, jsonSession) ;

		ArrayList<JsonRole> listRoles = jsonSession.getRoles();			
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				session.addRoles(toEntity(loopJsonRole));
			}
		}
		JsonUser user_ = jsonSession.getUser();
		if (user_ != null) {
			session.setUser(toEntity(user_));
		}	
		return session;
		
	}		
	public static Session toEntity(JsonSession jsonSession) {
		Session session = new Session();
		
		return apply(session, jsonSession);
	}		
	
	public static List<JsonSession> toListJsonSessions(List<Session> all) {
		List<JsonSession> jsonSessions = new ArrayList<JsonSession>();
		for (Session session : all) {
			jsonSessions.add(toJson(session));
		}
		return jsonSessions;
	}
	//converte de entidade para json --------------------
	private static JsonUser toBasicJson(User user) {
		JsonUser jsonUser = new JsonUser();
		applyBasicJsonValues(jsonUser, user);
		return jsonUser;
	}
	
	private static User toBasicEntity(JsonUser jsonUser) {
		User user = new User();
		applyBasicEntityValues(user, jsonUser);
		return user;
	}
	
	private static void applyBasicJsonValues(JsonUser jsonUser, User user) {
		jsonUser.setId(user.getId());
	    jsonUser.setName(user.getName());
	    jsonUser.setUsername(user.getUsername());
	    jsonUser.setPassword(user.getPassword());
	    jsonUser.setEnable(user.getEnable());
	    jsonUser.setImage(user.getImage());
	}	
	private static void applyBasicEntityValues(User user, JsonUser jsonUser) {
		user.setId(jsonUser.getId());
		user.setName(jsonUser.getName());
		user.setUsername(jsonUser.getUsername());
		user.setPassword(jsonUser.getPassword());
		user.setEnable(jsonUser.getEnable());
		user.setImage(jsonUser.getImage());
	}	
	
	public static JsonUser toJson(User user) {
		JsonUser jsonUser = new JsonUser();

		applyBasicJsonValues(jsonUser, user);

		List<Role> listRoles = user.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonUser.getRoles().add(toJson(loopRole));
			}
		}

		Client owner_ = user.getOwner();
		if (owner_ != null) {
			jsonUser.setOwner(toJson(owner_));
		}
		return jsonUser;
	}


	public static User apply(User user, JsonUser jsonUser) {
	
		if(user ==  null)
			user = new User();
		
		applyBasicEntityValues(user, jsonUser) ;

		ArrayList<JsonRole> listRoles = jsonUser.getRoles();			
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				user.addRoles(toEntity(loopJsonRole));
			}
		}
		JsonClient owner_ = jsonUser.getOwner();
		if (owner_ != null) {
			user.setOwner(toEntity(owner_));
		}	
		return user;
		
	}		
	public static User toEntity(JsonUser jsonUser) {
		User user = new User();
		
		return apply(user, jsonUser);
	}		
	
	public static List<JsonUser> toListJsonUsers(List<User> all) {
		List<JsonUser> jsonUsers = new ArrayList<JsonUser>();
		for (User user : all) {
			jsonUsers.add(toJson(user));
		}
		return jsonUsers;
	}


}
