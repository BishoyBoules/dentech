import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="fixed w-full z-10 px-4 md:px-6 bg-white shadow">
        <Navbar />
      </Header>
      <Content className="mt-16 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </Content>
      <Footer className="text-center bg-white">
        Truemedfin {new Date().getFullYear()} Created with care
      </Footer>
    </Layout>
  );
};

export default MainLayout;
