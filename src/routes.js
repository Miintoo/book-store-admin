import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderManagementPage from 'pages/OrderManagementPage';

function Router() {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/orderManagement" element={<OrderManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
