import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// 중복 스타일적용

export default function Nav() {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <NavBarClass>
      <div>
        <LogoStyle to="/">
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="" />
        </LogoStyle>
      </div>

      <MiddleNavBar>
        <CategoryContainer>
          <Category onClick={() => navigate('/')}>책관리</Category>
          <Category>유저관리</Category>
          <Category>주문관리</Category>
        </CategoryContainer>
      </MiddleNavBar>

      <EndClass>
        <EndDiv onClick={() => navigate('/')}>
          <CartNavBar to="/">
            <IconSize src={process.env.PUBLIC_URL + '/images/navBarShoppingCart.png'} alt="cart" />
          </CartNavBar>
        </EndDiv>
        <EndDiv>
          {!localStorage.getItem('Auth') ? (
            <LoginButton type="button" onClick={() => navigate('/login')}>
              로그인
            </LoginButton>
          ) : (
            <LoginButton
              type="button"
              onClick={() => {
                localStorage.removeItem('Auth');
                navigate('/');
              }}
            >
              로그아웃
            </LoginButton>
          )}
        </EndDiv>
        <EndDiv>
          <MyEliceSize src={process.env.PUBLIC_URL + '/images/navBarMyElice.png'} alt="mypage" id="mypage" />
        </EndDiv>
      </EndClass>
    </NavBarClass>
  );
}

const NavBarClass = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 6px;
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

const MiddleSpan = styled.div`
  width: 100%;
  padding: 2%;
  text-align: center;
`;

const EndClass = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
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
  background-color: #edeafc;
  border-radius: 18px;
`;

// const MyElice = styled(NavLink)`
//   width: 100%;
//   height: 100%;
// `;

const IconSize = styled.img`
  width: 2vw;
  height: 3.5vh;
`;

const MyEliceSize = styled.img`
  width: 3vw;
  hegiht: 3.5vh;
`;
