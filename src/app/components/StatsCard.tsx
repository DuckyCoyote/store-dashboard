import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">{title}</p>
          <p className="text-xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
          <p className={`text-xs lg:text-sm mt-2 truncate ${
            changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {change}
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 lg:p-3 rounded-lg flex-shrink-0 ml-2">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
    </div>
  );
}