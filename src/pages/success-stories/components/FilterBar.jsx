import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  const investmentTypeOptions = [
    { value: 'all', label: 'All Investment Types' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'diversified', label: 'Diversified Portfolio' }
  ];

  const growthRangeOptions = [
    { value: 'all', label: 'All Growth Ranges' },
    { value: '0-50', label: '0% - 50%' },
    { value: '50-100', label: '50% - 100%' },
    { value: '100-200', label: '100% - 200%' },
    { value: '200+', label: '200%+' }
  ];

  const timeframeOptions = [
    { value: 'all', label: 'All Timeframes' },
    { value: '6-months', label: '6 Months' },
    { value: '1-year', label: '1 Year' },
    { value: '2-years', label: '2 Years' },
    { value: '3-years', label: '3+ Years' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Select
          label="Investment Type"
          options={investmentTypeOptions}
          value={filters?.investmentType}
          onChange={(value) => onFilterChange('investmentType', value)}
        />

        <Select
          label="Growth Range"
          options={growthRangeOptions}
          value={filters?.growthRange}
          onChange={(value) => onFilterChange('growthRange', value)}
        />

        <Select
          label="Timeframe"
          options={timeframeOptions}
          value={filters?.timeframe}
          onChange={(value) => onFilterChange('timeframe', value)}
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            fullWidth
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;