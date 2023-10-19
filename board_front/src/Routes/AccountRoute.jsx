import React from 'react';
import RootContainer from '../components/RootContainer/RootContainer';
import { Navigate, Route } from 'react-router-dom';
import Signin from '../pages/Signin/Signin';
import { useQueryClient } from 'react-query';
import MyPage from '../pages/MyPage/MyPage';

function AccountRoute(props) {

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("getPrincipal");

    if (!principalState?.data?.data) {
        alert("로그인 후 이용하시기 바랍니다.");
        return <Navigate to ={"/auth/signin"} />
    }

    return (
        <Route>
            <Route path="mypage" element={ <MyPage /> } />
            <Route path="/password" element={ <></> } />
        </Route>
    );
}

export default AccountRoute;