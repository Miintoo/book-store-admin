import React from 'react';
import styled from 'styled-components';
import classifyCategory from 'utils/classifyCategory';

function BookItem({ bookItem, onDelete, onChangeModal }) {
  return (
    <>
      <ManagementTr>
        <ManagementTd>{bookItem.title}</ManagementTd>
        <ManagementTd>{bookItem.author}</ManagementTd>
        <ManagementTd>
          <BookImage src={bookItem.file} alt="책 이미지 입니다." />
        </ManagementTd>
        <ManagementTd>{bookItem.price}</ManagementTd>
        <ManagementTd>{bookItem.salePrice}</ManagementTd>
        <ManagementTd>{bookItem.score}</ManagementTd>
        <ManagementTd>{bookItem.quantity}</ManagementTd>
        <ManagementTd>{bookItem.condition}</ManagementTd>
        <ManagementTd>{bookItem.publishedDate}</ManagementTd>
        <ManagementTd>{bookItem.publisher}</ManagementTd>
        <ManagementTd>{classifyCategory(bookItem.category)}</ManagementTd>
        <ManagementTd>
          <EditButton
            onClick={() => {
              onChangeModal(bookItem);
            }}
          >
            <EditIcon src="images/changeButton.png" alt="수정 아이콘" />
          </EditButton>
        </ManagementTd>
        <ManagementTd>
          <EditButtonDelete
            onClick={() => {
              onDelete(bookItem.id);
            }}
          >
            <EditIcon src="images/deleteButton.png" alt="삭제 아이콘" />
          </EditButtonDelete>
        </ManagementTd>
      </ManagementTr>
    </>
  );
}

export default BookItem;

const ManagementTr = styled.tr`
  border: 1px solid #b9b9b9;
`;

const ManagementTd = styled.td`
  border: 1px solid #b9b9b9;
  vertical-align: middle;
  text-align: center;
  font-family: 'NotoSansKR-Medium';
  font-size: 12px;
  line-height: 130%;
`;

const BookImage = styled.img`
  width: 60px;
  height: 100px;
`;

// const ButtonTd = styled(ManagementTd)`
//   display: flex;
// `;

const EditButton = styled.button`
  padding: 5px 15px;
  border-right: 1px solid #b9b9b9;
  border-top: none;
  border-left: none;
  border-bottom: none;

  background-color: white;
`;

const EditButtonDelete = styled(EditButton)`
  border-right: none;
`;

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
  &:hover {
    transform: scale(1.1);
  }
`;
