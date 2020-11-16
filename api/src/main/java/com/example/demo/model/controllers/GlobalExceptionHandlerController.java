package com.example.demo.model.controllers;


import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.DuplicateEntryException;
import com.example.demo.exceptions.ForbiddenActionException;
import com.example.demo.exceptions.GlobalExceptionResponse;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.ServerErrorException;
import com.example.demo.exceptions.UnauthorizedException;

@RestControllerAdvice
@ResponseBody
public class GlobalExceptionHandlerController {
	
	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandlerController.class);
	
	private static final LocalDateTime timestamp = LocalDateTime.now();
	
	private static final void logError(int status, String msg) {
		logger.error("Error: " + status+"/"+msg + " @"+timestamp);
	}
	
	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(value=HttpStatus.BAD_REQUEST)
	public GlobalExceptionResponse handleBadRequestException(
			BadRequestException e, HttpServletRequest req) {
		int status = HttpStatus.BAD_REQUEST.value();
		String msg = e.getMessage();
		String error = e.getMessage();
		String path = req.getRequestURI();
		logError(status, msg);
		return new GlobalExceptionResponse(timestamp, status, msg, error, path);
	}
	
	@ExceptionHandler(DuplicateEntryException.class)
	@ResponseStatus(value=HttpStatus.CONFLICT)
	public GlobalExceptionResponse handleDuplicateEntryException(
			DuplicateEntryException e, HttpServletRequest req) {
		int status = HttpStatus.CONFLICT.value();
		String msg = e.getMessage();
		String error = e.getMessage();
		String path = req.getRequestURI();
		logError(status, msg);
		return new GlobalExceptionResponse(timestamp, status, msg, error, path);
	}
	
	@ExceptionHandler(ForbiddenActionException.class)
	@ResponseStatus(value=HttpStatus.FORBIDDEN)
	public GlobalExceptionResponse handleForbiddenActionException(
			ForbiddenActionException e, HttpServletRequest req) {
		int status = HttpStatus.FORBIDDEN.value();
		String msg = e.getMessage();
		String error = e.getMessage();
		String path = req.getRequestURI();
		logError(status, msg);
		return new GlobalExceptionResponse(timestamp, status, msg, error, path);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value=HttpStatus.NOT_FOUND)
	public GlobalExceptionResponse handleResourceNotFoundException(
			ResourceNotFoundException e, HttpServletRequest req) {
		int status = HttpStatus.NOT_FOUND.value();
		String msg = e.getMessage();
		String error = e.getMessage();
		String path = req.getRequestURI();
		logError(status, msg);
		return new GlobalExceptionResponse(timestamp, status, msg, error, path);
	}
	
	@ExceptionHandler(value = {UnauthorizedException.class, AccessDeniedException.class})
	@ResponseStatus(value=HttpStatus.UNAUTHORIZED)
	public GlobalExceptionResponse handleUnauthorizedException(
			Exception e, HttpServletRequest req) {
		int status = HttpStatus.UNAUTHORIZED.value();
		String msg = e.getMessage();
		String error = e.getMessage();
		String path = req.getRequestURI();
		logError(status, msg);
		return new GlobalExceptionResponse(timestamp, status, msg, error, path);	
	}
	
	@ExceptionHandler(ServerErrorException.class)
	@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
	public GlobalExceptionResponse handleServerErrorException(
			ServerErrorException e, HttpServletRequest req) {
		int status = HttpStatus.INTERNAL_SERVER_ERROR.value();
		String msg = e.getMessage();
		String error = e.getMessage();
		String path = req.getRequestURI();
		logError(status, msg);
		return new GlobalExceptionResponse(timestamp, status, msg, error, path);		
	}
		
}
