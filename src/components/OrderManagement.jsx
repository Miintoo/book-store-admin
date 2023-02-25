import React, { Suspense, useEffect, useState } from 'react';
import Api from 'utils/api';
import styled from 'styled-components';
import { format } from 'date-fns';
import Button from './commons/button/Button';
import PageTitle from './commons/pageTitle/PageTitle';
import DropDown from './DropDown';

function OrderManagement() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderData = async () => {
      const response = await Api.get('/orders');
      setOrderData(response.data);
      setLoading(false);
    };
    getOrderData();
  }, []);

  console.log('orderData', orderData);

  const orderManagementData = orderData.map((data) => {
    const formatDate = format(new Date(data.order.createdAt), 'yyyy-MM-dd hh:mm:ss');
    const orderItemCount = data.orderItemList.length - 1;
    return {
      orderDate: formatDate,
      orderID: data.orderItemList[0].orderID,
      ordererName: data.order.userName,
      orderItem: `${data.orderItemList[0].bookTitle} 외 ${orderItemCount}개`,
      orderPrice: `${data.order.totalPrice} 원`,
      orderStatus: data.order.status
    };
  });

  const handleDelete = async (orderID) => {
    console.log(orderID);
    if (window.confirm('주문 목록을 삭제하시겠습니까?')) {
      const response = await Api.delete('/orders', {
        params: {
          orderID: orderID
        }
      });
      window.location.reload();
    }

    //
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <PageTitle title="주문 관리" />
          <ManagementTable>
            <thead>
              <ManagementLabelSection>
                <ManagementTh>주문일</ManagementTh>
                <ManagementTh>주문번호</ManagementTh>
                <ManagementTh>주문자명</ManagementTh>
                <ManagementTh>상품명</ManagementTh>
                <ManagementTh>총 주문금액</ManagementTh>
                <ManagementTh>주문상태</ManagementTh>
                <ManagementTh>목록삭제</ManagementTh>
              </ManagementLabelSection>
            </thead>
            <tbody>
              {orderManagementData.map((obj) => {
                return (
                  <ManagementTr key={obj.orderID}>
                    {Object.entries(obj).map(([key, value]) => {
                      return (
                        <ManagementTd key={key}>
                          {key === 'orderStatus' ? <DropDown defaultValue={value} orderID={obj.orderID} /> : value}
                        </ManagementTd>
                      );
                    })}
                    <ManagementTd>
                      <Button
                        buttonTitle="삭제"
                        width="80px"
                        height="21px"
                        borderRadius="5px"
                        borderColor="#B9B9B9"
                        fontSize="13px"
                        lineHeight="19px"
                        padding="0 0 20px 0"
                        boxShadow="0px 1px 1px rgba(0, 0, 0, 0.25);"
                        onClick={() => handleDelete(obj.orderID)}
                      />
                    </ManagementTd>
                  </ManagementTr>
                );
              })}
            </tbody>
          </ManagementTable>
        </>
      )}
    </>
  );
}

const ManagementTable = styled.table`
  margin: 40px auto 50px;
  border: 1px solid #b9b9b9;
`;

const ManagementLabelSection = styled.tr`
  width: 100%;
  height: 37px;
  align-items: center;
  border: 1px solid #b9b9b9;
  &:first-child {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const ManagementTh = styled.th`
  border: 1px solid #b9b9b9;
  font-family: 'NotoSansKR-bold';
  text-align: center;
  vertical-align: middle;
  line-height: 130%;
  &:first-child {
    width: 15%;
  }
  &:nth-child(2) {
    width: 20%;
  }
  &:nth-child(3) {
    width: 10%;
  }
  &:nth-child(4) {
    width: 21%;
  }
  &:nth-child(5) {
    width: 12%;
  }
  &:nth-child(6) {
    width: 12%;
  }
  &:nth-child(7) {
    width: 10%;
  }
`;

const ManagementTr = styled.tr`
  border: 1px solid #b9b9b9;
`;

const ManagementTd = styled.td`
  border: 1px solid #b9b9b9;
  vertical-align: middle;
  text-align: center;
  font-family: 'NotoSansKR-Medium';
  font-size: 12px;
  line-height: 130%;
  &:nth-child(7) {
    width: 10%;
    padding: 3px;
  }
`;

export default OrderManagement;
