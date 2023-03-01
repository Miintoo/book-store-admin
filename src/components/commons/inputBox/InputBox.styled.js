import styled from 'styled-components';

export const LoginInputBox = styled.div`
  position: relative;
  width: 400px;
  height: 62px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

export const LoginLabel = styled.label`
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 11px;
  opacity: 0.5;
  line-height: 13px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 31px 20px 14px 20px;
  border: 1px solid #ddd;
`;
