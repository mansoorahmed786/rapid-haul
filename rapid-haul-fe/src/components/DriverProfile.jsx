import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Card,
  Form,
  Upload,
  Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { updateDriverProfile } from '@/store/driverSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDriverProfile } from '@/store/driverSlice';
import { uploadDriverImage } from '@/store/driverSlice';

const { Option } = Select;
const { TextArea } = Input;

const DriverProfile = ({ setIsProfileComplete }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const driver = useSelector((state) => state.driver.profile);

  useEffect(() => {
    dispatch(getDriverProfile());
  }, [dispatch]);

  useEffect(() => {
    if (driver) {
      form.setFieldsValue(driver);
    }
  }, [driver, form]);

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append('file', file.file);
    try {
      dispatch(uploadDriverImage(data)).then(() =>
        dispatch(getDriverProfile())
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(updateDriverProfile(values)).then(() =>
        setIsProfileComplete(true)
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          {/* Left Section */}
          <Col span={8}>
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
                {driver.profile_picture ? (
                  <Image
                    width="100%"
                    height="100%"
                    src={
                      driver.profile_picture ||
                      'https://via.placeholder.com/290'
                    }
                    alt="Driver"
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
              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>
              <Form.Item name="about" label="About">
                <TextArea rows={4} placeholder="Write a brief description..." />
              </Form.Item>
            </div>
          </Col>

          {/* Middle Section */}
          <Col span={8}>
            <Card title="Driver License">
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter Phone Number" />
              </Form.Item>
              <Form.Item
                name="license_type"
                label="License Type"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select License Type">
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="endorsement"
                label="Endorsement"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Endorsement">
                  <Option value="endorsement1">Endorsement 1</Option>
                  <Option value="endorsement2">Endorsement 2</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="license_number"
                label="License Number"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter License Number" />
              </Form.Item>

              <Form.Item
                name="language"
                label="Language"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Language">
                  <Option value="english">English</Option>
                  <Option value="spanish">Spanish</Option>
                </Select>
              </Form.Item>

              <Form.Item name="aptitude" label="Aptitude and Commitment">
                <TextArea rows={4} placeholder="Describe your aptitude..." />
              </Form.Item>
            </Card>
          </Col>

          {/* Right Section */}
          <Col span={8}>
            <Card title="Experience">
              <Form.Item
                name="vehicle_name"
                label="Vehicle Operated"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Vehicle">
                  <Option value="vehicle1">Vehicle 1</Option>
                  <Option value="vehicle2">Vehicle 2</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="experience"
                label="Years of Experience"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Years">
                  <Option value="1-3">1-3 years</Option>
                  <Option value="4-6">4-6 years</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="trailer_type"
                label="Trailer Type Operated"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Type">
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="experience_otr"
                label="Experience OTR"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select OTR">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="logbook_type"
                label="Logbook Type"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Logbook">
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="dot_medical_card"
                label="DOT Medical Card"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Card">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="special_skills" label="Special Skills">
                <Select placeholder="Select Special Skills">
                  <Option value="speed1">Skill 1</Option>
                  <Option value="speed2">Skill 2</Option>
                </Select>
              </Form.Item>

              <Form.Item name="skills" label="Skills">
                <Select placeholder="Select Skills">
                  <Option value="speed1">Skill 1</Option>
                  <Option value="speed2">Skill 2</Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DriverProfile;
