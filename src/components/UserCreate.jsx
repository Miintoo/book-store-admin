import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Api from 'utils/api';

function UserCreate() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newUserInfo = { ...userInfo };
    newUserInfo[name] = value;
    setUserInfo(newUserInfo);
    console.log(newUserInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Api.post('/users', {
      name: userInfo.userName,
      email: userInfo.email,
      password: userInfo.password,
      phone: userInfo.phone,
      address: userInfo.address
    });
    console.log(response);
    navigate('/userManagement');
  };

  return (
    <div>
      <h1>사용자 등록</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">이름</label>
        <input id="name" type="text" name="userName" value={userInfo.userName} onChange={handleChange} />
        <br />
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" name="email" value={userInfo.email} onChange={handleChange} />
        <br />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" name="password" value={userInfo.password} onChange={handleChange} />
        <br />
        <label htmlFor="phone">전화번호</label>
        <input id="phone" type="text" name="phone" value={userInfo.phone} onChange={handleChange} />
        <br />
        <label htmlFor="address">주소</label>
        <input id="address" type="text" name="address" value={userInfo.address} onChange={handleChange} />
        <br />

        <button type="submit" name="submitButton">
          등록
        </button>
      </form>
    </div>
  );
}

export default UserCreate;
