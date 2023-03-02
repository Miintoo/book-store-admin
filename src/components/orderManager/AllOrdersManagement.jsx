import React, { useEffect, useState } from 'react';
import Api from 'utils/api';
import { format } from 'date-fns';
import OrderManagementTemplate from './OrderManagementTemplate';
import { useNavigate } from 'react-router-dom';
import classifyAdmin from 'utils/classifyAdmin';

function allOrdersManagement() {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!classifyAdmin()) {
      return navigate('/admin/login');
    }
    const getOrderData = async () => {
      const response = await Api.get('/orders');
      setOrderData(response.data);
    };
    getOrderData();
  }, []);

  console.log('orderData', orderData);

  const orderManagementData = orderData.map((data) => {
    const formatDate = format(new Date(data.order.createdAt), 'yyyy-MM-dd hh:mm:ss');
    const orderItemCount = data.orderItemList.length - 1;
    return {
      orderDate: formatDate,
      orderID: data.orderItemList[0].orderID,
      ordererName: data.order.userName,
      orderItem: `${data.orderItemList[0].bookTitle} 외 ${orderItemCount}개`,
      orderPrice: `${data.order.totalPrice} 원`,
      orderStatus: data.order.status
    };
  });

  return <OrderManagementTemplate orderManagementData={orderManagementData} />;
}

export default allOrdersManagement;
