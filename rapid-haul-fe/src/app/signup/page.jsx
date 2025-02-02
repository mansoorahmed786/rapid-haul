'use client';
import React from 'react';
import { Form, Input, Button } from 'antd';
import { signup } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values) => {
    const { firstName, lastName, email, password1, confirmPassword } = values;
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: password1,
      password2: confirmPassword,
    };

    const resultAction = await dispatch(signup(data));
    if (signup.fulfilled.match(resultAction)) {
      router.push('/login');
    } else {
      console.log('Registration failed!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '50px' }}>
      <h1> Register for Rapid Haul! </h1>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your Last Name!' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password1"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password1']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
