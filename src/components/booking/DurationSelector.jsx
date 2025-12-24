'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FiClock, FiCalendar } from 'react-icons/fi';

export default function DurationSelector({ durationType, duration, onDurationTypeChange, onDurationChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // Allow empty string temporarily while typing
    if (value === '') {
      onDurationChange('');
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onDurationChange(numValue);
    }
  };

  const handleBlur = (e) => {
    // If empty or invalid, reset to 1
    const value = e.target.value;
    if (value === '' || parseInt(value) < 1) {
      onDurationChange(1);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">Duration Type *</Label>
        <ToggleGroup 
          type="single" 
          value={durationType} 
          onValueChange={onDurationTypeChange}
          className="justify-start"
        >
          <ToggleGroupItem value="days" className="flex-1 sm:flex-none">
            <FiCalendar className="mr-2 h-4 w-4" />
            Days
          </ToggleGroupItem>
          <ToggleGroupItem value="hours" className="flex-1 sm:flex-none">
            <FiClock className="mr-2 h-4 w-4" />
            Hours
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">
          {durationType === 'days' ? 'Number of Days' : 'Number of Hours'} *
        </Label>
        <Input
          id="duration"
          type="number"
          min="1"
          max={durationType === 'days' ? 365 : 24}
          value={duration}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={durationType === 'days' ? 'Enter number of days' : 'Enter number of hours'}
          className="text-lg"
        />
        <p className="text-sm text-gray-500">
          {durationType === 'days' 
            ? 'Maximum 365 days' 
            : 'Maximum 24 hours (for longer durations, use days)'}
        </p>
      </div>
    </div>
  );
}
