package com.korit.board.controller;

import com.korit.board.aop.annotation.ArgsAop;
import com.korit.board.aop.annotation.ValidAop;
import com.korit.board.dto.PrincipalRespDto;
import com.korit.board.dto.UpdatePasswordReqDto;
import com.korit.board.dto.UpdateProfileImgReqDto;
import com.korit.board.entity.User;
import com.korit.board.security.PrincipalUser;
import com.korit.board.service.AccountService;
import com.korit.board.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final MailService mailService;

    @GetMapping("/account/principal")
    public ResponseEntity<?> getPrincipal() {
        PrincipalUser principalUser =
                (PrincipalUser) SecurityContextHolder.getContext()
                        .getAuthentication().getPrincipal();

        //db에서 가져온 user
        User user = principalUser.getUser();
        PrincipalRespDto principalRespDto = user.toPrincipalDto();
        return ResponseEntity.ok(principalRespDto); //user정보로 응답. 비밀번호는 절대x!
    }

    @PostMapping("/account/mail/auth")
    public ResponseEntity<?> sendAuthenticationMail() {
        return ResponseEntity.ok(mailService.sendAuthMail());
    }

    @PutMapping("/account/profile/img")
    public ResponseEntity<?> uploadProfileImg(@RequestBody UpdateProfileImgReqDto updateProfileImgReqDto) {
        return ResponseEntity.ok(accountService.updateProfileImg(updateProfileImgReqDto));
    }

    @ArgsAop
    @ValidAop
    @PutMapping("/account/password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdatePasswordReqDto updatePasswordReqDto, BindingResult bindingResult) {
        return ResponseEntity.ok(accountService.updatePassword(updatePasswordReqDto));
    }
}











