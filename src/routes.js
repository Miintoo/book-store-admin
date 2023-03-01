import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderManagementPage from 'pages/OrderManagementPage';
import UserManagementPage from 'pages/UserManagementPage';
import UserOrdersManagementPage from 'pages/UserOrderManagementPage';
import OrderItemManagementPage from 'pages/OrderItemManagementPage';
import Nav from 'components/commons/Nav';
import BookManager from 'pages/BookManager';
import LoginPage from 'pages/Login';
import SignUpPage from 'pages/SignUp';

function Router() {
  return (
    <div className="routes">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/admin" element={<BookManager />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/signUp" element={<SignUpPage />} />

          <Route path="/admin/orderManagement" element={<OrderManagementPage />} />
          <Route path="/admin/orderItemManagement" element={<OrderItemManagementPage />} />
          <Route path="/admin/userManagement" element={<UserManagementPage />} />
          <Route path="/admin/userOrderManagement" element={<UserOrdersManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
