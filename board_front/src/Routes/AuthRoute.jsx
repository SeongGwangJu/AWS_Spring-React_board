import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Signup/Signup';
import { useQueryClient } from 'react-query';
import SignupOauth2Merge from '../pages/Signup/SignupOauth2Merge';

function AuthRoute(props) {

    
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState("getPrincipal");

    if(!!principalState?.data?.data) {
        return <Navigate to={"/"} />
    }

    return (
        <Routes>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="oauth2/signup" element={ <SignupOauth2 /> } />
            <Route path="oauth2/signup/merge" element={ <SignupOauth2Merge /> } />
        </Routes>
    );
}

export default AuthRoute;