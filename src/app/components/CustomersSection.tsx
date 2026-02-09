import { useState } from 'react';
import { Search, Mail, Phone, MapPin, ShoppingBag, TrendingUp, Users, UserPlus } from 'lucide-react';

const allCustomers = [
  {
    id: 1,
    name: 'María González',
    email: 'maria.g@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    orders: 12,
    totalSpent: 1245.89,
    lastOrder: '05 Feb 2026',
    status: 'vip',
    joinDate: 'Ene 2025'
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    email: 'carlos.r@email.com',
    phone: '+34 623 456 789',
    location: 'Barcelona, España',
    orders: 8,
    totalSpent: 789.45,
    lastOrder: '06 Feb 2026',
    status: 'regular',
    joinDate: 'Mar 2025'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.m@email.com',
    phone: '+34 634 567 890',
    location: 'Valencia, España',
    orders: 15,
    totalSpent: 1567.32,
    lastOrder: '06 Feb 2026',
    status: 'vip',
    joinDate: 'Dic 2024'
  },
  {
    id: 4,
    name: 'Jorge López',
    email: 'jorge.l@email.com',
    phone: '+34 645 678 901',
    location: 'Sevilla, España',
    orders: 5,
    totalSpent: 456.78,
    lastOrder: '07 Feb 2026',
    status: 'regular',
    joinDate: 'Jun 2025'
  },
  {
    id: 5,
    name: 'Laura Sánchez',
    email: 'laura.s@email.com',
    phone: '+34 656 789 012',
    location: 'Málaga, España',
    orders: 3,
    totalSpent: 234.56,
    lastOrder: '07 Feb 2026',
    status: 'new',
    joinDate: 'Ene 2026'
  },
  {
    id: 6,
    name: 'Pedro Gómez',
    email: 'pedro.g@email.com',
    phone: '+34 667 890 123',
    location: 'Bilbao, España',
    orders: 18,
    totalSpent: 2145.90,
    lastOrder: '07 Feb 2026',
    status: 'vip',
    joinDate: 'Oct 2024'
  },
  {
    id: 7,
    name: 'Isabel Fernández',
    email: 'isabel.f@email.com',
    phone: '+34 678 901 234',
    location: 'Zaragoza, España',
    orders: 6,
    totalSpent: 567.89,
    lastOrder: '06 Feb 2026',
    status: 'regular',
    joinDate: 'Abr 2025'
  },
  {
    id: 8,
    name: 'Roberto Torres',
    email: 'roberto.t@email.com',
    phone: '+34 689 012 345',
    location: 'Murcia, España',
    orders: 1,
    totalSpent: 69.99,
    lastOrder: '05 Feb 2026',
    status: 'new',
    joinDate: 'Feb 2026'
  },
];

const statusConfig = {
  vip: { label: 'VIP', color: 'bg-purple-50 text-purple-600' },
  regular: { label: 'Regular', color: 'bg-blue-50 text-blue-600' },
  new: { label: 'Nuevo', color: 'bg-green-50 text-green-600' },
};

export function CustomersSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalCustomers = allCustomers.length;
  const vipCustomers = allCustomers.filter(c => c.status === 'vip').length;
  const newCustomers = allCustomers.filter(c => c.status === 'new').length;
  const totalRevenue = allCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Clientes</h2>
          <p className="text-xs lg:text-sm text-gray-600 mt-1">Gestiona tus clientes y su información</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm lg:text-base">
          <UserPlus className="w-4 h-4" />
          Nuevo Cliente
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-2 lg:p-3 bg-indigo-50 rounded-lg">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Total Clientes</p>
              <p className="text-xl lg:text-2xl font-semibold text-gray-900">{totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-2 lg:p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Clientes VIP</p>
              <p className="text-xl lg:text-2xl font-semibold text-purple-600">{vipCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-2 lg:p-3 bg-green-50 rounded-lg">
              <UserPlus className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Nuevos (Este mes)</p>
              <p className="text-xl lg:text-2xl font-semibold text-green-600">{newCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-2 lg:p-3 bg-blue-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-xl lg:text-2xl font-semibold text-gray-900">€{totalRevenue.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200">
        <div className="flex flex-col gap-3 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
          >
            <option value="all">Todos los clientes</option>
            <option value="vip">VIP</option>
            <option value="regular">Regular</option>
            <option value="new">Nuevos</option>
          </select>
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCustomers.map((customer) => {
            const status = statusConfig[customer.status as keyof typeof statusConfig];
            
            return (
              <div key={customer.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <p className="text-sm text-gray-600">Cliente desde {customer.joinDate}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Pedidos</p>
                    <p className="text-lg font-semibold text-gray-900">{customer.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Total Gastado</p>
                    <p className="text-lg font-semibold text-gray-900">€{customer.totalSpent.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Último Pedido</p>
                    <p className="text-sm text-gray-700">{customer.lastOrder}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  );
}