import React, { useState } from 'react';
import Api from 'utils/api';
import styled from 'styled-components';
import Button from 'components/commons/button/Button';

function BookAddPost({ onSaveData }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    salePrice: '',
    score: '',
    stock: '',
    condition: '',
    publishedDate: '',
    publisher: '',
    file: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImage = (e) => {
    const name = e.target.name;
    const value = e.target.files[0];
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('author', form.author);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('salePrice', form.salePrice);
    formData.append('score', form.score);
    formData.append('stock', form.stock);
    formData.append('condition', form.condition);
    formData.append('publishedDate', form.publishedDate);
    formData.append('publisher', form.publisher);
    formData.append('file', form.file);

    try {
      await Api.post('/books', formData).then((res) => {
        location.reload();
        onSaveData(res.data.book);
      });

      setForm({
        title: '',
        author: '',
        category: '',
        file: '',
        price: '',
        salePrice: '',
        score: '',
        stock: '',
        condition: '',
        publishedDate: '',
        publisher: ''
      });
    } catch (e) {
      throw new Error('서버에서 책 데이터 추가를 실패했습니다.');
    }
  };
  return (
    <AddContainer>
      <AddTitle>책 추가하기</AddTitle>
      <AddForm onSubmit={handleSubmit} encType="multipart/form-data">
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">책 이름</AddLabel>
            <AddInput type="text" name="title" value={form.title} onChange={handleChange} />
          </InputChildContainer>
          <InputChildContainer>
            <AddLabel htmlFor="file">이미지</AddLabel>
            <AddInput type="file" name="file" onChange={handleImage} />
          </InputChildContainer>
        </InputContainer>
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">카테고리</AddLabel>
            <select name="category" onChange={handleChange}>
              <option value="">카테고리선택</option>
              <option value="63ff71407b958c65384c6ae6">자기개발서적</option>
              <option value="63ff714d7b958c65384c6ae8">소설책</option>
              <option value="640056ecbebc7d0cc3f7fe0a">만화책</option>
              <option value="640056fdbebc7d0cc3f7fe0c">아동책</option>
            </select>
          </InputChildContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">작가</AddLabel>
            <AddInput type="text" name="author" value={form.author} onChange={handleChange} />
          </InputChildContainer>
        </InputContainer>
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">가격</AddLabel>
            <AddInput type="text" name="price" value={form.price} onChange={handleChange} />
          </InputChildContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">할인가격</AddLabel>
            <AddInput type="text" name="salePrice" value={form.salePrice} onChange={handleChange} />
          </InputChildContainer>
        </InputContainer>
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">점수</AddLabel>
            <AddInput type="text" name="score" value={form.score} onChange={handleChange} />
          </InputChildContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">재고량</AddLabel>
            <AddInput type="text" name="stock" value={form.stock} onChange={handleChange} />
          </InputChildContainer>
        </InputContainer>
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">상태</AddLabel>
            <AddInput type="text" name="condition" value={form.condition} onChange={handleChange} />
          </InputChildContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">출판일</AddLabel>
            <AddInput type="text" name="publishedDate" value={form.publishedDate} onChange={handleChange} />
          </InputChildContainer>
        </InputContainer>
        <InputContainer>
          <InputChildContainer>
            <AddLabel htmlFor="title">출판사</AddLabel>
            <AddInput type="text" name="publisher" value={form.publisher} onChange={handleChange} />
          </InputChildContainer>
          <InputChildContainer></InputChildContainer>
        </InputContainer>

        <ButtonContainer>
          <Button buttonTitle="저장" width="140px" height="60px" type="submit" borderRadius="30px" />
        </ButtonContainer>
      </AddForm>
    </AddContainer>
  );
}

export default BookAddPost;

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

const AddInput = styled.input`
  width: 90%;
  height: 40px;
  border: 1px solid #b9b9b9;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;
