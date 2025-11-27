import React from 'react';
import Button from '../../../components/UI/Button';

const TimeSlotSelector = ({ 
  selectedDate, 
  selectedTime, 
  onTimeSelect, 
  availableSlots = [] 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {availableSlots?.length === 0 ? (
        <div className="col-span-full text-center text-muted-foreground py-8">
          <p>No time slots available for this date</p>
        </div>
      ) : (
        availableSlots?.map((slot, index) => (
          <button
            key={index}
            onClick={() => slot?.available && onTimeSelect(slot?.time)}
            disabled={!slot?.available}
            className={`
              p-3 rounded-lg border-2 font-medium text-sm transition-all duration-300
              ${selectedTime === slot?.time
                ? 'border-primary bg-primary text-primary-foreground'
                : slot?.available
                ? 'border-border bg-background text-foreground hover:border-primary hover:bg-primary/5'
                : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            <div>{slot?.time}</div>
            {!slot?.available && (
              <div className="text-xs text-muted-foreground mt-1">Booked</div>
            )}
          </button>
        ))
      )}
    </div>
  );
};

export default TimeSlotSelector;
