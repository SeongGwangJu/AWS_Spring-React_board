import React from 'react';
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
/** @jsxImportSource @emotion/react */

const layout = css`
    margin-right: 10px;
    width: 340px;
`;
const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 20px;
`;
function Sidebar(props) {

    const navigate = useNavigate();

    //쿼리클라이언트 객체
    const queryClient = useQueryClient();

    const principalState = queryClient.getQueryState("getPrincipal");

    const handleSigninClick = () => {
        navigate("auth/signin");
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("accessToken");
        //navigate를 쓰면 상태가 유지되기때문에(변한부분만 변함, Virtual DOM)
        //전체를 불러오기위해 아래 코드로 사용.
        window.location.replace("/");
    }

    return (
        <div css={layout}>
            {!!principalState?.data?.data ? ( //값이 있으면 = 인증된 사용자
                <div css={container}>
                    <h3>{principalState.data.data.nickname}님 환영합니다.</h3>
                    <div><button onClick={handleLogoutClick}>로그아웃</button></div>
                    <div>
                        <Link to={"/account/mypage"}>마이페이지</Link>
                    </div>
                </div>
            ) : ( //값이 없으면
                <div css={container}>
                    <h3>로그인 후 게시판을 이용해보세요</h3>
                    <div><button onClick={handleSigninClick}>로그인</button></div>
                    <div>
                        <Link to={"/auth/forgot/password"}>비밀번호 찾기</Link>
                        <Link to={"/auth/signup"}>회원가입</Link>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Sidebar;