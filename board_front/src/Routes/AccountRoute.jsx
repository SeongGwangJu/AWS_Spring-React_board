import React from 'react';
import RootContainer from '../components/RootContainer/RootContainer';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signin from '../pages/Signin/Signin';
import { useQueryClient } from 'react-query';
import MyPage from '../pages/MyPage/MyPage';
import EditPassword from '../pages/EditPassword/EditPassword';

function AccountRoute(props) {

    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("getPrincipal");

    if (!principalState?.data?.data) {
        alert("로그인 후 이용하시기 바랍니다.");
        return <Navigate to ={"/auth/signin"} />
    }

    return (
        <Routes>
            <Route path="mypage" element={ <MyPage /> } />
            <Route path="/password" element={ <EditPassword/> } />
        </Routes>
    );
}

export default AccountRoute;