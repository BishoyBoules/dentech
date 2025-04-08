import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import './App.css';

const AppContent = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4F46E5',
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </ConfigProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
