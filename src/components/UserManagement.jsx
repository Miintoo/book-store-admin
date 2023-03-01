import React, { useEffect, useState } from 'react';
import Api from 'utils/api';
import styled from 'styled-components';
import Button from './commons/button/Button';
import PageTitle from './commons/pageTitle/PageTitle';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const response = await Api.get('/users');
      setUserData(response.data);
    };
    getUserData();
  }, []);

  console.log('userData', userData);

  const userManagementData = userData.map((data) => {
    // const formatDate = format(new Date(data.order.createdAt), 'yyyy-MM-dd hh:mm:ss');
    // const orderItemCount = data.orderItemList.length - 1;
    return {
      userID: data._id,
      userName: data.name,
      userEmail: data.email,
      userPhone: data.phone,
      userAddress: data.address
    };
  });
  console.log('userManagementData', userManagementData);

  const handleCheckOrderList = async (userID) => {
    console.log(userID);
    navigate('/userOrderManagement', {
      state: {
        userID: userID
      }
    });
  };

  const handleDelete = async (userID) => {
    console.log(userID);
    try {
      if (window.confirm('해당 유저를 삭제하시겠습니까?')) {
        await Api.delete('/users', {
          params: {
            userID: userID
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
      <PageTitle title="유저 관리" />
      <Wrapper>
        <ManagementTable>
          <thead>
            <ManagementLabelSection>
              <ManagementTh>이름</ManagementTh>
              <ManagementTh>이메일</ManagementTh>
              <ManagementTh>전화번호</ManagementTh>
              <ManagementTh>주소</ManagementTh>
              <ManagementTh>주문조회</ManagementTh>
              <ManagementTh>유저삭제</ManagementTh>
            </ManagementLabelSection>
          </thead>
          <tbody>
            {userManagementData.slice(offset, offset + limit).map((obj) => {
              return (
                <ManagementTr key={obj.userID}>
                  {Object.entries(obj)
                    .filter((info) => info[0] !== 'userID')
                    .map(([key, value]) => {
                      return <ManagementTd key={key}>{value}</ManagementTd>;
                    })}
                  <ManagementTd>
                    <Button
                      buttonTitle="주문조회"
                      width="60px"
                      height="21px"
                      borderRadius="5px"
                      borderColor="#B9B9B9"
                      fontSize="13px"
                      lineHeight="19px"
                      padding="0 0 20px 0"
                      boxShadow="0px 1px 1px rgba(0, 0, 0, 0.25);"
                      onClick={() => handleCheckOrderList(obj.userID)}
                    />
                  </ManagementTd>
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
                      onClick={() => handleDelete(obj.userID)}
                    />
                  </ManagementTd>
                </ManagementTr>
              );
            })}
          </tbody>
        </ManagementTable>
      </Wrapper>
      <Pagination totalItemCount={userManagementData.length} limit={limit} page={page} setPage={setPage} />
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  > button {
    position: absolute;
    left: 10%;
  }
`;
const ManagementTable = styled.table`
  width: 80%;
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
    width: 12%;
  }
  &:nth-child(2) {
    width: 20%;
  }
  &:nth-child(3) {
    width: 15%;
  }
  &:nth-child(4) {
    width: 30%;
  }
  &:nth-child(5) {
    width: 12%;
  }
  &:nth-child(6) {
    width: 12%;
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
`;

export default UserManagement;
