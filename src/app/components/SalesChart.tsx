import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ventas: 4200, pedidos: 24 },
  { name: 'Feb', ventas: 3800, pedidos: 21 },
  { name: 'Mar', ventas: 5100, pedidos: 32 },
  { name: 'Abr', ventas: 4600, pedidos: 28 },
  { name: 'May', ventas: 6200, pedidos: 38 },
  { name: 'Jun', ventas: 7100, pedidos: 43 },
  { name: 'Jul', ventas: 6800, pedidos: 41 },
];

export function SalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100">Ventas Mensuales</h3>
        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Evolución de ventas en los últimos 7 meses</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="ventas" 
            stroke="#6366f1" 
            strokeWidth={2}
            fill="url(#colorVentas)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}