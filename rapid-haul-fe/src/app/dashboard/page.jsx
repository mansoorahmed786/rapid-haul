'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/userSlice';
import UserType from '@/components/UserType';
import DriverDashboard from '@/components/DriverDashboard';
import CompanyDashboard from '@/components/CompanyDashboard';
import CustomHeader from '@/components/Header';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo.userType) {
      setUserType(userInfo.userType);
    }
  }, [userInfo]);

  const renderUserTypeView = () => {
    if (userType === 'Company') {
      return <CompanyDashboard />;
    } else if (userType === 'Driver') {
      return <DriverDashboard />;
    } else if (!userType) {
      return <UserType setUserType={setUserType} />;
    }
  };

  return (
    <>
      <CustomHeader />
      <div style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          {userType === 'Company' ? (
            <h1>Company Dashboard</h1>
          ) : (
            <h1>Drivers Active Dashboard</h1>
          )}
        </div>
        {renderUserTypeView()}
      </div>
    </>
  );
};

export default Dashboard;
