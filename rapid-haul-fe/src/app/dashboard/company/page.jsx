'use client';
import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Upload, Typography, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import {
  getCompanyProfile,
  updateCompanyProfile,
  uploadCompanyImage,
} from '@/store/companySlice';
import { useRouter } from 'next/navigation';
import CustomHeader from '@/components/Header';

const { Paragraph } = Typography;

const MyProfile = ({ _ }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const company = useSelector((state) => state.company.profile);

  useEffect(() => {
    dispatch(getCompanyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      form.setFieldsValue(company);
    }
  }, [company, form]);

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append('file', file.file);
    try {
      dispatch(uploadCompanyImage(data)).then(() =>
        dispatch(getCompanyProfile())
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      dispatch(updateCompanyProfile(values)).then(() => {
        router.push('/dashboard');
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <CustomHeader />
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Update Profile</h1>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            {/* Left Section */}
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  maxCount={1}
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={(info) => handleImageUpload(info)}
                  style={{ width: '100%', height: '100%' }}
                >
                  {company.profile_picture ? (
                    <Image
                      width="100%"
                      height="100%"
                      src={
                        company.profile_picture ||
                        'https://via.placeholder.com/290'
                      }
                      alt="Company"
                      preview={false}
                      style={{ borderRadius: '8px' }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                <Form.Item name="first_name" label="First Name">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="last_name" label="Last Name">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    { required: true, message: 'Please input your address!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="contact"
                  label="Contact Office for Help"
                  rules={[
                    {
                      required: true,
                      message: 'Please input contact office for help!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Paragraph>
                  If additional documents are required for driver hiring,
                  RapidHaul and Staffing will contact your company directly.
                  This is part of our commitment to protect and safeguard our
                  client&apos;s sensitive information.
                </Paragraph>
                <Paragraph>
                  For such reasons, we have chosen not to expose such data
                  online.
                </Paragraph>
                <Paragraph>
                  Thank you for trusting us. Your company is our top priority
                  and we are here to assist you with anything you need.
                </Paragraph>
                <Paragraph>
                  RapidHaul and Staffing: Your trusted partner in transportation
                  and logistics.
                </Paragraph>
              </div>
            </Col>

            {/* Right Section */}
            <Col span={12}>
              <Form.Item
                name="company_name"
                label="Company Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="insurance_provider"
                label="Insurance Provider"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="policy_number"
                label="Policy Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dot_number"
                label="DOT Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tax_id_number"
                label="Tax ID Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Company Phone Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="load_type"
                label="Type of Load"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="payment_type"
                label="Type of Payment"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="special_notes" label="Special Notes">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '20px' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default MyProfile;
