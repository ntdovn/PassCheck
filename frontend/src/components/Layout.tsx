import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Lock, Key, AlertCircle, Home } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Kiểm tra mật khẩu', href: '/checker', icon: Lock },
    { name: 'Tạo mật khẩu', href: '/generator', icon: Key },
    { name: 'Kiểm tra rò rỉ', href: '/breach', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-soft border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Shield className="h-8 w-8 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PassCheck</span>
            </Link>
            
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 shadow-soft'
                        : 'text-gray-600 hover:bg-white/50 hover:text-purple-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/70 backdrop-blur-md border-b border-purple-100">
        <div className="flex overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center min-w-fit px-6 py-3 transition-all duration-300 ${
                  isActive
                    ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50/50'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-md border-t border-purple-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm font-bold text-gray-700">
              © 2025 PassCheck - Created by Carter Fill
            </p>
            <p className="text-xs mt-1 text-gray-600">
              Công cụ kiểm tra và tạo mật khẩu an toàn
            </p>
            <p className="text-xs mt-2 text-gray-500">
              🔐 Bảo mật thông tin của bạn là ưu tiên hàng đầu ❤️
            </p>
            <p className="text-xs mt-3 text-purple-600 font-medium">
              Made with ❤️ by Carter Fill | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
