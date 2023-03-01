import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const apiUrl = 'http://elice.iptime.org:8080';

function BoardList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/book/read`).then((res) => {
      setBooks(res.data);
      console.log('res.data', res.data);
    });
    axios.get(`${apiUrl}/user/read`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h1>전체 서적 목록</h1>
      <button
        type="button"
        id="bookRegister"
        name="bookRegister"
        onClick={() => {
          navigate('/books', {
            state: {
              message: 'create'
            }
          });
        }}
      >
        등록하기
      </button>
      <br />
      <button
        type="button"
        id="bookRegister2"
        name="bookRegister2"
        onClick={() => {
          navigate('/books2', {
            state: {
              message: 'create'
            }
          });
        }}
      >
        등록하기2
      </button>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>책 이름</th>
              <th>책 저자</th>
              <th>분류</th>
              <th>이미지</th>
              <th>가격</th>
              <th>추천점수</th>
              <th>재고수량</th>
              <th>책 상태</th>
              <th>발행일</th>
              <th>출판사</th>
              <th>주문수량</th>
              <th>변경</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const {
                _id: id,
                title,
                author,
                category,
                imageUrl,
                price,
                score,
                quantity,
                condition,
                publishedDate,
                publisher
              } = book;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{author}</td>
                  <td>{category.category}</td>
                  <td>
                    <img src={imageUrl} alt="imageForBook" />
                  </td>
                  <td>{price}</td>
                  <td>{score}</td>
                  <td>{quantity}</td>
                  <td>{condition}</td>
                  <td>{publishedDate}</td>
                  <td>{publisher}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('id', id);
                        axios.delete(`${apiUrl}/book/delete/${id}`).then((res) => {
                          console.log('res', res.data);
                          axios.get(`${apiUrl}/book/read`).then((result) => {
                            setBooks(result.data);
                          });
                        });
                      }}
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/books', {
                          state: {
                            book: {
                              id,
                              title,
                              author,
                              category,
                              image,
                              price,
                              score,
                              quantity,
                              condition,
                              publishedDate,
                              publisher
                            },
                            message: 'update'
                          }
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOrders((old) => [
                          ...old,
                          {
                            id,
                            title,
                            image,
                            price,
                            quantity
                          }
                        ]);
                      }}
                    >
                      주문
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h1>사용자 목록</h1>
      <button
        type="button"
        id="userRegister"
        name="userRegister"
        onClick={() => {
          navigate('/users', {
            state: {
              message: 'create'
            }
          });
        }}
      >
        등록하기
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>비밀번호</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>포인트</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { _id: id, name, email, password, phone, address, point } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td>{point}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      axios.delete(`${apiUrl}/user/delete/${id}`).then((res) => {
                        console.log('res', res);
                        axios.get(`${apiUrl}/user/read`).then((result) => {
                          setUsers(result.data);
                        });
                      });
                    }}
                  >
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/users', {
                        state: {
                          user: {
                            id,
                            name,
                            email,
                            password,
                            phone,
                            address,
                            point
                          },
                          message: 'update'
                        }
                      });
                    }}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem(
                        'user',
                        JSON.stringify({
                          id,
                          name,
                          email,
                          phone,
                          address
                        })
                      );
                    }}
                  >
                    주문
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div />
      <button
        type="button"
        onClick={() => {
          navigate('/board/orders', {
            state: {
              orders
            }
          });
        }}
      >
        장바구니 가기
      </button>
      <Outlet />
      <br />
      <button
        type="button"
        onClick={async () => {
          const result = await axios.get(`${apiUrl}/test`);
          console.log('result', result);
        }}
      >
        multer button
      </button>
      <img src={'http://elice.iptime.org:8080/test/download/image-1677035882116.jpeg'} alt="image" />
    </div>
  );
}

export default BoardList;
