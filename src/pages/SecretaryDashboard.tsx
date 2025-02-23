import React from 'react';
import { Card, Row, Col, List, Tag, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const SecretaryDashboard: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      date: '2024-02-24',
      type: 'Check-up',
      status: 'confirmed'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '11:30 AM',
      date: '2024-02-24',
      type: 'Cleaning',
      status: 'pending'
    },
    // Add more appointments as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Secretary Dashboard</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Today's Appointments" extra={<Button type="primary">Add Appointment</Button>}>
            <List
              dataSource={upcomingAppointments}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="edit" type="link">Edit</Button>,
                    <Button key="cancel" type="link" danger>Cancel</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<CalendarOutlined style={{ fontSize: '24px' }} />}
                    title={item.patientName}
                    description={`${item.time} - ${item.type}`}
                  />
                  <Tag color={item.status === 'confirmed' ? 'green' : 'orange'}>
                    {item.status.toUpperCase()}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <Button type="primary" block className="mb-3">
              New Appointment
            </Button>
            <Button block className="mb-3">
              Patient Records
            </Button>
            <Button block className="mb-3">
              Send Reminders
            </Button>
            <Button block>
              Generate Reports
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SecretaryDashboard;
