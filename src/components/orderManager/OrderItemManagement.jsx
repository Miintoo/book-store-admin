import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from 'utils/api';
import PageTitle from '../commons/pageTitle/PageTitle';
import Pagination from '../Pagination';
import styled from 'styled-components';
import classifyAdmin from 'utils/classifyAdmin';

function OrderItemManagement() {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState('false');
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const location = useLocation();
  const navigate = useNavigate();

  const orderID = location.state.orderID;
  console.log(orderItems);

  useEffect(() => {
    if (!classifyAdmin()) {
      return navigate('/admin/login');
    }
    const fetchOrderItems = async () => {
      const response = await Api.get(`/orders/${orderID}`);
      console.log(response.data.result[0].orderItemList);
      setOrderItems(response.data.result[0].orderItemList);
      setIsLoading(false);
    };
    fetchOrderItems();
  }, []);

  const orderItemsData = orderItems.map((data) => {
    return {
      orderID: data.orderID,
      bookID: data._id,
      bookTitle: data.bookTitle,
      quantity: data.quantity,
      price: data.salePrice
    };
  });

  console.log('orderItemsData', orderItemsData);
  return (
    <>
      <PageTitle title="주문 도서 목록" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ManagementTable>
            <thead>
              <ManagementLabelSection>
                <ManagementTh>주문번호</ManagementTh>
                <ManagementTh>도서id</ManagementTh>
                <ManagementTh>도서명</ManagementTh>
                <ManagementTh>수량</ManagementTh>
                <ManagementTh>가격</ManagementTh>
              </ManagementLabelSection>
            </thead>
            <tbody>
              {orderItemsData.slice(offset, offset + limit).map((obj) => {
                return (
                  <ManagementTr key={obj._id}>
                    {Object.entries(obj).map(([key, value]) => {
                      return <ManagementTd key={key}>{value}</ManagementTd>;
                    })}
                  </ManagementTr>
                );
              })}
            </tbody>
          </ManagementTable>
          <Pagination totalItemCount={orderItemsData.length} limit={limit} page={page} setPage={setPage} />
        </>
      )}
    </>
  );
}

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
    width: 25%;
  }
  &:nth-child(2) {
    width: 25%;
  }
  &:nth-child(3) {
    width: 15%;
  }
  &:nth-child(4) {
    width: 15%;
  }
  &:nth-child(5) {
    width: 15%;
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
`;

export default OrderItemManagement;
