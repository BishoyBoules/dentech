import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../context/ThemeContext';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <Layout className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header className="fixed w-full z-10 px-4 md:px-6 bg-white dark:bg-gray-800 shadow">
        <Navbar />
      </Header>
      <Content className="mt-16 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </Content>
      <Footer className="text-center bg-white dark:bg-gray-800 dark:text-white">
        TruMedFin ©{new Date().getFullYear()} Created with care
      </Footer>
    </Layout>
  );
};

export default MainLayout;
