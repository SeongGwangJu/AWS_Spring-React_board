package com.korit.board.controller;

import com.korit.board.dto.SignupReqDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

	@CrossOrigin
	@PostMapping("/auth/signup")
	public ResponseEntity<?> signup(@RequestBody SignupReqDto signupReqDto) {
		System.out.println(signupReqDto);
		return ResponseEntity.ok(true);
	}
}
