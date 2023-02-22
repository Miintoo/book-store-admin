import axios from 'axios';
import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

let auth = false;
const AuthContext = createContext(auth);

function Login() {
  const apiUrl = 'http://elice.iptime.org:8080';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post(`${apiUrl}/auth`, {
        email: email,
        password,
      });

      console.log('result', result);
      if (result.status === 200) {
        alert('로그인에 성공했습니다.');
        document.cookie = `token=${result.data.token}`;
        console.log('result.data.token', result);

        navigator('/board');
      }
    } catch (error) {
      console.log('error', error);
      alert('로그인에 실패했습니다.');
    }
  };

  const inputHandler = e => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={inputHandler}
        />
        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="current-password"
          name="password"
          value={password}
          onChange={inputHandler}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
