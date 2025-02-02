import React from 'react';
import { Layout, Button, Typography, Row, Col } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', padding: '20px 0' }}>
      <Text>2024 © RapidHaul & Staffing LLC. All rights reserved.</Text>
      <Row justify="center" style={{ marginTop: '10px' }}>
        <Col>
          <Button type="link">Privacy Policy</Button>
        </Col>
        <Col>
          <Text style={{ margin: '0 10px' }}>|</Text>
        </Col>
        <Col>
          <Button type="link">Terms of Service</Button>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
