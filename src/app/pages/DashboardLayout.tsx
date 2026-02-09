import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { UserDropdown } from '../components/UserDropdown';
import { Menu, Search } from 'lucide-react';

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();

  const getSectionTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/orders': return 'Pedidos';
      case '/products': return 'Productos';
      case '/customers': return 'Clientes';
      case '/analytics': return 'Análisis';
      case '/settings': return 'Configuración';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 w-full lg:w-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {getSectionTitle()}
                </h2>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1 hidden sm:block">
                  Bienvenido de nuevo, Admin
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <SearchBar />
              </div>
              
              {/* Mobile Search Button */}
              <button 
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <NotificationsPanel />
              <UserDropdown />
            </div>
          </div>

          {/* Mobile Search */}
          {showMobileSearch && (
            <div className="mt-4 md:hidden">
              <SearchBar />
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
