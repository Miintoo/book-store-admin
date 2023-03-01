// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// const apiUrl = 'http://elice.iptime.org:8080';
// function UserManager() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [id, setId] = useState(''); // 수정할 때 사용
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [point, setPoint] = useState(0);
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('create');

//   useEffect(() => {
//     console.log('location', location.state);

//     setStatus(location.state?.message);
//     if (location.state?.message === 'update') {
//       const { user } = location.state;

//       console.log('status', status);
//       console.log('location', location.state);
//       console.log('userId', user.id);
//       setId(user.id);
//       setName(user.name);
//       setEmail(user.email);
//       setPassword(user.password);
//       setPhone(user.phone);
//       setAddress(user.address);
//       setPoint(user.point);
//     }
//   }, []);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     const data = {
//       name,
//       email,
//       password,
//       phone,
//       address,
//       point,
//     };
//     const dataModified = {
//       id,
//       name,
//       email,
//       password,
//       phone,
//       address,
//       point,
//     };
//     console.log('data', dataModified);
//     if (status === 'create') {
//       await axios
//         .post(`${apiUrl}/user/create`, data)
//         .then(res => {
//           console.log('result', res.data);
//           setMessage('사용자가 등록되었습니다.');
//           navigate('/');
//         })
//         .catch(err => {
//           console.log('err', err);
//         });
//     } else if (status === 'update') {
//       await axios
//         .put(`${apiUrl}/user/update`, dataModified)
//         .then(res => {
//           console.log('result', res.data);
//           setMessage('사용자가 수정되었습니다.');
//           navigate('/');
//         })
//         .catch(err => {
//           console.log('err', err);
//         });
//     }
//   };

//   const inputHandler = e => {
//     switch (e.target.name) {
//       case 'name':
//         setName(e.target.value);
//         break;
//       case 'email':
//         setEmail(e.target.value);
//         break;
//       case 'password':
//         setPassword(e.target.value);
//         break;
//       case 'phone':
//         setPhone(e.target.value);
//         break;
//       case 'address':
//         setAddress(e.target.value);
//         break;
//       case 'point':
//         setPoint(e.target.value);
//         break;
//       default:
//     }
//   };

//   return (
//     <div>
//       <h1>사용자 등록</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">이름</label>
//         <input
//           id="name"
//           type="text"
//           name="name"
//           value={name}
//           onChange={inputHandler}
//         />
//         <br />
//         <label htmlFor="email">이메일</label>
//         <input
//           id="email"
//           type="text"
//           name="email"
//           value={email}
//           onChange={inputHandler}
//         />
//         <br />
//         <label htmlFor="password">비밀번호</label>
//         <input
//           id="password"
//           type="password"
//           name="password"
//           value={password}
//           onChange={inputHandler}
//         />
//         <br />
//         <label htmlFor="phone">전화번호</label>
//         <input
//           id="phone"
//           type="text"
//           name="phone"
//           value={phone}
//           onChange={inputHandler}
//         />
//         <br />
//         <label htmlFor="address">주소</label>
//         <input
//           id="address"
//           type="text"
//           name="address"
//           value={address}
//           onChange={inputHandler}
//         />
//         <br />
//         <label htmlFor="point">point</label>
//         <input
//           id="point"
//           type="number"
//           name="point"
//           value={point}
//           onChange={inputHandler}
//         />
//         <br />

//         {status === 'create' ? (
//           <button type="submit" name="submitButton">
//             등록
//           </button>
//         ) : (
//           <button type="submit" name="submitButton">
//             수정
//           </button>
//         )}
//         <p>{message}</p>
//       </form>
//     </div>
//   );
// }

// export default UserManager;
