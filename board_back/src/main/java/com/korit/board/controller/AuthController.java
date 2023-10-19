package com.korit.board.controller;

import com.korit.board.aop.annotation.ArgsAop;
import com.korit.board.aop.annotation.ReturnAop;
import com.korit.board.aop.annotation.TimeAop;
import com.korit.board.aop.annotation.ValidAop;
import com.korit.board.dto.SigninReqDto;
import com.korit.board.dto.SignupReqDto;
import com.korit.board.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


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

		authService.signup(signupReqDto);
		return ResponseEntity.ok(authService.signup(signupReqDto));
	}

	@ArgsAop
	@PostMapping("/auth/signin")
	public ResponseEntity<?> signin(@RequestBody SigninReqDto signinReqDto) {
		return ResponseEntity.ok(authService.signin(signinReqDto));
	}

	@GetMapping("/auth/token/authenticate")
	public ResponseEntity<?> authenticate(@RequestHeader(value = "Authorization") String token) {
	}
}


