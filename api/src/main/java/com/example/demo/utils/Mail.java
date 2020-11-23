package com.example.demo.utils;

import lombok.Data;

@Data
public class Mail {
	private String fromEmail;
    private String to;
    private String subject;
    private String fromName;
    private String message;
}
