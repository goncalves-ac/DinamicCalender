package com.example.demo.util;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;

import com.example.demo.config.UserDetail;

public class CustomInMemoryUserDetailsManager implements UserDetailsManager {

	private final Map<String, User> users = new HashMap<>();
	
	public CustomInMemoryUserDetailsManager(Collection<UserDetail> users) {
		users.forEach(u -> this.createUser(u));
	}
	
    @Override
    public void createUser(UserDetails user) {
        Assert.assertTrue(!userExists(user.getUsername()));

        users.put(user.getUsername().toLowerCase(), (User) user);
    }
    
    
    public void createUser(UserDetail user) {
        Assert.assertTrue(!userExists(user.getUsername()));

        users.put(user.getUsername().toLowerCase(), (User) user);
    }

    @Override
    public void updateUser(UserDetails user) {
        Assert.assertTrue(userExists(user.getUsername()));

        users.put(user.getUsername().toLowerCase(), (User) user);
    }

    @Override
    public void deleteUser(String username) {
        users.remove(username.toLowerCase());
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean userExists(String username) {
        return users.containsKey(username.toLowerCase());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = users.get(username.toLowerCase());

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        return user;
    }

}
