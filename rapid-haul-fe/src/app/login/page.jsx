'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Alert } from 'antd';
import { fetchUser } from '@/store/userSlice';
import CustomHeader from '@/components/Header';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      console.log('Login successful');
      await dispatch(fetchUser()).unwrap();
      console.log('User fetched successfully');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (auth.accessToken && userInfo.userType) {
      let redirectPath = '/login';
      if (userInfo.userType === 'Driver' || userInfo.userType === 'Company') {
        redirectPath = '/dashboard';
      } else if (userInfo.userType === 'admin') {
        redirectPath = '/admin';
      }
      router.push(redirectPath);
    }
    if (!userInfo.userType && auth.accessToken) {
      router.push('/dashboard');
    }
  }, [auth.accessToken, userInfo, router]);

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <CustomHeader />
      </div>
      <div style={{ maxWidth: '300px', margin: 'auto', padding: '50px' }}>
        <h1>Welcome to Rapid Haul!</h1>
        {auth.error && (
          <Alert
            message={auth.error}
            type="error"
            style={{ marginBottom: '20px' }}
          />
        )}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', background: '#ffaa01' }}
              loading={auth.status === 'loading'}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
