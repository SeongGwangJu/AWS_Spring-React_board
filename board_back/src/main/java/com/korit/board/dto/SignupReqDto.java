package com.korit.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupReqDto {
	private String email;
	private String password;
	private String name;
	private String nickname;

}
