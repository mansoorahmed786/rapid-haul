import React from 'react';
import {
  Layout,
  Menu,
  Table,
  Input,
  Select,
  Button,
  Typography,
  Row,
  Col,
} from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ControlPanel = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Doe',
      status: 'Active',
      experience: '5 years',
      performance: 'Excellent',
    },
    {
      key: '2',
      name: 'Jane Smith',
      status: 'Inactive',
      experience: '3 years',
      performance: 'Good',
    },
    // Add more data as needed
  ];

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
          RapidHaul & Staffing LLC
        </Title>
        <Text style={{ textAlign: 'center', display: 'block' }}>
          Welcome to the Control Panel
        </Text>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Menu mode="horizontal" style={{ marginBottom: '20px' }}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Driver</Menu.Item>
          <Menu.Item key="3">Companies</Menu.Item>
          <Menu.Item key="4">Settings</Menu.Item>
          <Menu.Item key="5">Help</Menu.Item>
        </Menu>

        <Row style={{ marginBottom: '40px' }}>
          <Col span={24}>
            <Title level={4}>Active Drivers</Title>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Title level={4}>Company Management</Title>
            <Row align="middle" gutter={16}>
              <Col>
                <Text>Company Name:</Text>
              </Col>
              <Col>
                <Input
                  placeholder="Enter company name"
                  style={{ width: '200px' }}
                />
              </Col>
              <Col>
                <Text>Role:</Text>
              </Col>
              <Col>
                <Select defaultValue="Driver" style={{ width: '120px' }}>
                  <Option value="Driver">Driver</Option>
                  <Option value="Dispatcher">Dispatcher</Option>
                  <Option value="Mechanic">Mechanic</Option>
                  <Option value="Manager">Manager</Option>
                </Select>
              </Col>
              <Col>
                <Button type="primary">Submit</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ControlPanel;
