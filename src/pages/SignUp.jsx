import React, { useState } from 'react';
import styled from 'styled-components';
import PageTitle from '../components/commons/pageTitle/PageTitle';
import Button from '../components/commons/button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [warningEmail, setWarningEmail] = useState({
    visible: true,
    message: ''
  });

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [warningPassword, setWarningPassword] = useState({
    visible: true,
    message: ''
  });
  const [warningPasswordConfirm, setWarningPasswordConfirm] = useState({
    visible: true,
    message: ''
  });

  const [name, setName] = useState('');
  const [warningName, setWarningName] = useState({
    visible: true,
    message: ''
  });

  const [phone, setPhone] = useState('');
  const [warningPhone, setWarningPhone] = useState({
    visible: true,
    message: ''
  });

  const [address, setAddress] = useState('');
  const [warningAddress, setWarningAddress] = useState({
    visible: true,
    message: ''
  });

  const [role, setRole] = useState('user');

  // 취소 버튼 클릭시
  const handleCancel = () => {
    navigate('/admin/login');
  };

  // 이메일 로직
  const handleIdInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningEmail));

    if (email.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningEmail(newWarning);
    }

    if (
      email.length <= 5 ||
      !email.match(new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i))
    ) {
      newWarning.visible = true;
      newWarning.message = '5~30자의 이메일 형식으로 입력해주세요.';

      return setWarningEmail(newWarning);
    }

    // 서버와 api 통신으로 해당 id의 중복을 검사

    newWarning.visible = false;
    setWarningEmail(newWarning);
  };

  // 비밀번호 로직
  const handlePasswordInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningPassword));

    if (password.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningPassword(newWarning);
    }
    if (password.length <= 8 || password.match(new RegExp(/[^0-9a-zA-Z?!]/)) !== null) {
      newWarning.visible = true;
      newWarning.message = '8~16자의 영문 소문자, 숫자와 ?!기호만 사용 가능합니다';

      return setWarningPassword(newWarning);
    }

    newWarning.visible = false;
    setWarningPassword(newWarning);
  };

  // 비밀번호 확인 로직
  const handlePasswordConfirmInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningPasswordConfirm));

    if (passwordConfirm.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningPasswordConfirm(newWarning);
    }

    if (password !== passwordConfirm) {
      newWarning.visible = true;
      newWarning.message = '비밀번호가 일치하지 않습니다.';

      return setWarningPasswordConfirm(newWarning);
    }

    newWarning.visible = false;
    setWarningPasswordConfirm(newWarning);
  };

  // 이름 로직
  const handleNameInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningName));

    if (name.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningName(newWarning);
    }
    newWarning.visible = false;
    setWarningName(newWarning);
  };

  // 전화번호 로직
  const handlePhoneInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningPhone));

    if (phone.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningPhone(newWarning);
    }

    if (phone.match(new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)) === null) {
      newWarning.visible = true;
      newWarning.message = '010-0000-0000 이나 010-000-0000 형식으로 입력해주세요.';

      return setWarningPhone(newWarning);
    }

    newWarning.visible = false;
    setWarningPhone(newWarning);
  };

  // 주소 로직
  const handleAddressInputBlur = () => {
    const newWarning = JSON.parse(JSON.stringify(warningAddress));

    if (address.length === 0) {
      newWarning.visible = true;
      newWarning.message = '필수 정보입니다.';

      return setWarningAddress(newWarning);
    }

    newWarning.visible = false;
    setWarningAddress(newWarning);
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  const handleSignUp = async () => {
    const baseURL = 'http://elice.iptime.org:8080/api';
    if (
      warningEmail.visible ||
      warningName.visible ||
      warningAddress.visible ||
      warningPassword.visible ||
      warningPasswordConfirm.visible ||
      warningPhone.visible
    ) {
      return alert('모든 정보를 정상적으로 입력해주세요.');
    }

    // 서버통신
    const body = {
      name,
      email,
      password,
      phone,
      address,
      role
    };

    console.log(body);

    await axios
      .post(`${baseURL}/users`, body)
      .then((response) => {
        alert('회원가입이 정상적으로 완료 되었습니다.');
        navigate('/login');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert('이미 가입한 회원 입니다.');
      });
  };

  return (
    <>
      <PageTitle title="회원가입" />
      <SignUpContainer>
        <SignUpListContainer>
          <SignUpList>
            <SignUpLabel htmlFor="id">이메일</SignUpLabel>
            <SignUpInput
              type="text"
              id="id"
              maxLength="30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleIdInputBlur}
            />
            {warningEmail.visible && <WarningMessage>{warningEmail.message}</WarningMessage>}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="password">비밀번호</SignUpLabel>
            <SignUpInputPassword
              type="password"
              id="password"
              maxLength="16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordInputBlur}
            />
            {warningPassword.visible && <WarningMessage>{warningPassword.message}</WarningMessage>}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="confirmPassword">비밀번호 확인</SignUpLabel>
            <SignUpInputPassword
              type="password"
              id="confirmPassword"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={handlePasswordConfirmInputBlur}
            />
            {warningPasswordConfirm.visible && <WarningMessage>{warningPasswordConfirm.message}</WarningMessage>}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="name">이름</SignUpLabel>
            <SignUpInputName
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameInputBlur}
            />
            {warningName.visible && <WarningMessage>{warningName.message}</WarningMessage>}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="phone">휴대폰 번호</SignUpLabel>
            <SignUpInputPhone
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handlePhoneInputBlur}
            />
            {warningPhone.visible && <WarningMessage>{warningPhone.message}</WarningMessage>}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="address">주소</SignUpLabel>
            <SignUpInput
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={handleAddressInputBlur}
            />
            {warningAddress.visible && <WarningMessage>{warningAddress.message}</WarningMessage>}
          </SignUpList>
          <SignUpList>
            <SignUpLabel htmlFor="address">관리자여부</SignUpLabel>
            <SignUpSelect onChange={handleSelect}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </SignUpSelect>
          </SignUpList>
        </SignUpListContainer>
        <Button type="submit" buttonTitle="취소" margin="0 60px" onClick={handleCancel} fontSize="22px" />
        <Button type="button" buttonTitle="가입하기" margin="0 60px" onClick={handleSignUp} fontSize="22px" />
      </SignUpContainer>
    </>
  );
}

export default SignUpPage;

const SignUpContainer = styled.div`
  width: 50%;
  margin: 60px auto;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.59);
`;

const SignUpListContainer = styled.ul`
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.59);
`;

const SignUpList = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const SignUpLabel = styled.label`
  display: flex;
  align-items: center;
  flex-basis: 20%;
  margin-right: 10px;
  padding-left: 30px;
  height: 100%;
  vertical-align: middle;
  font-weight: 700;
  background: rgba(217, 217, 217, 0.25);
`;

const SignUpInput = styled.input`
  display: block;
  flex-basis: 40%;
  padding-left: 10px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.31);
`;

const SignUpSelect = styled.select`
  display: block;
  flex-basis: 40%;
  padding-left: 10px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.31);
`;

const SignUpInputPassword = styled(SignUpInput)`
  flex-basis: 20%;
`;

const SignUpInputName = styled(SignUpInput)`
  flex-basis: 30%;
`;

const SignUpInputPhone = styled(SignUpInput)`
  flex-basis: 30%;
`;

const WarningMessage = styled.span`
  position: absolute;
  left: 20%;
  bottom: 3px;
  margin-left: 10px;
  font-size: 14px;
  color: red;
`;
