import { useState } from 'react';
import { Search, Filter, Download, Eye, MoreVertical, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

const allOrders = [
  {
    id: '#ORD-1234',
    customer: 'María González',
    email: 'maria.g@email.com',
    products: ['Vestido Floral', 'Bolso Cuero'],
    items: 2,
    amount: 139.98,
    status: 'delivered',
    date: '05 Feb 2026',
    payment: 'Tarjeta'
  },
  {
    id: '#ORD-1235',
    customer: 'Carlos Ruiz',
    email: 'carlos.r@email.com',
    products: ['Camisa Lino Blanca'],
    items: 1,
    amount: 45.99,
    status: 'processing',
    date: '06 Feb 2026',
    payment: 'PayPal'
  },
  {
    id: '#ORD-1236',
    customer: 'Ana Martínez',
    email: 'ana.m@email.com',
    products: ['Pantalones Denim', 'Cinturón'],
    items: 2,
    amount: 89.98,
    status: 'delivered',
    date: '06 Feb 2026',
    payment: 'Tarjeta'
  },
  {
    id: '#ORD-1237',
    customer: 'Jorge López',
    email: 'jorge.l@email.com',
    products: ['Chaqueta de Cuero'],
    items: 1,
    amount: 159.99,
    status: 'pending',
    date: '07 Feb 2026',
    payment: 'Transferencia'
  },
  {
    id: '#ORD-1238',
    customer: 'Laura Sánchez',
    email: 'laura.s@email.com',
    products: ['Falda Plisada', 'Blusa Seda'],
    items: 2,
    amount: 94.98,
    status: 'delivered',
    date: '07 Feb 2026',
    payment: 'Tarjeta'
  },
  {
    id: '#ORD-1239',
    customer: 'Pedro Gómez',
    email: 'pedro.g@email.com',
    products: ['Zapatos Deportivos'],
    items: 1,
    amount: 79.99,
    status: 'processing',
    date: '07 Feb 2026',
    payment: 'PayPal'
  },
  {
    id: '#ORD-1240',
    customer: 'Isabel Fernández',
    email: 'isabel.f@email.com',
    products: ['Abrigo Lana', 'Bufanda'],
    items: 2,
    amount: 189.98,
    status: 'cancelled',
    date: '06 Feb 2026',
    payment: 'Tarjeta'
  },
  {
    id: '#ORD-1241',
    customer: 'Roberto Torres',
    email: 'roberto.t@email.com',
    products: ['Jeans Slim Fit'],
    items: 1,
    amount: 69.99,
    status: 'delivered',
    date: '05 Feb 2026',
    payment: 'Transferencia'
  },
];

const statusConfig = {
  delivered: { label: 'Entregado', color: 'text-green-600 bg-green-50', icon: CheckCircle },
  processing: { label: 'Procesando', color: 'text-blue-600 bg-blue-50', icon: Package },
  pending: { label: 'Pendiente', color: 'text-orange-600 bg-orange-50', icon: Clock },
  cancelled: { label: 'Cancelado', color: 'text-red-600 bg-red-50', icon: XCircle },
};

export function OrdersSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Pedidos</h2>
          <p className="text-xs lg:text-sm text-gray-600 mt-1">Gestiona todos los pedidos de la tienda</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm lg:text-base">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Total Pedidos</p>
          <p className="text-xl lg:text-2xl font-semibold text-gray-900 mt-1">{allOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Entregados</p>
          <p className="text-xl lg:text-2xl font-semibold text-green-600 mt-1">
            {allOrders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">En Proceso</p>
          <p className="text-xl lg:text-2xl font-semibold text-blue-600 mt-1">
            {allOrders.filter(o => o.status === 'processing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Pendientes</p>
          <p className="text-xl lg:text-2xl font-semibold text-orange-600 mt-1">
            {allOrders.filter(o => o.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200">
        <div className="flex flex-col gap-3 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, cliente o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
            >
              <option value="all">Todos los estados</option>
              <option value="delivered">Entregados</option>
              <option value="processing">Procesando</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>

        {/* Mobile View - Cards */}
        <div className="lg:hidden space-y-3">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-indigo-600 text-sm mb-1">{order.id}</p>
                    <p className="font-medium text-gray-900 text-sm">{order.customer}</p>
                    <p className="text-xs text-gray-600">{order.email}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color} flex-shrink-0 ml-2`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{order.products.join(', ')}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">{order.items} items</p>
                    <p className="font-semibold text-gray-900">€{order.amount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{order.date}</p>
                    <p className="text-xs text-gray-600">{order.payment}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View - Table */}
        <div className="overflow-x-auto hidden lg:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">ID Pedido</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Cliente</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Productos</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Items</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Monto</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Pago</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                
                return (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-indigo-600">{order.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-700 text-sm">{order.products.join(', ')}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{order.items}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">€{order.amount.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{order.date}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{order.payment}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Ver detalles">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Más opciones">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No se encontraron pedidos</p>
          </div>
        )}
      </div>
    </div>
  );
}