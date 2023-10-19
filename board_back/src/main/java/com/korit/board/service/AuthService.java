package com.korit.board.service;

import com.korit.board.dto.SigninReqDto;
import com.korit.board.dto.SignupReqDto;
import com.korit.board.entity.User;
import com.korit.board.exception.duplicateException;
import com.korit.board.jwt.JwtProvider;
import com.korit.board.repository.UserMapper;
import com.korit.board.security.PrincipalProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserMapper userMapper;
	private final BCryptPasswordEncoder passwordEncoder;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final PrincipalProvider principalProvider;
	private final JwtProvider jwtProvider;


	public boolean signup(SignupReqDto signupReqDto) {
		boolean result = false;
		User user = signupReqDto.toUserEntity(passwordEncoder);
		Map<String, String> errorMap = new HashMap<>();

		switch (userMapper.checkDuplicate(user)) {
			case 1:
				errorMap.put("email", "이미 사용중인 이메일입니다.");
				throw new duplicateException(errorMap, "email");
			case 2:
				errorMap.put("nickname", "이미 사용중인 닉네임입니다.");
				throw new duplicateException(errorMap, "nickname");
			case 3:
				errorMap.put("emailNickname", "이미 사용중인 이메일과 닉네임입니다.");
				throw new duplicateException(errorMap, "emailNickname");
		}

		result = userMapper.saveUser(user) > 0;

		return result;
	}
	public String signin(SigninReqDto signinReqDto) {
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(signinReqDto.getEmail(), signinReqDto.getPassword());

		Authentication authentication = principalProvider.authenticate(authenticationToken);

		return jwtProvider.generateToken(authentication);
	}

	public boolean authenticate(String token) {
		Claims claims = jwtProvider.getClaims(token);
		if(claims == null) {
			throw new JwtException("인증 토큰 유효성 검사 실패");
		}
		return Boolean.parseBoolean(claims.get("enabled").toString());
	}

}
