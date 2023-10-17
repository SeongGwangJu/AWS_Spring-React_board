package com.korit.board.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class duplicatedEmailException extends RuntimeException{

	Map<String, String> errorMap;
	String errMsg;
	public duplicatedEmailException(Map<String, String> errorMap) {
		super(errorMap.get("email"));
		this.errorMap = errorMap;
	}
}
