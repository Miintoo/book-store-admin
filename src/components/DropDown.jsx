import React, { useState } from 'react';
import styled from 'styled-components';
import Api from 'utils/api';

const OPTIONS = [
  { value: '주문확인중', name: '주문확인중' },
  { value: '배송준비중', name: '배송준비중' },
  { value: '배송중', name: '배송중' },
  { value: '배송완료', name: '배송완료' },
  { value: '취소', name: '취소' }
];

function DropDown({ defaultValue, orderID }) {
  const handleChange = async (e) => {
    console.log(orderID);
    console.log(e.target.value);
    const response = Api.put(
      'orders',
      {
        status: e.target.value
      },
      {
        params: {
          orderID: orderID
        }
      }
    );
    console.log(response);
  };

  return (
    <>
      <Select onChange={handleChange} defaultValue={defaultValue}>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
    </>
  );
}

const Select = styled.select`
  border-color: #b9b9b9;
`;

export default DropDown;
