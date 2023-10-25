import React from 'react';
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import { instance } from '../../api/config/instance';
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
    const [ categories, setCategories ] = useState([]);

    const navigate = useNavigate();

    //쿼리클라이언트 객체
    const queryClient = useQueryClient();

    const principalState = queryClient.getQueryState("getPrincipal");

    useEffect(() => {
        instance.get("/board/categories")
        .then((response) => {
            setCategories(response.data);

            const nums = [1,2,3,4,5];
            const result = nums.reduce((sum, curValue) => {
                return sum + curValue;
            }, 0)

        })
    }, [])

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
                        <div>
                <ul>
                    <Link to={"/board/write"}><li>글쓰기</li></Link>
                    <Link to={"/board/all"}><li>전체 게시글 ({categories.map(category => category.boardCount).reduce((sum, curValue) => sum + curValue, 0)})</li></Link>
                    {categories.map(category => {
                        return  <Link key={category.boardCategoryId} to={`/board/${category.boardCategoryName}`}>
                                    <li>
                                        {category.boardCategoryName} ({category.boardCount})
                                    </li>
                                </Link>;
                    })}
                </ul>
            </div>

        </div>
    );
}

export default Sidebar;