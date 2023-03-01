import React from 'react';
import styled from 'styled-components';
// import classifyCategory from 'utils/classifyCategory';

function CategoryItem({ categoryItem, onDelete, onChangeModal }) {
  return (
    <>
      <ManagementTr>
        <ManagementTd>{categoryItem.id}</ManagementTd>
        <ManagementTd>{categoryItem.category}</ManagementTd>
        <ManagementTd>{categoryItem.description}</ManagementTd>
        <ManagementTd>
          <EditButton
            onClick={() => {
              onChangeModal(categoryItem);
            }}
          >
            <EditIcon src="images/changeButton.png" alt="수정 아이콘" />
          </EditButton>
        </ManagementTd>
        <ManagementTd>
          <EditButtonDelete
            onClick={() => {
              onDelete(categoryItem.id);
            }}
          >
            <EditIcon src="images/deleteButton.png" alt="삭제 아이콘" />
          </EditButtonDelete>
        </ManagementTd>
      </ManagementTr>
    </>
  );
}

export default CategoryItem;

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
