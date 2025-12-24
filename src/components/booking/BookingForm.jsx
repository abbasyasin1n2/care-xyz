'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import LocationSelector from './LocationSelector';
import DurationSelector from './DurationSelector';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function BookingForm({ service, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    location: {
      division: '',
      district: '',
      city: '',
      area: ''
    },
    durationType: 'days',
    duration: 1,
    address: ''
  });

  const calculateCost = () => {
    const price = formData.durationType === 'days' ? service.pricePerDay : service.pricePerHour;
    const validDuration = formData.duration === '' || formData.duration < 1 ? 1 : formData.duration;
    return price * validDuration;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.location.division || !formData.location.district || 
        !formData.location.city || !formData.location.area) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Location',
        text: 'Please select all location fields (Division, District, City, Area)',
      });
      return;
    }

    if (!formData.address.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Address Required',
        text: 'Please provide your detailed address',
      });
      return;
    }

    if (formData.duration === '' || formData.duration < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Duration',
        text: 'Duration must be at least 1',
      });
      return;
    }

    setLoading(true);

    try {
      const totalCost = calculateCost();
      
      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        location: formData.location,
        durationType: formData.durationType,
        duration: formData.duration,
        address: formData.address,
        totalCost,
        pricePerUnit: formData.durationType === 'days' ? service.pricePerDay : service.pricePerHour
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: `Your booking has been created successfully. Booking ID: ${data.booking._id}`,
        confirmButtonText: 'View My Bookings'
      });

      router.push('/my-bookings');
    } catch (error) {
      console.error('Booking error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiMapPin className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Service Location</h3>
        </div>
        <LocationSelector
          value={formData.location}
          onChange={(location) => setFormData({ ...formData, location })}
        />
      </Card>

      {/* Address */}
      <Card className="p-6">
        <div className="space-y-2">
          <Label htmlFor="address">Detailed Address *</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="House/Flat number, Road, Block, Landmarks, etc."
            rows={4}
            required
          />
          <p className="text-sm text-gray-500">
            Provide complete address details for accurate service delivery
          </p>
        </div>
      </Card>

      {/* Duration Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiClock className="h-5 w-5 text-green-600" />
          <h3 className="text-xl font-semibold">Service Duration</h3>
        </div>
        <DurationSelector
          durationType={formData.durationType}
          duration={formData.duration}
          onDurationTypeChange={(type) => setFormData({ ...formData, durationType: type })}
          onDurationChange={(dur) => setFormData({ ...formData, duration: dur })}
        />
      </Card>

      {/* Cost Summary */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <FiDollarSign className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Cost Summary</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Service:</span>
            <span className="font-medium">{service.name}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Rate:</span>
            <span className="font-medium">
              ৳{formData.durationType === 'days' ? service.pricePerDay : service.pricePerHour} 
              <span className="text-sm">/{formData.durationType === 'days' ? 'day' : 'hour'}</span>
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Duration:</span>
            <span className="font-medium">
              {formData.duration} {formData.durationType === 'days' ? 'day(s)' : 'hour(s)'}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Cost:</span>
            <span className="text-3xl font-bold text-blue-600">৳{calculateCost().toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full text-lg py-6" 
        disabled={loading}
      >
        {loading ? (
          <>Processing...</>
        ) : (
          <>
            <FiCalendar className="mr-2 h-5 w-5" />
            Confirm Booking
          </>
        )}
      </Button>
    </form>
  );
}
