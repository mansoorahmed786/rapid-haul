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
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: () => `${Math.floor(Math.random() * 10) + 1} Years`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: () => `${Math.floor(Math.random() * 10) + 90}%`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => router.push(`/admin/${record.id}/driver`)}
          style={{
            backgroundColor: '#007bff',
            borderColor: '#007bff',
          }}
        >
          Edit Profile
        </Button>
      ),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
  ];

  const companyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: () => `${Math.floor(Math.random() * 10) + 1} Years`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: () => `${Math.floor(Math.random() * 10) + 90}%`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button
          type="primary"
          style={{
            backgroundColor: '#007bff',
            borderColor: '#007bff',
          }}
        >
          View Profile
        </Button>
      ),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
  ];

  const notificationColumns = [
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => formatDate(created_at),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Is Read',
      dataIndex: 'is_read',
      key: 'is_read',
      render: (_, record) => `${record.is_read}`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        !record.is_read ? (
          <Button
            type="primary"
            onClick={() => handleNotificationChange(record)}
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
            }}
          >
            Mark as Read
          </Button>
        ) : null,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '20px',
        },
      }),
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

  const tableStyle = {
    border: '1px solid #e8e8e8',
    borderRadius: '0',
  };

  const rowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
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
              <Table
                columns={driverColumns}
                dataSource={drivers}
                style={tableStyle}
                rowClassName={rowClassName}
                pagination={false}
              />
            </Col>
          </Row>
        )}

        {selectedMenu === 'companies' && (
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <Title level={4}>Company Management</Title>
              <Table
                columns={companyColumns}
                dataSource={companies}
                style={tableStyle}
                rowClassName={rowClassName}
                pagination={false}
              />
            </Col>
          </Row>
        )}

        {selectedMenu === 'notifications' && (
          <Row style={{ marginBottom: '40px' }}>
            <Col span={24}>
              <Title level={4}>Notifications</Title>
              <Table
                columns={notificationColumns}
                dataSource={notifications}
                style={tableStyle}
                rowClassName={rowClassName}
                pagination={false}
              />
            </Col>
          </Row>
        )}
      </Content>

      {/* Add CSS for alternating row colors */}
      <style jsx global>{`
        .even-row {
          background-color: #ffffff;
        }
        .odd-row {
          background-color: #f7f7f7;
        }
        .ant-table-cell {
          text-align: center;
          padding: 12px 8px;
        }
        .ant-table-thead > tr > th {
          padding: 12px 8px;
        }
      `}</style>
    </div>
  );
};

export default Admin;
