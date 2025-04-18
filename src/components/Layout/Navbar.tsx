import React, { useState, useEffect } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  MenuOutlined
} from '@ant-design/icons';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsDrawerVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/appointments',
      icon: <CalendarOutlined />,
      label: <Link to="/appointments">Appointments</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  return (
    <nav className="w-full">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center flex-1">
          <h1 className="text-2xl font-bold text-primary-600 mr-8">
            Truemedfin
          </h1>

          {/* Desktop Menu */}
          {!isMobile && (
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="border-none bg-transparent flex-1"
            />
          )}
        </div>

        <div className="flex items-center">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setIsDrawerVisible(true)}
              className="ml-4"
            />
          )}
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setIsDrawerVisible(false)}
          open={isDrawerVisible}
          width={250}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={() => setIsDrawerVisible(false)}
            className="border-none bg-transparent"
          />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
