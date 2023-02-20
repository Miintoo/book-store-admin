import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList';
import BookManager from './components/BookManager';
import UserManager from './components/UserManager';
import OrderManager from './components/OrderManager';
import BookManager2 from './components/BookManager2';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardList />}>
            <Route path="orders" element={<OrderManager />} />
          </Route>
          <Route path="/books2" element={<BookManager2 />} />
          <Route path="/books" element={<BookManager />} />
          <Route path="/users" element={<UserManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
