import React, { useEffect, useState } from 'react';
import Api from 'utils/api';
import { format } from 'date-fns';
import OrderManagementTemplate from './OrderManagementTemplate';
import { useLocation } from 'react-router-dom';

function UserOrdersManagement() {
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();
  const userID = location.state.userID;
  console.log(userID);

  useEffect(() => {
    const getUserOrderData = async () => {
      const response = await Api.get('/users/orders', {
        params: {
          userID: userID
        }
      });
      setOrderData(response.data);
    };
    getUserOrderData();
  }, []);

  // console.log('orderData', orderData);

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

export default UserOrdersManagement;
