import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Api from 'utils/api';
import PageTitle from 'components/commons/pageTitle/PageTitle';
import CategoryItem from 'components/categoryManager/CategoryItem';
import CategoryAddPost from 'components/categoryManager/CategoryAddPost';
import CategoryChangePostModal from 'components/categoryManager/CategoryChangePostModal';
import classifyAdmin from 'utils/classifyAdmin';
import { useNavigate } from 'react-router-dom';

function CategoryManagement() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      if (!classifyAdmin()) {
        return navigate('/admin/login');
      }
      const categoryArray = await Api.get('/categories').then((response) => response.data);

      const initCategoryData = categoryArray.map((category) => {
        return {
          id: category._id,
          category: category.category,
          description: category.description
        };
      });
      setCategory(initCategoryData);
    };
    getCategory();
  }, []);

  const handleSave = (data) => {
    const isInclude = category.filter((category) => category.id === data._id);
    if (isInclude.length !== 0) {
      setCategory(
        category.map((category) =>
          category.id === data._id
            ? {
                id: data._id,
                category: data.category,
                description: data.description
              }
            : category
        )
      );
    } else {
      setCategory((prev) => {
        return [
          ...prev,
          {
            id: data._id,
            category: data.category,
            description: data.description
          }
        ];
      });
    }
  };

  const handleChangeModal = (item) => {
    setModal((prev) => !prev);
    setSelected(item);
  };

  const handleCancel = () => {
    setModal((prev) => !prev);
  };

  const handleEdit = async (formData2, item) => {
    console.log(item.id);
    const params = '?categoryID=' + item.id;
    try {
      await Api.put(
        '/categories/' + item.id,
        {
          category: item.category,
          description: item.description
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        formData2
      ).then((res) => console.log(res));
      setModal((prev) => !prev);
      handleSave(item);
    } catch (e) {
      throw new Error('서버에서 카테고리 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    const isDelete = confirm('정말로 삭제하겠습니까?');
    if (isDelete) {
      const newCategories = category.filter((category) => category.id != id);
      try {
        await Api.delete('/categories', {
          params: {
            categoryID: id
          }
        });
        setCategory(newCategories);
      } catch (e) {
        throw new Error('서버에서 정상적으로 삭제가 안되었습니다.');
      }
    }
  };

  return (
    <>
      <div>
        <PageTitle title="카테고리 정보 리스트" />
        <div>
          <ManagementTable>
            <thead>
              <ManagementLabelSection>
                <ManagementTh>ID</ManagementTh>
                <ManagementTh>카테고리 명</ManagementTh>
                <ManagementTh>카테고리 설명</ManagementTh>
                <ManagementTh>수정</ManagementTh>
                <ManagementTh>삭제</ManagementTh>
              </ManagementLabelSection>
            </thead>
            <tbody>
              {category.length === 0
                ? ''
                : category.map((category) => {
                    return (
                      <CategoryItem
                        categoryItem={category}
                        key={category.id}
                        onDelete={handleDelete}
                        onChangeModal={handleChangeModal}
                      />
                    );
                  })}
            </tbody>
          </ManagementTable>
          <CategoryAddPost onSaveData={handleSave} />
        </div>
      </div>
      {modal && (
        <ModalGrey>
          <CategoryChangePostModal selectedData={selected} onCancel={handleCancel} onEditSubmit={handleEdit} />
        </ModalGrey>
      )}
    </>
  );
}

export default CategoryManagement;

const ManagementTable = styled.table`
  width: 90%;
  margin: 40px auto 50px;
  border: 1px solid #b9b9b9;
`;

const ManagementLabelSection = styled.tr`
  width: 100%;
  height: 37px;
  align-items: center;
  border: 1px solid #b9b9b9;
  &:first-child {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const ManagementTh = styled.th`
  border: 1px solid #b9b9b9;
  font-family: 'NotoSansKR-bold';
  text-align: center;
  vertical-align: middle;
  line-height: 130%;
  &:first-child {
    width: 20%;
  }
  &:nth-child(2) {
    width: 10%;
  }
  &:nth-child(3) {
    width: 70%;
  }
  &:nth-child(4) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 10%;
  }
`;

const ModalGrey = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 100;
`;
