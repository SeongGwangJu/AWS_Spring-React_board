package com.korit.board.controller;

import com.korit.board.aop.annotation.ArgsAop;
import com.korit.board.aop.annotation.ReturnAop;
import com.korit.board.aop.annotation.TimeAop;
import com.korit.board.aop.annotation.ValidAop;
import com.korit.board.dto.SignupReqDto;
import com.korit.board.exception.ValidException;
import com.korit.board.exception.duplicatedEmailException;
import com.korit.board.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class AuthController {


	private final AuthService authService;

	@ReturnAop
	@ArgsAop
	@TimeAop
	@ValidAop //이게 달리면 포인트컷이 이뤄짐.
//	@CrossOrigin //WebMvcConfig 만들고 나면 필요x
	@PostMapping("/auth/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) {
		System.out.println("AuthController!!");

//		if (authService.isDuplicatedEmail(signupReqDto.getEmail())) {
//			Map<String, String> errorMap = new HashMap<>();
//			errorMap.put("email", "이미 사용중인 이메일입니다.");
//			return ResponseEntity.badRequest().body(errorMap);
//		}

		duplicatedEmailCheck(signupReqDto);

		authService.signup(signupReqDto);
		System.out.println("회원가입결과 : " + authService.signup(signupReqDto));
		return ResponseEntity.ok(true);
}

	public void duplicatedEmailCheck(SignupReqDto signupReqDto) {
		if (authService.isDuplicatedEmail(signupReqDto.getEmail())) {
			Map<String, String> errorMap = new HashMap<>();
			errorMap.put("email", "이미 사용중인 이메일.");
			throw new duplicatedEmailException(errorMap);
		}
	}
}
