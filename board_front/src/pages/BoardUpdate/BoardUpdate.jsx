import React, { useEffect, useState } from 'react';
import RootContainer from '../../components/RootContainer/RootContainer';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import { instance } from "../../api/config/instance";
import { css } from '@emotion/react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

const buttonContainer = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    width: 100%;
`;

const categoryContainer = css`
    display: flex;
    margin-bottom: 10px;
`

const selectBox = css`
    flex-grow: 1;
`;

const titleInput = css`
    margin-bottom: 10px;
    width: 100%;
    height: 50px;
`;


function BoardUpdate(props) {



    const [ boardContent, setBoardContent ] = useState({
        boardTitle: "",
        content: "",
        categoryId: 0,
        categoryName: ""
    });
    const [ categories, setCategories ] = useState([]);
    const [ newCategory, setNewCategory ] = useState("");
    const [ selectOptions, setSelectOptions ] = useState([]);
    const [ selectedOption, setSelectedOption ] = useState(selectOptions[0]);
    const [ board, setBoard ] = useState({});

    const queryClient = useQueryClient();
    const { boardId } = useParams();
    const getBoard = useQuery(["getBoard"], async () => {
        try {
            return await instance.get(`/board/${boardId}`);
        }catch(error) {

        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log(response.data)
            setBoardContent({
                boardTitle: response.data.boardTitle,
                content: response.data.boardContent,
                categoryId: response.data.boardCategoryId,
                categoryName: "ㅋㅋ"
            })
            setBoard(response.data);
        }
    })

    useEffect(() => {
        const principal = queryClient.getQueryState("getPrincipal");
        // console.log(principal);
        if(!principal.data) {
            alert("로그인 후 게시글을 작성하세요.");
            window.location.replace("/");
            return;
        }

        if(!principal?.data?.data.enabled) {
            alert("이메일 인증 후 게시글을 작성하세요.");
            window.location.replace("/account/mypage");
            return;
        }
        
    }, [])

    useEffect(() => {
        instance.get("/board/categories")
        .then((response) => {
            setCategories(response.data);
            setSelectOptions(
                response.data.map(
                    category => {
                        return { value: category.boardCategoryId, label: category.boardCategoryName }
                    }
                )
            )
        })
    }, [])

    useEffect(() => {
        if(!!newCategory) {
            const newOption = { value: 0, label: newCategory };

            setSelectedOption(newOption);
            if(!selectOptions.map(option => option.label).includes(newOption.label)) {
                setSelectOptions([
                    ...selectOptions,
                    newOption
                ]);
            }
        }
    }, [newCategory])

    useEffect(() => {
        setBoardContent({
            ...boardContent,
            categoryId: selectedOption?.value,
            categoryName: selectedOption?.label
        });
    }, [selectedOption]);

    const modules = {
        toolbar: {
            container: [
                [{header: [1, 2, 3, false]}],
                ["bold", "underline"],
                ["image"]
            ]
        }
    }

    const handleTitleInput = (e) => {
        console.log(e.type + " : ", e.target.value);
        setBoardContent({
            boardTitle: e.target.value
        });
        console.log(e.target.value)
    };

    const handleContentInput = (value) => {
        setBoardContent({
            ...boardContent,
            content: value
        });
        console.log(boardContent)
    }

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    }

    const handleCategoryAdd = () => {
        const categoryName = window.prompt("새로 추가할 카테고리명을 입력하세요.");
        if(!categoryName) {
            return;
        }
        setNewCategory(categoryName);
    }

    const handleWriteSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            console.log(boardContent);
            await instance.post("/board/content", boardContent, option);
        } catch(error) {
            console.error(error);
        }
    }

    const handleTestClick = () => {
        // console.log("boardContent");
        // console.log(boardContent);
        // console.log(categories);
        // console.log(selectOptions);
        // console.log(selectedOption);
        // console.log(boardId);
        console.log(boardContent);
        console.log(board)
    }
    return (
        <RootContainer>
            <div>
                <h1>수정하기</h1>
                <div css={categoryContainer}>
                    <div css={selectBox}>
                        <Select
                            options={selectOptions}
                            onChange={handleSelectChange}
                            defaultValue={selectedOption}
                            value={selectedOption}/>
                    </div>
                    <button onClick={handleCategoryAdd}>카테고리 추가</button>
                    <button onClick={handleTestClick}>test</button>
                </div>

                <div><input css={titleInput}
                            type="text"
                            name='title'
                            onChange={handleTitleInput}
                            value={boardContent.content}/>
                </div>
                <div>
                    <ReactQuill
                        style={{width: "928px", height: "500px"}}
                        modules={modules}
                        onChange={handleContentInput}
                        value={boardContent.content}/>
                </div>
                <div css={buttonContainer}>
                    <button onClick={handleWriteSubmit}>작성하기</button>
                </div>
            </div>
        </RootContainer>
    );
}

export default BoardUpdate;