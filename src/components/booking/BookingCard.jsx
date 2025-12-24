'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function BookingCard({ booking }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleCancelBooking = async () => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Cancel It',
      cancelButtonText: 'No, Keep It'
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel booking');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Booking Cancelled',
        text: 'Your booking has been cancelled successfully.',
        confirmButtonText: 'OK'
      });

      router.refresh();
    } catch (error) {
      console.error('Cancel error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Cancellation Failed',
        text: error.message || 'Failed to cancel booking. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{booking.serviceName}</h3>
              <Badge className={`${getStatusColor(booking.status)} border`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Booking ID: {booking._id}
            </p>
          </div>
          {booking.status === 'pending' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancelBooking}
              disabled={loading}
            >
              <FiTrash2 className="mr-2 h-4 w-4" />
              {loading ? 'Cancelling...' : 'Cancel'}
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FiMapPin className="h-4 w-4 text-blue-600" />
              Service Location
            </div>
            <div className="text-sm text-gray-600 pl-6">
              <div>{booking.location.area}, {booking.location.city}</div>
              <div>{booking.location.district}, {booking.location.division}</div>
              {booking.address && (
                <div className="mt-1 text-xs text-gray-500">{booking.address}</div>
              )}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FiClock className="h-4 w-4 text-green-600" />
              Duration
            </div>
            <div className="text-sm text-gray-600 pl-6">
              {booking.duration} {booking.durationType === 'days' ? 'Day(s)' : 'Hour(s)'}
            </div>
          </div>

          {/* Cost */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FiDollarSign className="h-4 w-4 text-purple-600" />
              Total Cost
            </div>
            <div className="text-lg font-bold text-purple-600 pl-6">
              ৳{booking.totalCost.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 pl-6">
              @ ৳{booking.pricePerUnit}/{booking.durationType === 'days' ? 'day' : 'hour'}
            </div>
          </div>

          {/* Booking Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FiCalendar className="h-4 w-4 text-orange-600" />
              Booked On
            </div>
            <div className="text-sm text-gray-600 pl-6">
              {format(new Date(booking.createdAt), 'PPP')}
              <div className="text-xs text-gray-500">
                {format(new Date(booking.createdAt), 'p')}
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {booking.status === 'pending' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Pending:</strong> Your booking is being processed. Our team will contact you shortly to confirm.
            </p>
          </div>
        )}

        {booking.status === 'confirmed' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Confirmed:</strong> Your booking is confirmed! Our caregiver will arrive at the scheduled time.
            </p>
          </div>
        )}

        {booking.status === 'completed' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Completed:</strong> Thank you for using Care.xyz! We hope you had a great experience.
            </p>
          </div>
        )}

        {booking.status === 'cancelled' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Cancelled:</strong> This booking has been cancelled.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
