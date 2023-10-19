package com.korit.board.service;

import com.korit.board.dto.SigninReqDto;
import com.korit.board.dto.SignupReqDto;
import com.korit.board.entity.User;
import com.korit.board.exception.DuplicateException;
import com.korit.board.jwt.JwtProvider;
import com.korit.board.repository.UserMapper;
import com.korit.board.security.PrincipalProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserMapper userMapper;
	private final BCryptPasswordEncoder passwordEncoder;
	private final PrincipalProvider principalProvider;
	private final JwtProvider jwtProvider;

	public boolean signup(SignupReqDto signupReqDto) {
//        User user = new User();
//        user.setEmail(signupReqDto.getEmail());
//        user.setPassword(passwordEncoder.encode(signupReqDto.getPassword())); //지저분함_Dto 클래스에 함수를 만들어 사용

		User user = signupReqDto.toUserEntity(passwordEncoder);

		int errorCode = userMapper.checkDuplicate(user);
		System.out.println(errorCode);
		if(errorCode > 0) {
			responseDuplicateError(errorCode);
		}

		return userMapper.saveUser(user) > 0;
	}

	private void responseDuplicateError(int errorCode) {
		Map<String, String> errorMap = new HashMap<>();
		switch (errorCode){
			case 1:
				//이메일 중복
				errorMap.put("email", "이미 사용중인 이메일입니다.");
				break;
			case 2:
				//닉네임 중복
				errorMap.put("nickname", "이미 사용중인 닉네임입니다.");
				break;
			case 3:
				//둘다 중복 -> 이메일 우선 처리
				errorMap.put("email", "이미 사용중인 이메일입니다.");
				errorMap.put("nickname", "이미 사용중인 닉네임입니다.");
				break;
		}
		throw new DuplicateException(errorMap);
	}

	public String signin(SigninReqDto signinReqDto){
		// UsernamePasswordAuthenticationToken은 Authentication을 impl 하고 있음

		//dto를 통해서 email, pw 만 넣어서 토큰 생성 한뒤
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(signinReqDto.getEmail(), signinReqDto.getPassword());
		//authenticate() 함수를 호출해서 인증 처리를 한 뒤에 권한이 추가된 Auth 객체를 생성
		//authenticationManager를 쓰니까 문제가 생김 -> principalProvider를 만들어 생성.
		Authentication authentication = principalProvider.authenticate(authenticationToken);

		//위의 문장을 통해 ,성공적으로 authentication 객체를 생성했으면 다음 문장을 실행
		return jwtProvider.generateToken(authentication);
	}

	public Boolean authenticate(String token) {
		Claims claims = jwtProvider.getClaims(token);
		if(claims == null){
			throw new JwtException("인증 토큰 유효성 검사 실패");
		}
		//null이 아니면 쓸 수 있는 토큰
		//이메일 인증 여부를 한번더 확인하여 반환
		return Boolean.parseBoolean(claims.get("enabled").toString());
	}
}