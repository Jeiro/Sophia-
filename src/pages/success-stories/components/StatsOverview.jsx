import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      icon: 'Users',
      label: 'Success Stories',
      value: stats?.totalStories,
      color: 'text-primary'
    },
    {
      icon: 'TrendingUp',
      label: 'Average Growth',
      value: `${stats?.averageGrowth}%`,
      color: 'text-success'
    },
    {
      icon: 'DollarSign',
      label: 'Total Value Created',
      value: `$${stats?.totalValueCreated}M`,
      color: 'text-secondary'
    },
    {
      icon: 'Award',
      label: 'Client Satisfaction',
      value: `${stats?.satisfaction}%`,
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statItems?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{stat?.value}</p>
          <p className="text-sm text-muted-foreground">{stat?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;