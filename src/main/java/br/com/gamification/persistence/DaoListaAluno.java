package br.com.gamification.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Query;

import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.ListaAluno;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoListaAluno extends AccessibleHibernateDao<ListaAluno> {
	private static final Logger LOGGER = Logger.getLogger(DaoListaAluno.class);

	public DaoListaAluno() {
		super(ListaAluno.class);
	}

	public ListaAluno getListaAluno(int idAluno, int idLista) {
		String hql = "select la from ListaAluno la where la.lista.id = :idLista and la.aluno.id = :idAluno";
		List<ListaAluno> listaDoAluno = new ArrayList<ListaAluno>();
		
		Query query = query(hql);
		query.setParameter("idLista", idLista);
		query.setParameter("idAluno", idAluno);
		listaDoAluno.addAll(query.list());
		if(listaDoAluno.isEmpty()) {
			return null;
		}
		return listaDoAluno.get(0);
	}
	
}
