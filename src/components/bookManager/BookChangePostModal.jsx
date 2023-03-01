import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/commons/button/Button';
import classifyCategory from 'utils/classifyCategory';

function BookChangePostModal({ selectedData, onCancel, onEditSubmit }) {
  const [edited, setEdited] = useState(selectedData);
  // console.log(selectedData.category);
  const category = classifyCategory(selectedData.category._id);

  const handleCancel = () => {
    onCancel();
  };

  const handleEditChange = (e) => {
    setEdited({
      ...edited,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const name = e.target.name;
    const value = e.target.files[0];
    setEdited({
      ...edited,
      [name]: value
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log(edited);
    const formData2 = new FormData();
    formData2.append('title', edited.title);
    formData2.append('author', edited.author);
    formData2.append('category', edited.category);
    formData2.append('file', edited.file);
    formData2.append('price', edited.price);
    formData2.append('salePrice', edited.salePrice);
    formData2.append('score', edited.score);
    formData2.append('quantity', edited.quantity);
    formData2.append('condition', edited.condition);
    formData2.append('publishedDate', edited.publishedDate);
    formData2.append('publisher', edited.publisher);
    onEditSubmit(formData2, edited);
  };

  return (
    <ModalContainer>
      <div>
        <ModalTitle>책 정보 수정하기</ModalTitle>
      </div>
      <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
        <ModalInputContainer>ID: {edited.id}</ModalInputContainer>
        <ModalInputContainer>
          Title: <ModalInput type="text" name="title" value={edited.title} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          Author: <ModalInput type="text" name="author" value={edited.author} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          category:
          <SelectContainer name="category" onChange={handleEditChange}>
            <option value="">{category}</option>
            <option value="63f2d82b5b2238b907c9c4f6">만화서적</option>
            <option value="63f864cd16e9b53a4265460f">기술서적</option>
            <option value="63f8653a16e9b53a42654620">아동책</option>
            <option value="63f8656a16e9b53a42654627">소설책</option>
          </SelectContainer>
        </ModalInputContainer>
        <ModalInputContainer>
          image: <ModalInput type="file" name="file" onChange={handleImage} />
        </ModalInputContainer>
        <ModalInputContainer>
          price: <ModalInput type="text" name="price" value={edited.price} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          salePrice: <ModalInput type="text" name="salePrice" value={edited.salePrice} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          score: <ModalInput type="text" name="score" value={edited.score} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          quantity: <ModalInput type="text" name="quantity" value={edited.quantity} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          condition: <ModalInput type="text" name="condition" value={edited.condition} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          publishedDate:{' '}
          <ModalInput type="text" name="publishedDate" value={edited.publishedDate} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          publisher: <ModalInput type="text" name="publisher" value={edited.publisher} onChange={handleEditChange} />
        </ModalInputContainer>

        <ButtonContainer>
          <Button onClick={handleCancel} buttonTitle="취소" width="100px" height="40px" borderRadius="10px" />
          <Button type="submit" buttonTitle="수정" width="100px" height="40px" borderRadius="10px" />
        </ButtonContainer>
      </form>
    </ModalContainer>
  );
}

export default BookChangePostModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 800px;
  height: 600px;

  padding: 10px 25px;

  border-radius: 10px;
  background-color: white;
  z-index: 999;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  font-family: 'NotoSansKR-Bold';
  font-size: 22px;

  border-bottom: 1px solid #b9b9b9;
  line-height: 64px;
  text-align: center;
`;

const ModalInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  height: 30px;
  font-size: 16px;
`;

const ModalInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #b9b9b9;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const SelectContainer = styled.select`
  width: 80%;

  margin-bottom: 5px;
  height: 30px;
  font-size: 16px;
`;
