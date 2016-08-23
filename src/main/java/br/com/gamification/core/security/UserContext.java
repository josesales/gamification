package br.com.gamification.core.security;

import br.com.gamification.model.User;

public interface UserContext {

	User getCurrentUser();

	String getCurrentUserName();
	
	void setCurrentUser(User user);
}
