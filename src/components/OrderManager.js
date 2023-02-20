import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useLocation } from 'react-router-dom';

function OrderManager() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderFrom, setOrderFrom] = useState();
  console.log('orders', orders);
  useEffect(() => {
    console.log('location.state', location?.state);
    setOrders(location?.state?.orders);
    setUsers([JSON.parse(localStorage.getItem('user'))]);
    console.log('orderuser', JSON.parse(localStorage.getItem('user')));
  }, []);

  const orderHandler = () => {
    const data = {
      userId: users[0].id,
      orderItemList: orders.map(order => ({
        bookId: order.id,
        quantity: order.quantity,
        price: order.price,
        title: order.title,
      })),
      address: users[0].address,
      phone: users[0].phone,
      email: users[0].email,
      totalPrice: (() =>
        orders.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))(),
    };
    console.log('data', data);

    axios.post('http://elice.iptime.org:8080/order/create', data).then(res => {
      console.log('res', res);
    });
  };

  return (
    <div>
      <h1>주문 서적 목록</h1>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>책이름</th>
              <th>이미지</th>
              <th>가격</th>
              <th>주문수량</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => {
              const { id, title, image, price, quantity } = order;

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>
                    <img src={image} alt="imageForBook" />
                  </td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>
                    <button type="button">삭제</button>
                    <button type="button">수정</button>
                    <button type="button">주문</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h1>사용자 목록</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => {
            const { id, name, email, phone, address } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td>
                  <button type="button">삭제</button>
                  <button type="button">수정</button>
                  <button type="button">주문</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div />
      <button type="button" onClick={orderHandler}>
        주문하기
      </button>

      <div>
        <h1>주문 내역</h1>
        <br />
        <button
          type="button"
          onClick={async () => {
            console.log('users[0].id', users[0].id);
            await axios
              .get(`http://elice.iptime.org:8080/order/read/${users[0].id}`)
              .then(res => {
                console.log('res', res);
                setOrderFrom(res.data);
              });
          }}
        >
          주문 목록 가져오기
        </button>

        <button
          type="button"
          onClick={async () => {
            console.log('orderFrom', orderFrom);
            await axios
              .put('http://elice.iptime.org:8080/order/update', orderFrom)
              .then(res => {
                console.log('res', res.data);
              });
          }}
        >
          주문 목록 수정하기
        </button>
      </div>
    </div>
  );
}
export default OrderManager;
