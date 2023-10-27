import React from 'react';
import RootContainer from '../../components/RootContainer/RootContainer';
import { css } from '@emotion/react';
import { instance } from '../../api/config/instance';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';
/** @jsxImportSource @emotion/react */

const SStoreContainer = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 20px;
    width: 100%;

`;

const SProductContainer = css`
    margin: 10px;
    width: 30%;
    height: 120px;
    cursor: pointer;
`;

function Store(props) {

    const queryClient = useQueryClient();
    const getProducts = useQuery(["getProducts"], async () => {
        try {
            const option = {
                headers : {
                    Authorization: localStorage.getItem("accessToken")
                }
            }

            return await instance.get("/products", option);
        }catch(error) {
            console.log(error);
            console.log("zz")
        }
    })

    useEffect(() => {
        //html파일에 src넣어줌 => 아임포트 api
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
        document.head.appendChild(iamport);
        //unmount시 실행
        return () => {
            document.head.removeChild(iamport);
        }
    }, [])

    const handlePaymentSubmit = (product) => {
        const principal = queryClient.getQueryState("getPrincipal");
        if(!window.IMP) {return;}
        const { IMP } = window;
        IMP.init("imp57760784");

        const paymentData = {
            pg: "kakaopay",
            pay_method: "kakaopay",
            merchant_uid: `mid${new Date().getTime()}`,
            amount: product.productPrice,
            name: product.productName,
            buyer_name: principal?.data?.data?.name,
            buyer_email: principal?.data?.data?.email
        }

        IMP.request_pay(paymentData, (response) => {
            const { success, error_msg } = response;

            if(success) {
                //우리 서버에 주문데이터 insert
            }else {
                alert(error_msg);
            }
        });
    }
    return (
        <RootContainer>
            <h1>포인트 충전하기</h1>
            <div css={SStoreContainer}>
                {!getProducts.isLoading && getProducts?.data?.data.map(product => {
                    return <button css={SProductContainer}
                        onClick={() => {handlePaymentSubmit(product);}}>
                            {product.productName}Point
                            </button>
                })}
            </div>
        </RootContainer>
    );
}

export default Store;