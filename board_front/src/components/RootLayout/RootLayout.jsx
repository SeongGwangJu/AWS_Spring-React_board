import React from 'react';
import Header from '../Header/Header';
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

function RootLayout({children}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default RootLayout;