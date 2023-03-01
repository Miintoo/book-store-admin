import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Api from 'utils/api';
import PageTitle from 'components/commons/pageTitle/PageTitle';
import BookItem from 'components/bookManager/BookItem';
import BookAddPost from 'components/bookManager/BookAddPost';
import BookChangePostModal from 'components/bookManager/BookChangePostModal';

// id: '',
// title: '',
// author: '',
// category: '',
// image: '',
// price: '',
// salePrice: '',
// score: '',
// quantity: '',
// condition: '',
// publishedDate: '',
// publisher: '',
// message: '',
// status: ''

function BookManager() {
  const [modal, setModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      const booksArray = await Api.get('/books').then((response) => response.data);
      const initBooksData = booksArray.map((book) => {
        return {
          id: book._id,
          title: book.title,
          author: book.author,
          category: book.category,
          file: book.imageUrl,
          price: book.price,
          salePrice: book.salePrice,
          score: book.score,
          quantity: book.quantity,
          condition: book.condition,
          publishedDate: book.publishedDate,
          publisher: book.publisher
        };
      });
      setBooks(initBooksData);

      //   // updateBooks({ data: initBooksData });

      //   // titleRef = books[0].title;
      //   // console.log(books[0].title);
      //   // setId(books.id);
      //   // setAuthor(books.author);
      //   // setCategory(books.category);
      //   // setImage(books.image);
      //   // setPrice(books.price);
      //   // setSalePrice(books.salePrice);
      //   // setScore(books.score);
      //   // setQuantity(books.quantity);
      //   // setCondition(books.condition);
      //   // setPublishedDate(books.publishedDate);
      //   // setPublisher(books.publisher);
    };
    getBooks();
  }, []);

  const handleSave = (data) => {
    const isInclude = books.filter((book) => book.id === data._id);
    if (isInclude.length !== 0) {
      setBooks(
        books.map((book) =>
          book.id === data._id
            ? {
                id: data._id,
                title: data.title,
                author: data.author,
                category: data.category,
                file: data.file,
                price: data.price,
                salePrice: data.salePrice,
                score: data.score,
                quantity: data.quantity,
                condition: data.condition,
                publishedDate: data.publishedDate,
                publisher: data.publisher
              }
            : book
        )
      );
    } else {
      setBooks((prev) => {
        return [
          ...prev,
          {
            id: data._id,
            title: data.title,
            author: data.author,
            category: data.category,
            file: data.file,
            price: data.price,
            salePrice: data.salePrice,
            score: data.score,
            quantity: data.quantity,
            condition: data.condition,
            publishedDate: data.publishedDate,
            publisher: data.publisher
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
    // for (let a of formData2.entries()) {
    //   console.log(a[0], a[1]);
    // }
    console.log(item.id);
    try {
      await Api.put(
        '/books',
        {
          params: {
            bookID: item.id
          }
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        formData2
      ).then((res) => console.log(res));
      setModal((prev) => !prev);
      handleSave(item);
    } catch (e) {
      throw new Error('서버에서 책 데이터 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    const isDelete = confirm('정말로 삭제하겠습니까?');
    if (isDelete) {
      const newBooks = books.filter((book) => book.id != id);
      try {
        await Api.delete('/books', {
          params: {
            bookID: id
          }
        });
        setBooks(newBooks);
      } catch (e) {
        throw new Error('서버에서 정상적으로 삭제가 안되었습니다.');
      }
    }
  };

  return (
    <>
      <div>
        <PageTitle title="책 정보 리스트" />
        <div>
          <ManagementTable>
            <thead>
              <ManagementLabelSection>
                <ManagementTh>책 이름</ManagementTh>
                <ManagementTh>작가</ManagementTh>
                <ManagementTh>이미지</ManagementTh>
                <ManagementTh>가격</ManagementTh>
                <ManagementTh>할인가격</ManagementTh>
                <ManagementTh>점수</ManagementTh>
                <ManagementTh>재고량</ManagementTh>
                <ManagementTh>책 상태</ManagementTh>
                <ManagementTh>출판일</ManagementTh>
                <ManagementTh>출판사</ManagementTh>
                <ManagementTh>카테고리</ManagementTh>
                <ManagementTh>수정</ManagementTh>
                <ManagementTh>삭제</ManagementTh>
              </ManagementLabelSection>
            </thead>
            <tbody>
              {books.length === 0
                ? ''
                : books.map((book) => {
                    return (
                      <BookItem
                        bookItem={book}
                        key={book.id}
                        onDelete={handleDelete}
                        onChangeModal={handleChangeModal}
                      />
                    );
                  })}
            </tbody>
          </ManagementTable>
          <BookAddPost onSaveData={handleSave} />
        </div>
      </div>
      {modal && (
        <ModalGrey>
          <BookChangePostModal selectedData={selected} onCancel={handleCancel} onEditSubmit={handleEdit} />
        </ModalGrey>
      )}
    </>
  );
}

export default BookManager;

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
    width: 10%;
  }
  &:nth-child(2) {
    width: 10%;
  }
  &:nth-child(3) {
    width: 10%;
  }
  &:nth-child(4) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:nth-child(6) {
    width: 8%;
  }
  &:nth-child(7) {
    width: 6%;
  }
  &:nth-child(8) {
    width: 6%;
  }
  &:nth-child(9) {
    width: 10%;
  }
  &:nth-child(10) {
    width: 10%;
  }
  &:nth-child(11) {
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
