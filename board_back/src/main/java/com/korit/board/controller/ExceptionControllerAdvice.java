package com.korit.board.controller;

import com.korit.board.exception.ValidException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice //예외를 처리하기 위한 컨트롤러
public class ExceptionControllerAdvice {

	@ExceptionHandler(ValidException.class)
	public ResponseEntity<?> validException(ValidException validException){
		System.out.println("유효성 검사 예외 처리");
		return ResponseEntity.badRequest().body(validException.getErrorMap());
	}
}