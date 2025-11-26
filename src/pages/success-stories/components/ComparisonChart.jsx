import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparisonChart = ({ data }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-foreground mb-6">Portfolio Growth Comparison</h3>
      <div className="w-full h-80" aria-label="Portfolio Growth Comparison Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="initial" 
              fill="var(--color-muted)" 
              name="Initial Investment"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="current" 
              fill="var(--color-success)" 
              name="Current Value"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;