import { TrendingUp } from 'lucide-react';

const products = [
  { name: 'Vestido Floral', sales: 145, revenue: '€12,999', trend: '+12%' },
  { name: 'Camisa Lino Blanca', sales: 132, revenue: '€6,068', trend: '+8%' },
  { name: 'Pantalones Denim', sales: 118, revenue: '€9,439', trend: '+15%' },
  { name: 'Chaqueta de Cuero', sales: 94, revenue: '€15,039', trend: '+22%' },
  { name: 'Falda Plisada', sales: 87, revenue: '€4,784', trend: '+5%' },
];

export function TopProducts() {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200">
      <div className="mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
        <p className="text-xs lg:text-sm text-gray-600">Top 5 productos del mes</p>
      </div>
      
      <div className="space-y-3 lg:space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center gap-3 lg:gap-4">
            <div className="flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs lg:text-sm flex-shrink-0">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{product.name}</p>
              <p className="text-xs lg:text-sm text-gray-600">{product.sales} ventas</p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-gray-900 text-sm lg:text-base">{product.revenue}</p>
              <p className="text-xs lg:text-sm text-green-600 flex items-center justify-end gap-1">
                <TrendingUp className="w-3 lg:w-3.5 h-3 lg:h-3.5" />
                {product.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}