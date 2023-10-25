package com.korit.board.controller;

import com.korit.board.aop.annotation.ArgsAop;
import com.korit.board.aop.annotation.TimeAop;
import com.korit.board.aop.annotation.ValidAop;
import com.korit.board.dto.SigninReqDto;
import com.korit.board.dto.SignupReqDto;
import com.korit.board.exception.ValidException;
import com.korit.board.service.AccountService;
import com.korit.board.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final AccountService accountService;

	//    @CrossOrigin //config 클래스에서 cors 처리
	@ArgsAop
	@ValidAop //이걸 달아주면 알아서 포인트컷을 찾아서 aspect를 실행시켜줌
	@PostMapping("/auth/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) {
//        System.out.println("AuthController_signup()");

		return ResponseEntity.ok().body(authService.signup(signupReqDto));
	}

	@PostMapping("/auth/signin")
	public ResponseEntity<?> signin(@RequestBody SigninReqDto signinReqDto) {

		return ResponseEntity.ok().body(authService.signin(signinReqDto)); // 토큰을 return함.
	}

	@GetMapping("/auth/token/authenticate")
	public ResponseEntity<?> authenticate(@RequestHeader(value = "Authorization") String token) {


		return ResponseEntity.ok(true);
	}

	@GetMapping("/auth/mail")
	public ResponseEntity<?> authenticateMail(String token) {
		return ResponseEntity.ok(accountService.authenticateMail(token) ? "인증이 완료되었습니다." : "인증 실패");
	}

	@PostMapping("/account/profile/img")
	public ResponseEntity<?> uploadProfileImg() {
		return ResponseEntity.ok(null);
	}


	@ValidAop
	@PutMapping("/auth/oauth2/merge")
	public ResponseEntity<?> oauth2Merge(@Valid @RequestBody MergeOauth2ReqDto mergeOauth2ReqDto, BindingResult bindingResult) {
		return ResponseEntity.ok(authService.mergeOauth2(mergeOauth2ReqDto));
	}

}