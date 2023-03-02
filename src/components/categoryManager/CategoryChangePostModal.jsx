import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/commons/button/Button';
import classifyCategory from 'utils/classifyCategory';

function CategoryChangePostModal({ selectedData, onCancel, onEditSubmit }) {
  const [edited, setEdited] = useState(selectedData);
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

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log(edited);
    const formData2 = new FormData();
    formData2.append('category', edited.category);
    formData2.append('description', edited.description);
    onEditSubmit(formData2, edited);
  };

  return (
    <ModalContainer>
      <div>
        <ModalTitle>카테고리 정보 수정하기</ModalTitle>
      </div>
      <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
        <ModalInputContainer>ID: {edited.id}</ModalInputContainer>
        <ModalInputContainer>
          Title: <ModalInput type="text" name="category" value={edited.category} onChange={handleEditChange} />
        </ModalInputContainer>
        <ModalInputContainer>
          Description:{' '}
          <ModalInput type="text" name="description" value={edited.description} onChange={handleEditChange} />
        </ModalInputContainer>
        <ButtonContainer>
          <Button onClick={handleCancel} buttonTitle="취소" width="100px" height="40px" borderRadius="10px" />
          <Button type="submit" buttonTitle="수정" width="100px" height="40px" borderRadius="10px" />
        </ButtonContainer>
      </form>
    </ModalContainer>
  );
}

export default CategoryChangePostModal;

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
