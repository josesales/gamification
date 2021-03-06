package br.com.gamification.core.audit;

import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import br.com.gamification.core.model.CustomRevisionEntity;

public class CustomEnversListener implements RevisionListener {
	@Override
	public void newRevision(Object revisionEntity) {

		CustomRevisionEntity customRevisionEntity = (CustomRevisionEntity) revisionEntity;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		customRevisionEntity.setUsername(authentication.getName());
	}
}
