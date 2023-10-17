import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';

function Signin(props) {

    const navigate = useNavigate();

    const user = {
        username: "",
        password: ""
    }

    const err = {
        errCode:"",
        errMsg:"",
        errResMsg:""
    }

    const [ errDisplay, setErrDisplay ] = useState(err)
    const [ signinUser, setSigninUser ] = useState(user);

    const handleInputChange = (e) => {
        setSigninUser({
            ...signinUser,
            [e.target.name]: e.target.value
        });
    }

    let errMsg = "";

    const handleSigninSubmit = async () => {
        try {
            const response = await instance.post("/auth/signin", signinUser);
            console.log("login 응답")
            console.log("response")

        }catch(error) {
            console.error(error);
            setErrDisplay({
                errCode:error.code,
                errMsg:error.message,
                errResMsg:error.response.data.message
            });

        }
    }
    const handleSignupClick = () => {
        navigate("/auth/signup")
    }

    return (
        <div>
            <div><input type="text" name='' onChange={handleInputChange} placeholder='' /></div>
            <div><input type="text" name='' onChange={handleInputChange} placeholder='' /></div>
            <div>{errDisplay.errCode}<br /> {errDisplay.errMsg} <br /> {errDisplay.errResMsg} </div>
            <div><button onClick={handleSigninSubmit}>로그인</button></div>
            <div><button onClick={handleSignupClick}>회원가입</button></div>
        </div>

    );
}

export default Signin;