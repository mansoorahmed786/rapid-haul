import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Card,
  Calendar,
  Space,
  Divider,
  Image,
} from 'antd';
import { useRouter } from 'next/navigation';
import { fetchDrivers } from '@/store/driversSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;

const DriverDashboardContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const drivers = useSelector((state) => state.drivers.driversList);
  const userInfo = useSelector((state) => state.driver.profile);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleGoToProfile = () => {
    router.push('dashboard/driver');
  };

  const handleSearch = (values) => {
    console.log('Search values:', values);
    // Implement search functionality here
  };

  const renderDriverCard = (driver) => (
    <Col span={8} key={driver.id}>
      <Card
        hoverable
        cover={
          <Image
            style={{ width: '100%', height: '300px' }}
            alt="driver"
            src={driver.profile_picture || 'https://via.placeholder.com/150'}
          />
        }
        style={{ textAlign: 'center' }}
      >
        <Card.Meta
          title={`${driver.first_name} ${driver.last_name}`}
          description={`Status: ${driver.status}`}
          style={{ marginBottom: '16px' }}
        />
        <Button
          type="primary"
          onClick={() => router.push(`/driver/${driver.id}`)}
        >
          View Driver Profile
        </Button>
      </Card>
    </Col>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {/* Left Panel */}
        <Col span={4}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Image
              width={290}
              height={290}
              src="logo.jpeg"
              alt="Logo"
              preview={false}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <Form form={form} layout="vertical" onFinish={handleSearch}>
            <Form.Item
              name="searchTerm"
              style={{ marginBottom: '8px', width: '300px' }}
            >
              <Input placeholder="Enter search term" />
            </Form.Item>
            <Form.Item
              name="yearsOfExperience"
              style={{ marginBottom: '8px', width: '300px' }}
            >
              <Select placeholder="Select years of experience">
                <Option value="1-3">1-3 years</Option>
                <Option value="4-6">4-6 years</Option>
                <Option value="7+">7+ years</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="vehicleOperated"
              style={{ marginBottom: '8px', width: '300px' }}
            >
              <Select placeholder="Select vehicle operated">
                <Option value="vehicle1">Vehicle 1</Option>
                <Option value="vehicle2">Vehicle 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="trailerOperated"
              style={{ marginBottom: '8px', width: '300px' }}
            >
              <Select placeholder="Select trailer operated">
                <Option value="trailer1">Trailer 1</Option>
                <Option value="trailer2">Trailer 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="mechanicalKnowledge"
              style={{ marginBottom: '8px', width: '300px' }}
            >
              <Select placeholder="Select mechanical knowledge">
                <Option value="basic">Basic</Option>
                <Option value="intermediate">Intermediate</Option>
                <Option value="advanced">Advanced</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
          <Divider
            style={{
              borderColor: '#7cb305',
              width: '300px',
            }}
          ></Divider>
          <div
            style={{
              width: '300px',
              border: `1px`,
            }}
          >
            <Calendar fullscreen={false} />
          </div>
        </Col>

        {/* Right Panel */}
        <Col span={18}>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={8}>
              <Image
                width={290}
                height={290}
                src={
                  userInfo?.profile_picture || 'https://via.placeholder.com/290'
                }
                alt="Driver"
                preview={false}
                style={{ borderRadius: '8px' }}
              />
            </Col>
            <Col span={16}>
              <Row>
                <Col span={6}>
                  <Title level={4}>Name:</Title>
                </Col>
                <Col span={18}>
                  <Title level={5}>{userInfo?.name}</Title>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Title level={4}>Status:</Title>
                </Col>
                <Col span={18}>
                  <Title level={5}>{userInfo?.status}</Title>
                </Col>
              </Row>
            </Col>
          </Row>
          <Space style={{ marginBottom: '20px' }}>
            <Button type="primary">Driver Record</Button>
            <Button type="primary" onClick={handleGoToProfile}>
              View Profile
            </Button>
            <Button type="primary">Driver Experience</Button>
            <Button type="primary">Driver Performance</Button>
          </Space>
          <Row gutter={[16, 16]}>
            {drivers.map((driver) => renderDriverCard(driver))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DriverDashboardContent;
