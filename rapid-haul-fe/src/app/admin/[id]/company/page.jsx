// filepath: /home/techtitan/Desktop/personal/github/rapid-haul-F2/rapid-haul-fe/src/app/admin/[id]/edit.jsx
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers, updateDriver } from '@/store/driversSlice';
import { Form, Input, Button, Typography, Switch, InputNumber } from 'antd';

const { Title } = Typography;

const EditPage = ({ params }) => {
  const { id } = params;
  const dispatch = useDispatch();
  const router = useRouter();
  const drivers = useSelector((state) => state.drivers.driversList);
  const driver = drivers.find((d) => d.id === parseInt(id));
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(fetchDrivers());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (driver) {
      form.setFieldsValue({
        email: driver.email,
        name: `${driver.first_name} ${driver.last_name}`,
        first_name: driver.first_name,
        last_name: driver.last_name,
        status: driver.status,
        is_payment_enabled: driver.is_payment_enabled,
        expiry_time: driver.expiry_time,
      });
    }
  }, [driver, form]);

  const onFinish = async (values) => {
    try {
      await dispatch(updateDriver({ id, ...values })).unwrap();
      router.push('/admin');
    } catch (error) {
      console.error('Update failed:', error);
    }
    dispatch(fetchDrivers());
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Edit Driver</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="is_payment_enabled"
          label="Payment Status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="expiry_time"
          label="Default Expiry(in hours)"
          rules={[
            {
              required: true,
              message: 'Please input the availability expiry!',
            },
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPage;
