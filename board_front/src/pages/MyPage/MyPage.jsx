import React, { useEffect, useRef, useState } from 'react';
import RootContainer from '../../components/RootContainer/RootContainer';
import { useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../api/firebase/firebase"
import { Line } from 'rc-progress';
import { Link, useNavigate } from 'react-router-dom';

function Mypage(props) {

    const navigate = useNavigate();
    const queyrClient = useQueryClient();
    const principalState = queyrClient.getQueryState("getPrincipal");
    const principal = principalState.data.data;
    const profileFileRef = useRef();
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ profileImgSrc, setProfileImgSrc ] = useState("");
    const [ progressPercent, setProgressPercent ] = useState(0);

    useEffect(() => {
        console.log(principal)
        setProfileImgSrc(principal.profileUrl);
    }, [])

    const handleProfileUploadClick = () => {
        if(window.confirm("프로필 사진을 변경하시겠습니까?")) {
            profileFileRef.current.click();
        }
    }

    const handleProfileFileChange = (e) => {
        const files = e.target.files;

        if(!files.length) {
            setUploadFiles([]);
            e.target.value = "";
            return;
        }
        for(let file of files) {
            setUploadFiles([...uploadFiles, file]);
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImgSrc(e.target.result);
        }

        reader.readAsDataURL(files[0])
    }
    const handleUploadSubmit = () => {
        console.log(uploadFiles[0]);
        //firebase전용함수 : ref(저장소정보, 경로/.../파일명)
        const storageRef = ref(storage, `files/profile/${uploadFiles[0].name}`);
        //업로드 함.
        const uploadTask = uploadBytesResumable(storageRef, uploadFiles[0]);

        uploadTask.on(
            "state_changed", // 파일이 변하고 있을 때(ex.isLoading)
            (snapshot) => {
                setProgressPercent(
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                )

            },
            (error) => {
                console.error(error);
            },

            () => {
                //화면 이미지 변경 + 서버에 이미지 저장.
                getDownloadURL(storageRef).then(downloadUrl => {
                    console.log(downloadUrl);
                    setProfileImgSrc(downloadUrl);
                    const option = {
                        headers: {
                            Authorization: localStorage.getItem("accessToken")
                        }
                    }
                    instance.put("/account/profile/img", {profileUrl : downloadUrl}, option)
                    .then(() => {
                        alert("프로필 사진이 변경되었습니다.")
                        window.location.reload(); //새로고침 되며 DB에 있는 사진으로 바꿔옴.
                    })
                })
            }
        )
    }
    const handleUploadCancel = () => {
        setUploadFiles([]);
        profileFileRef.current.value = "";
    }
    const file = css`
        display: none;
    `;

    const infoHeader = css`
    display: flex;
    align-items: center;
    margin: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
`;

    const imgBox = css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        overflow: hidden;
        cursor: pointer;

        & > img {
            width: 100%;
        }
    `;


    const handleSendMail = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            await instance.post("/account/mail/auth", {}, option);
            alert("인증메일 전송 완료. 인증 요청 메일을 확인해주세요.");
        }catch(error) {
            alert("인증메일 전송 실패. 다시 시도해주세요.");
        }
    }

    return (
        <RootContainer>
            <div>
                <div css = {infoHeader}>
                    <div>
                        <div css={imgBox} onClick={handleProfileUploadClick}>
                            <img src={profileImgSrc} alt="" />
                        </div>
                        <input css={file} type="file"
                                onChange={handleProfileFileChange} ref={profileFileRef} />
                        {!!uploadFiles.length &&
                        
                            <div>
                                <Line percent={progressPercent} strokeWidth={4} strokeColor="#dbdbdb" />
                                <button onClick={handleUploadSubmit}>변경</button>
                                <button onClick={handleUploadCancel}>취소</button>
                            </div>
                        }
                        <h3>누적 포인트: {principal.userPoint} Point</h3> <button onClcik={() => {navigate("/store/products")}}>포인트 구매</button>
                    </div>
                </div>
                <div>
                    <div>닉네임: {principal.nickname}</div>
                    <div>이름: {principal.name}</div>
                    <div>이메일: {principal.email}
                        {principal.enabled
                        ? <button disabled={true}>인증완료</button>
                        : <button onClick={handleSendMail}>인증하기</button>}
                        
                    </div>
                </div>
            </div>
            <Link to= {"/account/password"}>비밀번호 변경</Link>

        </RootContainer>
    );
}

export default Mypage;