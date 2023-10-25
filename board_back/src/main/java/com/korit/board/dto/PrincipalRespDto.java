package com.korit.board.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PrincipalRespDto {
    //user정보로 응답. 비밀번호는 절대x!
    private int userId;
    private String email;
    private String name;
    private String nickname;
    private boolean enabled;
    private String profileUrl;
    private String oauth2Id;
    private String provider;

}
