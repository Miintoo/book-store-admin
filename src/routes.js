import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderManagementPage from 'pages/OrderManagementPage';
import UserManagementPage from 'pages/UserManagementPage';
import UserCreate from 'components/UserCreate';
import UserOrdersManagementPage from 'pages/UserOrderManagementPage';

function Router() {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/orderManagement" element={<OrderManagementPage />} />
          <Route path="/userManagement" element={<UserManagementPage />} />
          <Route path="/userCreate" element={<UserCreate />} />
          <Route path="/userOrderManagement" element={<UserOrdersManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
