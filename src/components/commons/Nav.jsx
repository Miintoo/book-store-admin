import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
// 중복 스타일적용

export default function Nav() {
  const navigate = useNavigate();

  return (
    <NavBarClass>
      <div onClick={() => navigate('/admin')}>
        <LogoStyle>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="" />
        </LogoStyle>
      </div>

      <MiddleNavBar>
        <CategoryContainer>
          <Category onClick={() => navigate('/admin')}>책관리</Category>
          <Category onClick={() => navigate('/admin/orderManagement')}>유저관리</Category>
          <Category onClick={() => navigate('/admin/userManagement')}>주문관리</Category>
        </CategoryContainer>
      </MiddleNavBar>

      <EndClass>
        <EndDiv onClick={() => navigate('/admin')}></EndDiv>
        <EndDiv>
          {!localStorage.getItem('Auth') ? (
            <LoginButton type="button" onClick={() => navigate('/admin/login')}>
              로그인
            </LoginButton>
          ) : (
            <LoginButton
              type="button"
              onClick={() => {
                localStorage.removeItem('Auth');
                navigate('/admin/login');
              }}
            >
              로그아웃
            </LoginButton>
          )}
        </EndDiv>
        <EndDiv>
          {localStorage.getItem('Auth') && (
            <MyEliceSize src={process.env.PUBLIC_URL + '/images/navBarMyElice.png'} alt="mypage" id="mypage" />
          )}
        </EndDiv>
      </EndClass>
    </NavBarClass>
  );
}

const NavBarClass = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  padding-right: 25px;
  padding-bottom: 6px;
  background-color: #ffffff;
  border-radius: 4px;
  border-bottom: 2px solid #b5b5b5;
`;

const LogoStyle = styled(NavLink)`
  padding-left: 20%;
`;

const CategoryContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const Category = styled.li`
  font-size: 18px;
  padding: 10px 20px;
  margin-right: 15px;
  border-radius: 10px;
  color: black;
  line-height: 100%;

  cursor: pointer;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    background-color: #edeafc;
    color: black;
  }
`;

const MiddleNavBar = styled.div`
  display: flex;
  margin-left: 10%;
  width: 70%;
`;

const EndClass = styled.div`
  display: flex;
  align-items: center;
  width: 10%;
  height: 100%;
`;

const EndDiv = styled.div`
  display: iline-block;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CartNavBar = styled(NavLink)`
  width: 100%;
  height: 100%;
`;

const LoginButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: #edeafc;
  border-radius: 18px;
`;

// const MyElice = styled(NavLink)`
//   width: 100%;
//   height: 100%;
// `;

const NonLoginSize = styled.img`
  width: 2.8vw;
  height: 4vh;
`;

const MyEliceSize = styled.img`
  width: 3vw;
  hegiht: 3.5vh;
`;
