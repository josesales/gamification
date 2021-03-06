package br.com.gamification.core.json;

import java.util.List;

public class JsonPaginator<JsonEntity> {
	private final List<JsonEntity> itens;
	private final Integer actualPage;
	private final Long totalRecords;

	public JsonPaginator(List<JsonEntity> itens, Integer actualPage, Long totalRecords) {
		super();
		this.itens = itens;
		this.actualPage = actualPage;
		this.totalRecords = totalRecords;
	}

	public List<JsonEntity> getItens() {
		return itens;
	}

	public Integer getActualPage() {
		return actualPage;
	}

	public Long getTotalRecords() {
		return totalRecords;
	}
}
