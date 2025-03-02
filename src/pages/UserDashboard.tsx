import React from 'react';
import { Card, Row, Col, Button, List, Tag } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const UserDashboard: React.FC = () => {
  const appointments = [
    {
      id: 1,
      date: '2024-02-24',
      time: '10:00 AM',
      type: 'Check-up',
      doctor: 'Dr. Smith',
      status: 'upcoming'
    },
    {
      id: 2,
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'Cleaning',
      doctor: 'Dr. Johnson',
      status: 'completed'
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="My Appointments">
            <List
              dataSource={appointments}
              renderItem={item => (
                <List.Item
                  actions={[
                    item.status === 'upcoming' && (
                      <Button key="cancel" type="link" danger>
                        Cancel
                      </Button>
                    )
                  ].filter(Boolean)}
                >
                  <List.Item.Meta
                    avatar={<CalendarOutlined style={{ fontSize: '24px' }} />}
                    title={`${item.type} with ${item.doctor}`}
                    description={
                      <>
                        <ClockCircleOutlined /> {item.date} at {item.time}
                      </>
                    }
                  />
                  <Tag color={item.status === 'upcoming' ? 'blue' : 'green'}>
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
              Book New Appointment
            </Button>
            <Button block className="mb-3">
              View Medical History
            </Button>
            <Button block>
              Contact Support
            </Button>
          </Card>

          <Card title="Upcoming Appointment" className="mt-4">
            {appointments.find(apt => apt.status === 'upcoming') ? (
              <div>
                <p className="font-bold">{appointments[0].type}</p>
                <p>{appointments[0].date} at {appointments[0].time}</p>
                <p>with {appointments[0].doctor}</p>
              </div>
            ) : (
              <p>No upcoming appointments</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
