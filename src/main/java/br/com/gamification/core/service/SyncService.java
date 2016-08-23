package br.com.gamification.core.service;

import java.util.List;


import javax.inject.Inject;
import javax.inject.Named;

import br.com.gamification.core.model.SyncInfo;
import br.com.gamification.core.json.*;
import br.com.gamification.core.model.*;
import br.com.gamification.core.persistence.DaoSyncInfo;
import br.com.gamification.core.json.DtoDataBase;

public interface SyncService {
		public DtoDataBase sync(DtoDataBase dataBase) ;
}
