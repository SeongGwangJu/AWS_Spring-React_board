import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px

    & > a {
        color: black;
        text-decoration: none;
    }
`;

function Header(props) {
    return (
        <div css={header}>
            <Link to = {"/"} >
            <h1>게시판 프로젝트</h1>
            </Link>
        </div>
    );
}

export default Header;