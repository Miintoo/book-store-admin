import React from 'react';
import { LoginInputBox, LoginLabel, LoginInput } from './InputBox.styled';

function InputBox({ inputValue, id, type, value, onChange }) {
  return (
    <LoginInputBox>
      <LoginLabel htmlFor={id}>{inputValue}</LoginLabel>
      <LoginInput id={id} type={type} value={value} onChange={onChange} />
    </LoginInputBox>
  );
}

export default InputBox;
