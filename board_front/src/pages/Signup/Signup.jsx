import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/config/instance';

function Signup(props) {

    const navigate = useNavigate();
    const user = {
        email: "",
        password: "",
        name: "",
        username: ""
    }

    const [ signupUser, setSignupUser ] = useState(user);

    const handleInputChange = (e) => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value
        });
    }
    const handleSignupSumbit = async () => {
        try {
            const response = await instance.post("/auth/signup", signupUser);
        }catch(error) {
            console.error(error);
        }
        //요청 날릴 때 객체여야함.
    }
    const handleSigninClick = () => {
        navigate("/auth/signin");
    }

    return (
        <div>
            <div><input type="email" name="email" placeholder='이메일' onChange={handleInputChange} /></div>
            <div><input type="password" name="password" placeholder='비밀번호' onChange={handleInputChange} /></div>
            <div><input type="text" name="name" placeholder='이름' onChange={handleInputChange} /></div>
            <div><input type="text" name="nickname" placeholder='닉네임' onChange={handleInputChange} /></div>

            <div><button onClick={handleSignupSumbit}>가입하기</button></div>
            <div><button onClick={handleSigninClick}>로그인</button></div>
        </div>
    );
}

export default Signup;