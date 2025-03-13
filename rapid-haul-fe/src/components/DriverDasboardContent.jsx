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
import { StarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
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
    <Col xs={24} sm={12} md={8} lg={8} xl={6} key={driver.id}>
      <Card
        hoverable
        style={{ textAlign: 'center', height: '100%' }}
        bodyStyle={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div style={{ flex: 1 }}>
          <Image
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            alt={`Driver ${driver.id}`}
            src={driver.profile_picture || 'https://via.placeholder.com/150'}
          />
          <div style={{ margin: '10px 0' }}>
            <Text strong>{driver.name || `Driver ${driver.id}`}</Text>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Button
            shape="circle"
            icon={<StarOutlined />}
            style={{ border: '1px solid #d9d9d9' }}
          />
          <Button
            type="primary"
            onClick={() => router.push(`/driver/${driver.id}`)}
            style={{ flex: 1 }}
          >
            View Profile
          </Button>
        </div>
      </Card>
    </Col>
  );

  return (
    <div style={{ background: '#f0f0f0', padding: '16px' }}>
      <Row gutter={[16, 16]}>
        {/* Left Panel */}
        <Col
          xs={24}
          md={10}
          lg={8}
          xl={6}
          style={{
            background: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Image
              width="100%"
              style={{
                maxWidth: '290px',
                height: 'auto',
                borderRadius: '8px',
                margin: '0 auto'
              }}
              src="logo.jpeg"
              alt="Logo"
              preview={false}
            />
          </div>

          <Form form={form} layout="vertical" onFinish={handleSearch}>
            <Form.Item name="searchTerm">
              <Input placeholder="Enter search term" />
            </Form.Item>
            <Form.Item name="yearsOfExperience">
              <Select placeholder="Years of experience">
                <Option value="1-3">1-3 years</Option>
                <Option value="4-6">4-6 years</Option>
                <Option value="7+">7+ years</Option>
              </Select>
            </Form.Item>
            <Form.Item name="vehicleOperated">
              <Select placeholder="Vehicle operated">
                <Option value="vehicle1">Vehicle 1</Option>
                <Option value="vehicle2">Vehicle 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="trailerOperated">
              <Select placeholder="Trailer operated">
                <Option value="trailer1">Trailer 1</Option>
                <Option value="trailer2">Trailer 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="mechanicalKnowledge">
              <Select placeholder="Mechanical knowledge">
                <Option value="basic">Basic</Option>
                <Option value="intermediate">Intermediate</Option>
                <Option value="advanced">Advanced</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Search
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ borderColor: '#7cb305' }} />

          <div style={{ background: 'white', borderRadius: '8px' }}>
            <Calendar fullscreen={false} />
          </div>
        </Col>

        {/* Right Panel */}
        <Col xs={24} md={14} lg={16} xl={18}>
          {/* Profile Header */}
          <Row
            gutter={[32, 16]}
            style={{
              background: 'white',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}
          >
            {/* Left Column - Image & Name */}
            <Col
              xs={24}
              md={8}
              lg={10}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: '16px'
              }}
            >
              <Image
                width={120}
                height={120}
                src={userInfo?.profile_picture || 'https://via.placeholder.com/150'}
                alt="Driver"
                preview={false}
                style={{ borderRadius: '8px' }}
              />
              <Title
                level={4}
                style={{
                  marginTop: '10px',
                  marginBottom: 0,
                  textAlign: 'center'
                }}
              >
                {userInfo?.name || 'John Doe'}
              </Title>
            </Col>

            {/* Right Column - Stats */}
            <Col
              xs={24}
              md={16}
              lg={10}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '16px'
              }}
            >
              <Row gutter={[16, 8]}>
                <Col xs={12} sm={6} lg={24}>
                  <Text>Score: </Text>
                  <Text strong style={{ color: '#1890ff' }}>85%</Text>
                </Col>
                <Col xs={12} sm={6} lg={24}>
                  <Text>Safe Driving: </Text>
                  <Text strong style={{ color: '#1890ff' }}>90%</Text>
                </Col>
                <Col xs={12} sm={6} lg={24}>
                  <Text>Punctuality: </Text>
                  <Text strong style={{ color: '#1890ff' }}>95%</Text>
                </Col>
                <Col xs={12} sm={6} lg={24}>
                  <Text>Load Care: </Text>
                  <Text strong style={{ color: '#1890ff' }}>98%</Text>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* Action Buttons */}
          <Row style={{ marginBottom: '16px' }}>
            <Space
              wrap
              size={[8, 16]}
              style={{
                width: '100%',
                justifyContent: 'flex-start'
              }}
            >
              <Button>Driver Record</Button>
              <Button>View Profile</Button>
              <Button>Driver Experience</Button>
              <Button>Driver Performance</Button>
            </Space>
          </Row>

          {/* Driver Cards */}
          <Row gutter={[16, 16]}>
            {drivers && drivers.length > 0 ? (
              drivers.map(renderDriverCard)
            ) : (
              [1, 2, 3].map((i) => (
                <Col xs={24} sm={12} md={8} key={i}>
                  <Card
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    bodyStyle={{
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                        alt={`Driver ${i}`}
                        src="https://via.placeholder.com/150"
                      />
                      <div style={{ margin: '10px 0' }}>
                        <Text strong>{`Driver ${i}`}</Text>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Button
                        shape="circle"
                        icon={<StarOutlined />}
                        style={{ border: '1px solid #d9d9d9' }}
                      />
                      <Button type="primary" style={{ flex: 1 }}>
                        View Profile
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DriverDashboardContent;
