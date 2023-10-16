package com.korit.board.exception;

import lombok.Getter;

import java.util.Map;

//런타임 시점에 일어날 수 있는 예외
@Getter
public class ValidException extends RuntimeException {
	private Map<String, String> errorMap;

	public ValidException(Map<String, String> errorMap) {
		super("유효성 검사 오류");
		this.errorMap = errorMap;

	}
}
