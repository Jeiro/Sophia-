import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/Appicon';
import Button from '../../../components/UI/Button';

const StoryCard = ({ story, onViewDetails }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={story?.image}
          alt={story?.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
          <Icon name="TrendingUp" size={16} />
          <span>{story?.growthPercentage}%</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={story?.clientAvatar}
              alt={story?.clientAvatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{story?.clientName}</h3>
            <p className="text-sm text-muted-foreground">{story?.clientRole}</p>
          </div>
        </div>

        <p className="text-foreground mb-4 line-clamp-3">{story?.summary}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {story?.investmentTypes?.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Initial Investment</p>
            <p className="text-lg font-bold text-foreground">${story?.initialInvestment?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Value</p>
            <p className="text-lg font-bold text-success">${story?.currentValue?.toLocaleString()}</p>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onViewDetails(story)}
        >
          View Full Story
        </Button>
      </div>
    </div>
  );
};

export default StoryCard;