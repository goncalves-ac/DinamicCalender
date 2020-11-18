package com.example.demo.exceptions;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GlobalExceptionResponse {
	
	private LocalDateTime timestamp;
	private int status;
	private String message;
	private String error;
	private String path;
	
}
