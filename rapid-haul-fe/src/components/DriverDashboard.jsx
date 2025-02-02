'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/userSlice';
import PaymentPage from './PaymentPage';
import DriverProfile from './DriverProfile';
import DriverDashboardContent from './DriverDasboardContent';

const DriverDashboard = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [isPayed, setIsPayed] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo.isPaymentEnabled) {
      setIsPayed(userInfo.isPaid);
    } else {
      setIsPayed(false);
    }
    if (userInfo.isProfileComplete) {
      setIsProfileComplete(userInfo.isProfileComplete);
    }
  }, [userInfo]);

  const renderUserComponent = () => {
    if (!isProfileComplete) {
      return (
        <div>
          <DriverProfile setIsProfileComplete={setIsProfileComplete} />
        </div>
      );
    } else if (!isPayed) {
      if (userInfo.isPaymentEnabled) {
        return <PaymentPage userType="driver" setIsPayed={setIsPayed} />;
      } else {
        return (
          <h3 style={{ textAlign: 'center' }}>
            Payment is not enabled for your account
          </h3>
        );
      }
    } else if (isProfileComplete && isPayed) {
      return <DriverDashboardContent />;
    }
  };

  return <>{renderUserComponent()}</>;
};

export default DriverDashboard;
