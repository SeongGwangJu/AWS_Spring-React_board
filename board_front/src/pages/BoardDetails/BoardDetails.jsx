import React from 'react';
import RootContainer from '../../components/RootContainer/RootContainer';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../api/config/instance';
import { useState } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */


const boardContainer = css`
    position: relative;
    width: 928px;
`;

const SSideOption = css`
    position: absolute;
    right: -70px;
    height: 100%;
`;

const SLikeButton = (isLike) => css`
    //sticky 이해할 것.
    position: sticky;
    top: 150px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: ${isLike? "#7bbdff" : "#fff"};
    cursor: pointer;
`;

const SBoardTitle = css`
    width: 100%;
    //다음 줄로 넘어가고 필요한 경우에 단어의 줄바꿈도 동시에 일어남.
    word-wrap: break-word;
    text-overflow: ellipsis;

`;

const line = css`
    width: 100%;
    margin: 40px 0px;
    border-bottom: 2px solid #dbdbdb;
`;

const contentContainer = css`
    width: 100%;
    word-wrap: break-word;

    & * {
        word-wrap: break-word;
    }
    & img {
        max-width: 100%;
    }
`;

function BoardDetails(props) {

    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState("getPrincipal")

    const { boardId } = useParams();
    const [ board, setBoard ] = useState({});
    const [ like, setLike ] = useState({});

    const getBoard = useQuery(["getBoard"], async () => {
        try {
            return await instance.get(`/board/${boardId}`);
        }catch(error) {

        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: response => {
            setBoard(response.data);
        }
    })

    const getLikeState = useQuery(["getLikeState"], async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            return await instance.get(`/board/like/${boardId}`, option);
        }catch(error) {

        }
    }, {
        refetchOnWindowFocus: false,
        retry: 0
        }
    )

    if(getBoard.isLoading) {
        return <></>
    }

    const handleLikeBtnClick = async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        try{
            if(!!getLikeState?.data?.data) {
                await instance.delete(`/board/like/${boardId}`, option);
            }else {
                await instance.post(`/board/like/${boardId}`, {}, option);
            }
            getLikeState.refetch();
        }catch(error) {
            console.error(error);
        }
    }

    return (
        <RootContainer>
            <div css={boardContainer}>
                <div css={SSideOption}>
                    {!getLikeState.isLoading &&
                        <button disabled={!principal?.data?.data}
                                css={SLikeButton(getLikeState?.data?.data)}
                                onClick={handleLikeBtnClick}>
                            <div>♥</div>
                            <div></div>
                        </button>
                    }
                </div>
                <h1 css={SBoardTitle}>{board.boardTitle}</h1>
                <p><b>{board.nickname}</b> - {board.createDate}</p>
                <div css={line}></div>
                {/* 리액트에서 InnerHTML쓰는 방법 */}
                <div css={contentContainer} dangerouslySetInnerHTML={{__html: board.boardContent}}></div>
            </div>
        </RootContainer>
    );
}

export default BoardDetails;