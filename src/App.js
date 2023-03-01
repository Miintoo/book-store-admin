import 'styles/global.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BoardList from './components/BoardList';
import BookManager from 'pages/BookManager';
import UserManager from './components/UserManager';
import OrderManager from './components/OrderManager';
import BookManager2 from './components/BookManager2';
import Login from './components/Login';

function App() {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}

          {/* <Route path="/board" element={<BoardList />}> */}
          {/* <Route path="orders" element={<OrderManager />} /> */}
          {/* <Route path="/books2" element={<BookManager2 />} /> */}
          <Route path="/" element={<BookManager />} />
          {/* <Route path="/users" element={<UserManager />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Parsing error: Unexpected token = eslint
// ESLint가 ES6 ~ 7을 파싱할 때 문제가 생기는 경우가 있다고 합니다. 위 문제는 babel-eslint 패키지를 설치하여 해결할 수 있습니다.
