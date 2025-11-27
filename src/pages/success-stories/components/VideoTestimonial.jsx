import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/Appicon';

const VideoTestimonial = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="relative h-64 overflow-hidden group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
        <Image
          src={testimonial?.thumbnail}
          alt={testimonial?.thumbnailAlt}
          className="w-full h-full object-cover"
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon name="Play" size={32} color="white" />
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
          <Icon name="Clock" size={14} />
          <span>{testimonial?.duration}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={testimonial?.clientAvatar}
              alt={testimonial?.clientAvatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground">{testimonial?.clientName}</h4>
            <p className="text-sm text-muted-foreground">{testimonial?.clientRole}</p>
          </div>
        </div>

        <p className="text-foreground mb-4">{testimonial?.quote}</p>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning fill-warning" />
            <span className="font-semibold text-foreground">{testimonial?.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{testimonial?.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonial;