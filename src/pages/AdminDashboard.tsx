import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Tabs } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { PermissionsManager } from '../components/PermissionsManager';
import { User, Permission } from '../types/user';

const { TabPane } = Tabs;

const AdminDashboard: React.FC = () => {
  const { getAllUsers, updateUserPermissions } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [getAllUsers]);

  const handleUpdatePermissions = async (userId: string, permissions: Permission[]) => {
    await updateUserPermissions(userId, permissions);
    // Refresh the users list after updating permissions
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultActiveKey="overview">
        <TabPane 
          tab={
            <span>
              <TeamOutlined />
              Overview
            </span>
          }
          key="overview"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={users.length}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Statistic
                  title="Total Appointments"
                  value={324}
                  prefix={<CalendarOutlined />}
                />
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Statistic
                  title="Active Staff"
                  value={users.filter(u => u.role !== 'user').length}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <SettingOutlined />
              User Permissions
            </span>
          }
          key="permissions"
        >
          <PermissionsManager
            users={users}
            onUpdatePermissions={handleUpdatePermissions}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
