import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderManagementPage from 'pages/OrderManagementPage';
import UserManagementPage from 'pages/UserManagementPage';
import UserOrdersManagementPage from 'pages/UserOrderManagementPage';
import OrderItemManagementPage from 'pages/OrderItemManagementPage';
import Nav from 'components/commons/Nav';

function Router() {
  return (
    <div className="routes">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/orderManagement" element={<OrderManagementPage />} />
          <Route path="/orderItemManagement" element={<OrderItemManagementPage />} />
          <Route path="/userManagement" element={<UserManagementPage />} />
          <Route path="/userOrderManagement" element={<UserOrdersManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
