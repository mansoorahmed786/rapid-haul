import React from 'react';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { updateDriverPayment, updateCompanyPayment } from '@/store/userSlice';

const { Title } = Typography;

const PaymentPage = ({ userType, setIsPayed }) => {
  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      if (userType === 'driver') {
        await dispatch(updateDriverPayment()).unwrap();
        setIsPayed(true);
      } else if (userType === 'company') {
        await dispatch(updateCompanyPayment()).unwrap();
        setIsPayed(true);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Title level={2}>Complete your payment to go to the next step</Title>
      <Button type="primary" onClick={handlePayment}>
        Pay
      </Button>
    </div>
  );
};

export default PaymentPage;
