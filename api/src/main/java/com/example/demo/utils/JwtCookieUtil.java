package com.example.demo.utils;

import org.springframework.http.ResponseCookie;

public class JwtCookieUtil {
	
	private final static String jwtCookieName = "jwt-token";
	private final static Integer cookieDuration = 3600 * 24;
	
	public static String getCookieForToken(String token) {
		final ResponseCookie cookie =
				ResponseCookie.from(jwtCookieName, token)
				.httpOnly(true)
				.maxAge(cookieDuration)
				.path("/")
				.build();
		return cookie.toString();
	}

	public static String clearCookieForToken() {
		final ResponseCookie cookie = 
				ResponseCookie.from(jwtCookieName, "")
				.httpOnly(true)
				.maxAge(0)
				.path("/")
				.build();
		return cookie.toString();
	}

}
