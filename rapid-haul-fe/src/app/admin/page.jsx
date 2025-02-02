'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Table, Button, Typography, Row, Col } from 'antd';
import { fetchDrivers } from '@/store/driversSlice';
import { fetchCompanies } from '@/store/companiesSlice';
import { fetchNotifications } from '@/store/notificationsSlice';
import { updateNotificationStatus } from '@/store/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '@/components/Header';
import { formatDate } from '@/utils/helpers';

const { Content } = Layout;
const { Title, Text } = Typography;

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const drivers = useSelector((state) => state.drivers.driversList);
  const companies = useSelector((state) => state.companies.companiesList);
  const notifications = useSelector(
    (state) => state.notifications.notificationsList
  );

  const [selectedMenu, setSelectedMenu] = useState('drivers');

  const driverColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Is Payment Enabled?',
      dataIndex: 'is_payment_enabled',
      key: 'is_payment_enabled',
      render: (_, record) => `${record.is_payment_enabled}`,
    },
    {
      title: 'Has Paid?',
      dataIndex: 'has_paid',
      key: 'has_paid',
      render: (_, record) => `${record.has_paid}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => router.push(`/admin/${record.id}/driver`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const companyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Is Payment Enabled?',
      dataIndex: 'is_payment_enabled',
      key: 'is_payment_enabled',
      render: (_, record) => `${record.is_payment_enabled}`,
    },
    {
      title: 'Has Paid?',
      dataIndex: 'has_paid',
      key: 'has_paid',
      render: (_, record) => `${record.has_paid}`,
    },
  ];

  const notificationColumns = [
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => formatDate(created_at),
    },
    {
      title: 'Is Read',
      dataIndex: 'is_read',
      key: 'is_read',
      render: (_, record) => `${record.is_read}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        !record.is_read ? (
          <Button type="link" onClick={() => handleNotificationChange(record)}>
            Mark as Read
          </Button>
        ) : null,
    },
  ];

  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchCompanies());
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationChange = async (notification) => {
    dispatch(updateNotificationStatus({ id: notification.id }));
    dispatch(fetchNotifications());
  };

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <CustomHeader />

      <Content style={{ padding: '20px' }}>
        <Title level={2} style={{ margin: 0 }}>
          RapidHaul & Staffing LLC
        </Title>
        <Text>Welcome to the Control Panel</Text>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedMenu]}
          onClick={handleMenuClick}
          style={{ marginBottom: '20px' }}
        >
          <Menu.Item key="drivers">Drivers</Menu.Item>
          <Menu.Item key="companies">Companies</Menu.Item>
          <Menu.Item key="notifications">Notifications</Menu.Item>
        </Menu>

        {selectedMenu === 'drivers' && (
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <Title level={4}>Drivers</Title>
              <Table columns={driverColumns} dataSource={drivers} />
            </Col>
          </Row>
        )}

        {selectedMenu === 'companies' && (
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <Title level={4}>Company Management</Title>
              <Table columns={companyColumns} dataSource={companies} />
            </Col>
          </Row>
        )}

        {selectedMenu === 'notifications' && (
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <Title level={4}>Notifications</Title>
              <Table columns={notificationColumns} dataSource={notifications} />
            </Col>
          </Row>
        )}
      </Content>
    </div>
  );
};

export default Admin;
