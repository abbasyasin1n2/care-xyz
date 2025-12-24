'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FiClock, FiCalendar } from 'react-icons/fi';

export default function DurationSelector({ durationType, duration, onDurationTypeChange, onDurationChange }) {
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
          onChange={(e) => onDurationChange(parseInt(e.target.value) || 1)}
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
