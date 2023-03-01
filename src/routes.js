import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderManagementPage from 'pages/OrderManagementPage';
import UserManagementPage from 'pages/UserManagementPage';
import UserOrdersManagementPage from 'pages/UserOrderManagementPage';
import BookManager from 'pages/BookManager';

function Router() {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/books" element={<BookManager />} />
          <Route path="/orderManagement" element={<OrderManagementPage />} />
          <Route path="/userManagement" element={<UserManagementPage />} />
          <Route path="/userOrderManagement" element={<UserOrdersManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
