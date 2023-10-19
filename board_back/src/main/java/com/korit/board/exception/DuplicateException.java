package com.korit.board.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class DuplicateException extends RuntimeException{

	Map<String, String> errorMap;
	String errMsg;

	public DuplicateException(Map<String, String> errorMap) {
		super("중복검사오류");
		this.errorMap = errorMap;
	}
}
