import React from 'react';
import { Typography, Card, Form, Input, Button, Row, Col, Tabs } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Profile updated:', values);
  };

  const items = [
    {
      key: '1',
      label: 'Personal Information',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234 567 890',
            address: '123 Dental Street',
          }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter your address' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full md:w-auto">
                  Update Profile
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Medical History',
      children: (
        <div className="space-y-4">
          <Card title="Previous Treatments" className="dark:bg-gray-800">
            <p className="dark:text-gray-300">No previous treatments recorded</p>
          </Card>
          
          <Card title="Allergies" className="dark:bg-gray-800">
            <p className="dark:text-gray-300">No allergies recorded</p>
          </Card>
          
          <Card title="Medications" className="dark:bg-gray-800">
            <p className="dark:text-gray-300">No current medications</p>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Title level={2} className="dark:text-white">Profile</Title>
      
      <Card className="dark:bg-gray-800">
        <Tabs items={items} className="dark:text-white" />
      </Card>
    </div>
  );
};

export default ProfilePage;
