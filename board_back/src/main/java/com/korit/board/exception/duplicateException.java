package com.korit.board.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class duplicateException extends RuntimeException{

	Map<String, String> errorMap;
	String errMsg;

	public duplicateException(Map<String, String> errorMap, String key) {
		super(errorMap.get(key));
		this.errorMap = errorMap;
	}
}
