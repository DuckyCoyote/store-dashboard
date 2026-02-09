import { useState, useRef, useEffect } from 'react';
import { User, Settings, LifeBuoy, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                   flex items-center justify-center text-white font-semibold text-sm lg:text-base 
                   hover:shadow-lg transition-shadow"
      >
        A
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 border 
                        border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                            flex items-center justify-center text-white font-semibold text-lg">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100">Admin User</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">admin@fashionstore.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 
                             dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Mi Perfil</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 
                             dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Configuración</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 
                             dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
              <LifeBuoy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Soporte</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-gray-50 
                       dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-300'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white mt-1 transition-transform ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </div>
            </button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 
                             dark:hover:bg-red-900/20 rounded-lg transition-colors text-left">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
