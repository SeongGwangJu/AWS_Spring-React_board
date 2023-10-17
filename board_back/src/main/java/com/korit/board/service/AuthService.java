package com.korit.board.service;

import com.fasterxml.jackson.databind.ser.std.StdArraySerializers;
import com.korit.board.dto.SignupReqDto;
import com.korit.board.entity.User;
import com.korit.board.repository.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserMapper userMapper;
	private final BCryptPasswordEncoder passwordEncoder;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	public Boolean isDuplicatedEmail(String email) {
		boolean result = false;

		System.out.println("중복된 아이디 갯수 : " + userMapper.getUserCountByEmail(email));
		result = userMapper.getUserCountByEmail(email) > 0;
		return result;
	}

	public boolean signup(SignupReqDto signupReqDto) {
		boolean result = false;

		User user = signupReqDto.toUserEntity(passwordEncoder);

		result = userMapper.saveUser(user) > 0;

		return result;
	}


}
