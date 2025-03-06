'use client';
import React from 'react';
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Card,
  Carousel,
  Image,
} from 'antd';
import { RocketOutlined, BarChartOutlined } from '@ant-design/icons';
import CustomHeader from './Header';

const { Content } = Layout;

const MainPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <CustomHeader />
        <Content>
          <div
            style={{
              height: '500px',
              backgroundImage: 'url(/yellow-banner.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '80px 50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: '#666', fontSize: '18px', margin: '0' }}>
              Welcome to our pharmacy
            </p>
            <h1
              style={{
                fontSize: '48px',
                maxWidth: '600px',
                margin: '20px 0',
                color: '#333',
              }}
            >
              Recognized company for quality, performance and technology
            </h1>
            <Button
              type="primary"
              size="large"
              style={{ width: 'fit-content' }}
            >
              Read More
            </Button>
          </div>
          <Row gutter={[32, 32]} style={{ padding: '48px 24px' }}>
            <Col span={12}>
              <Card bordered={false} style={{ height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                  }}
                >
                  <RocketOutlined
                    style={{ fontSize: '36px', color: '#FFEB3B' }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                      }}
                    >
                      Our Technology
                    </h3>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '16px',
                        lineHeight: '1.6',
                      }}
                    >
                      We invest in technologies that we expect will make the
                      most difference to our business and the energy industry.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} style={{ height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                  }}
                >
                  <BarChartOutlined
                    style={{ fontSize: '36px', color: '#FFEB3B' }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                      }}
                    >
                      Energy Economics
                    </h3>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '16px',
                        lineHeight: '1.6',
                      }}
                    >
                      The Statistical Review provides historic data on world
                      energy markets, while the Energy Outlook makes projections
                      to 2035.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <div
            style={{
              padding: '80px 24px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '24px',
              }}
            >
              Latest From the Blog
            </h2>
            <Carousel autoplay dots arrows>
              {[
                {
                  image: '/scroll-image1.jpeg',
                  date: 'FEB 18, 2025',
                  title: 'Innovation in Construction',
                },
                {
                  image: '/scroll-image2.jpeg',
                  date: 'MAR 22, 2025',
                  title: 'Sustainable Building',
                },
                {
                  image: '/scroll-image3.jpeg',
                  date: 'APR 05, 2025',
                  title: 'Future Infrastructure',
                },
              ].map((item, index) => (
                <div key={index}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <Typography.Text
                    style={{
                      display: 'block',
                      marginTop: '8px',
                      color: '#333',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.date}
                  </Typography.Text>
                  <Typography.Title
                    level={4}
                    style={{
                      margin: '8px 0 0',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                  >
                    {item.title}
                  </Typography.Title>
                </div>
              ))}
            </Carousel>
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default MainPage;
