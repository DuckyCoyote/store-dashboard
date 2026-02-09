import { useState, useRef, useEffect } from 'react';
import { Bell, Package, ShoppingCart, Users, CheckCheck, X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Nuevo pedido recibido',
    message: 'Pedido #ORD-1242 de María González',
    time: 'Hace 5 min',
    read: false,
    icon: ShoppingCart
  },
  {
    id: 2,
    type: 'product',
    title: 'Stock bajo',
    message: 'Zapatos Deportivos tiene menos de 5 unidades',
    time: 'Hace 1 hora',
    read: false,
    icon: Package
  },
  {
    id: 3,
    type: 'customer',
    title: 'Nuevo cliente registrado',
    message: 'Alberto Fernández se ha registrado',
    time: 'Hace 2 horas',
    read: true,
    icon: Users
  },
  {
    id: 4,
    type: 'order',
    title: 'Pedido completado',
    message: 'Pedido #ORD-1240 ha sido entregado',
    time: 'Hace 3 horas',
    read: true,
    icon: ShoppingCart
  },
  {
    id: 5,
    type: 'product',
    title: 'Producto agotado',
    message: 'Chaqueta de Cuero está sin stock',
    time: 'Hace 5 horas',
    read: true,
    icon: Package
  },
];

export function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const unreadCount = notificationList.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotificationList(notificationList.filter(n => n.id !== id));
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 
                        max-h-[32rem] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notificaciones</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {unreadCount} {unreadCount === 1 ? 'nueva' : 'nuevas'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 
                         dark:hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <CheckCheck className="w-4 h-4" />
                Marcar todas
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notificationList.length > 0 ? (
              notificationList.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 
                              dark:hover:bg-gray-700/50 transition-colors relative group ${
                      !notification.read ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === 'order' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                        notification.type === 'product' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                        'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {notification.title}
                          </p>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 
                                     hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          >
                            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-indigo-600 absolute top-4 right-4"></div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">No hay notificaciones</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notificationList.length > 0 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 
                               hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
