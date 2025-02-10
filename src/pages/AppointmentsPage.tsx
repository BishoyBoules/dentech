import React, { useState } from 'react';
import { Typography, Calendar, Modal, Form, Input, TimePicker, Button, Card } from 'antd';
import type { Dayjs } from 'dayjs';

const { Title } = Typography;

interface Appointment {
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
}

const AppointmentsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Appointment booked:', {
        date: selectedDate?.format('YYYY-MM-DD'),
        ...values,
      });
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  return (
    <div className="space-y-6">
      <Title level={2} className="dark:text-white">Book an Appointment</Title>
      
      <Card className="dark:bg-gray-800">
        <Calendar
          onSelect={handleDateSelect}
          className="dark:text-white"
        />
      </Card>

      <Modal
        title="Book Appointment"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        className="dark:bg-gray-800"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="time"
            label="Preferred Time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppointmentsPage;
