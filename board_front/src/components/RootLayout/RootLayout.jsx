import React from 'react';
import Header from '../Header/Header';
import { css } from "@emotion/react";
import Sidebar from '../Sidebar/Sidebar';
/** @jsxImportSource @emotion/react */

const layout = css`
    margin: 20px auto;
    width: 1300px;
`;
function RootLayout({children}) {
    return (
        <div css={layout}>
            <Header />
            {children}
        </div>
    );
}

export default RootLayout;