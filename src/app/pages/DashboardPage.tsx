import { StatsCard } from '../components/StatsCard';
import { SalesChart } from '../components/SalesChart';
import { RecentOrders } from '../components/RecentOrders';
import { TopProducts } from '../components/TopProducts';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

export function DashboardPage() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatsCard
          title="Ingresos Totales"
          value="€54,239"
          change="+12.5% desde el mes pasado"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos"
          value="1,284"
          change="+8.2% desde el mes pasado"
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Productos"
          value="342"
          change="+23 nuevos productos"
          changeType="positive"
          icon={Package}
        />
        <StatsCard
          title="Clientes"
          value="2,847"
          change="+15.3% desde el mes pasado"
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </>
  );
}
