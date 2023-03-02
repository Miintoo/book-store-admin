import React, { useState } from 'react';
import Api from 'utils/api';
import styled from 'styled-components';
import Button from 'components/commons/button/Button';
import { json } from 'react-router-dom';

function CategoryAddPost({ onSaveData }) {
  const [form, setForm] = useState({
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', form.category);
    formData.append('description', form.description);
    const data = {
      category: form.category,
      description: form.description
    };
    try {
      await Api.post(
        '/categories',
        {
          category: form.category,
          description: form.description
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((res) => {
        console.log('category.res', res);
        onSaveData(res.data);
      });

      setForm({
        category: '',
        description: ''
      });
    } catch (e) {
      throw new Error('서버에서 카테고리 데이터 추가를 실패했습니다.');
    }
  };
  return (
    <AddContainer>
      <AddTitle>카테고리 추가하기</AddTitle>
      <AddForm onSubmit={handleSubmit} encType="application/json">
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">카테고리 명</AddLabel>
            <AddText type="text" name="category" value={form.category} onChange={handleChange} />
          </InputChildContainer>
        </InputContainer>
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">카테고리 설명</AddLabel>
            <AddText type="text" name="description" value={form.description} onChange={handleChange} />
          </InputChildContainer>
        </InputContainer>
        <ButtonContainer>
          <Button buttonTitle="저장" width="140px" height="60px" type="submit" borderRadius="30px" />
        </ButtonContainer>
      </AddForm>
    </AddContainer>
  );
}

export default CategoryAddPost;

const AddContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const AddForm = styled.form`
  padding-top: 30px;
  border: 1px solid #b9b9b9;
`;

const AddTitle = styled.h2`
  position: relative;
  margin-top: 83px;
  margin-bottom: 40px;
  font-family: 'NotoSansKR-Bold';
  font-size: 30px;
  line-height: 64px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InputChildContainer = styled.div`
  width: 45%;
`;

const AddLabel = styled.label`
  display: block;
  width: 100%;

  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const AddText = styled.textarea`
  width: 90%;
  height: 40px;
  border: 1px solid #b9b9b9;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;
