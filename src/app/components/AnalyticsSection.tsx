import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const salesByMonth = [
  { month: 'Ene', ventas: 4200, gastos: 2100, beneficio: 2100 },
  { month: 'Feb', ventas: 3800, gastos: 1900, beneficio: 1900 },
  { month: 'Mar', ventas: 5100, gastos: 2300, beneficio: 2800 },
  { month: 'Abr', ventas: 4600, gastos: 2200, beneficio: 2400 },
  { month: 'May', ventas: 6200, gastos: 2800, beneficio: 3400 },
  { month: 'Jun', ventas: 7100, gastos: 3200, beneficio: 3900 },
  { month: 'Jul', ventas: 6800, gastos: 3000, beneficio: 3800 },
];

const categoryData = [
  { name: 'Vestidos', value: 2400, color: '#6366f1' },
  { name: 'Pantalones', value: 1800, color: '#8b5cf6' },
  { name: 'Camisas', value: 1600, color: '#ec4899' },
  { name: 'Accesorios', value: 1200, color: '#f59e0b' },
  { name: 'Calzado', value: 900, color: '#10b981' },
];

const topProducts = [
  { name: 'Vestido Floral', ventas: 145, ingresos: 12999 },
  { name: 'Jeans Slim Fit', ventas: 156, ingresos: 10919 },
  { name: 'Chaqueta de Cuero', ventas: 94, ingresos: 15039 },
  { name: 'Pantalones Denim', ventas: 118, ingresos: 9439 },
  { name: 'Camisa Lino Blanca', ventas: 132, ingresos: 6068 },
];

const customerSegments = [
  { segment: 'VIP', clientes: 45, ingresos: 28500 },
  { segment: 'Regular', clientes: 134, ingresos: 18900 },
  { segment: 'Nuevos', clientes: 89, ingresos: 6839 },
];

export function AnalyticsSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">Análisis</h2>
        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
          Métricas y estadísticas detalladas
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tasa de Conversión</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">3.8%</p>
              <p className="text-xs text-green-600 dark:text-green-400">+0.5% este mes</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Valor Promedio</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">€95.50</p>
              <p className="text-xs text-green-600 dark:text-green-400">+€8.20</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Retención</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">68%</p>
              <p className="text-xs text-green-600 dark:text-green-400">+12%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Items por Pedido</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">2.3</p>
              <p className="text-xs text-red-600 dark:text-red-400">-0.2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ventas, Gastos y Beneficios
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="ventas" fill="#6366f1" name="Ventas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gastos" fill="#ef4444" name="Gastos" radius={[4, 4, 0, 0]} />
              <Bar dataKey="beneficio" fill="#10b981" name="Beneficio" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ventas por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products and Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Top Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Productos Más Rentables
          </h3>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 
                              dark:text-indigo-400 flex items-center justify-center font-semibold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{product.ventas} ventas</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">€{product.ingresos.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Segmentos de Clientes
          </h3>
          <div className="space-y-4">
            {customerSegments.map((segment) => (
              <div key={segment.segment} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{segment.segment}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    €{segment.ingresos.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        segment.segment === 'VIP' ? 'bg-purple-500' :
                        segment.segment === 'Regular' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(segment.clientes / 268) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{segment.clientes} clientes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
