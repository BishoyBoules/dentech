import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { CalendarOutlined, UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Title level={1} className="dark:text-white">Welcome to Truemedfin</Title>
        <Paragraph className="text-lg dark:text-gray-300">
          Your trusted partner in dental care management
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} className="mt-8">
        <Col xs={24} md={8}>
          <Card
            hoverable
            className="text-center h-full dark:bg-gray-800 dark:text-white"
            cover={<CalendarOutlined className="text-5xl text-primary-600 mt-6" />}
          >
            <Title level={3} className="dark:text-white">Appointments</Title>
            <Paragraph className="dark:text-gray-300">
              Schedule and manage your dental appointments
            </Paragraph>
            <Link to="/appointments">
              <Button type="primary" size="large">
                Book Now
              </Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            className="text-center h-full dark:bg-gray-800 dark:text-white"
            cover={<UserOutlined className="text-5xl text-secondary-600 mt-6" />}
          >
            <Title level={3} className="dark:text-white">Patient Profile</Title>
            <Paragraph className="dark:text-gray-300">
              View and update your patient information
            </Paragraph>
            <Link to="/profile">
              <Button type="primary" size="large">
                View Profile
              </Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            className="text-center h-full dark:bg-gray-800 dark:text-white"
            cover={<MedicineBoxOutlined className="text-5xl text-green-600 mt-6" />}
          >
            <Title level={3} className="dark:text-white">Services</Title>
            <Paragraph className="dark:text-gray-300">
              Explore our dental services and treatments
            </Paragraph>
            <Button type="primary" size="large">
              Learn More
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
