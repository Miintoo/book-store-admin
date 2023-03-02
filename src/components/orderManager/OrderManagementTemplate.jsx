import React, { useEffect, useState } from 'react';
import Api from 'utils/api';
import styled from 'styled-components';
import Button from '../commons/button/Button';
import PageTitle from '../commons/pageTitle/PageTitle';
import OrderStatusDropDown from './OrderStatusDropDown';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';

function OrderManagementTemplate({ orderManagementData }) {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const handleOrderItem = (orderID) => {
    console.log(orderID);
    navigate('/admin/orderItemManagement', {
      state: {
        orderID: orderID
      }
    });
  };

  const handleDelete = async (orderID) => {
    console.log(orderID);
    try {
      if (window.confirm('주문 목록을 삭제하시겠습니까?')) {
        await Api.delete('/orders', {
          params: {
            orderID: orderID
          }
        });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PageTitle title="주문 관리" />
      {orderManagementData.length === 0 ? (
        <EmptyOrder>주문 내역이 없습니다.</EmptyOrder>
      ) : (
        <div>
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
              {orderManagementData.slice(offset, offset + limit).map((obj) => {
                return (
                  <ManagementTr key={obj.orderID}>
                    {Object.entries(obj).map(([key, value]) => {
                      return (
                        <>
                          {key === 'orderItem' ? (
                            <ManagementTd key={key} onClick={() => handleOrderItem(obj.orderID)}>
                              {value}
                            </ManagementTd>
                          ) : (
                            <ManagementTd key={key}>
                              {key === 'orderStatus' ? (
                                <OrderStatusDropDown defaultValue={value} orderID={obj.orderID} />
                              ) : (
                                value
                              )}
                            </ManagementTd>
                          )}
                        </>
                      );
                    })}
                    <ManagementTd>
                      <Button
                        buttonTitle="삭제"
                        width="60px"
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
          <Pagination totalItemCount={orderManagementData.length} limit={limit} page={page} setPage={setPage} />
        </div>
      )}
    </>
  );
}

const EmptyOrder = styled.div`
  height: 300px;
  font-family: 'NotoSansKR';
  font-size: 30px;
  line-height: 200px;
  text-align: center;
`;

const ManagementTable = styled.table`
  width: 80%;
  max-width: 800px;
  margin: 40px auto 50px;
  border: 1px solid #b9b9b9;
`;

const ManagementLabelSection = styled.tr`
  width: 100%;
  height: 40px;
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
    width: 11%;
  }
  &:nth-child(2) {
    width: 24%;
  }
  &:nth-child(3) {
    width: 12%;
  }
  &:nth-child(4) {
    width: 21%;
  }
  &:nth-child(5) {
    width: 14%;
  }
  &:nth-child(6) {
    width: 14%;
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
  height: 40px;
  vertical-align: middle;
  text-align: center;
  font-family: 'NotoSansKR-Medium';
  font-size: 12px;
  line-height: 130%;
  &:nth-child(7) {
    width: 10%;
    padding: 3px;
  }
  &:nth-child(4) {
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
`;

export default OrderManagementTemplate;
