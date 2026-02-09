import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const orders = [
  {
    id: '#ORD-1234',
    customer: 'María González',
    product: 'Vestido Floral',
    amount: '€89.99',
    status: 'delivered',
    date: '05 Feb 2026'
  },
  {
    id: '#ORD-1235',
    customer: 'Carlos Ruiz',
    product: 'Camisa Lino Blanca',
    amount: '€45.99',
    status: 'processing',
    date: '06 Feb 2026'
  },
  {
    id: '#ORD-1236',
    customer: 'Ana Martínez',
    product: 'Pantalones Denim',
    amount: '€79.99',
    status: 'delivered',
    date: '06 Feb 2026'
  },
  {
    id: '#ORD-1237',
    customer: 'Jorge López',
    product: 'Chaqueta de Cuero',
    amount: '€159.99',
    status: 'pending',
    date: '07 Feb 2026'
  },
  {
    id: '#ORD-1238',
    customer: 'Laura Sánchez',
    product: 'Falda Plisada',
    amount: '€54.99',
    status: 'delivered',
    date: '07 Feb 2026'
  },
];

const statusConfig = {
  delivered: { label: 'Entregado', color: 'text-green-600 bg-green-50', icon: CheckCircle },
  processing: { label: 'Procesando', color: 'text-blue-600 bg-blue-50', icon: Package },
  pending: { label: 'Pendiente', color: 'text-orange-600 bg-orange-50', icon: Clock },
  cancelled: { label: 'Cancelado', color: 'text-red-600 bg-red-50', icon: XCircle },
};

export function RecentOrders() {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200">
      <div className="mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Pedidos Recientes</h3>
        <p className="text-xs lg:text-sm text-gray-600">Últimos pedidos realizados</p>
      </div>
      
      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-3">
        {orders.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          
          return (
            <div key={order.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 text-sm">{order.id}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{order.customer}</p>
              <p className="text-xs text-gray-600 mb-2">{order.product}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{order.amount}</span>
                <span className="text-xs text-gray-600">{order.date}</span>
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
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Cliente</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Producto</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Monto</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Estado</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-4 text-gray-700">{order.customer}</td>
                  <td className="py-4 px-4 text-gray-700">{order.product}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{order.amount}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-sm">{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}