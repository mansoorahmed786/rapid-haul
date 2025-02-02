import React from 'react';
import { Row, Col, Button, Card, Image } from 'antd';

const roles = [
  'Driver',
  'Company',
  'Dispatcher',
  'Mechanic',
  'Employee',
  'Mechanic Customer',
];

const DriverRole = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>
        Welcome to Rapid Haul and Staffing LLC
      </h1>
      <div style={{ marginBottom: '40px' }}>
        <Row gutter={[16, 16]}>
          {roles.map((role, index) => (
            <Col span={8} key={index} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '5px solid white',
                  boxShadow: '0 0 0 5px orange',
                  margin: '0 auto 10px',
                }}
              >
                <Image
                  src={`https://via.placeholder.com/150?text=${role}`}
                  alt={role}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <Button type="primary">{`Are you ${role}?`}</Button>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <Row gutter={[16, 16]}>
          {roles.map((role, index) => (
            <Col span={8} key={index}>
              <Card title={`Are you a ${role}?`}>
                <ul>
                  <li>Random text 1</li>
                  <li>Random text 2</li>
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DriverRole;
