import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin(props) {

    const navigate = useNavigate();

    const user = {
        username: "",
        password: ""
    }
    const [ signinUser, setSigninUser ] = useState(user);

    const handleInputChange = (e) => {
        setSigninUser({
            ...signinUser,
            [e.target.name]: e.target.value
        });
    }

    const handleSignupClick = () => {
        navigate("/auth/signup")
    }

    return (
        <div>
            <div><input type="text" name='' onChange={handleInputChange} placeholder='' /></div>
            <div><input type="text" name='' onChange={handleInputChange} placeholder='' /></div>
            <div><button>로그인</button></div>
            <div><button onClick={handleSignupClick}>회원가입</button></div>
        </div>
    );
}

export default Signin;