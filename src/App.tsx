import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import { Navbar } from './components/Navbar';
import './App.css';

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#4F46E5',
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AppRoutes />
      </div>
    </ConfigProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
