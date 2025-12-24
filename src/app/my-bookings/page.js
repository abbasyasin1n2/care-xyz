import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import BookingCard from '@/components/booking/BookingCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

async function getUserBookings() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return [];

    const { getBookingsCollection } = await import('@/lib/mongodb');
    const bookingsCollection = await getBookingsCollection();
    
    const bookings = await bookingsCollection
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return bookings.map(booking => ({
      ...booking,
      _id: booking._id.toString()
    }));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export const metadata = {
  title: 'My Bookings | Care.xyz',
  description: 'View and manage your care service bookings',
};

export default async function MyBookingsPage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect('/login?callbackUrl=/my-bookings');
  }

  const bookings = await getUserBookings();

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Bookings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Header */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My Bookings
              </h1>
              <p className="text-lg text-gray-600">
                View and manage all your care service bookings
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiClock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{pendingBookings.length}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{confirmedBookings.length}</div>
                    <div className="text-sm text-gray-600">Confirmed</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiCalendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{completedBookings.length}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-red-50 to-white border-2 border-red-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FiXCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{cancelledBookings.length}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  All ({bookings.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({pendingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="confirmed">
                  Confirmed ({confirmedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledBookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {bookings.length === 0 ? (
                  <EmptyState />
                ) : (
                  bookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {pendingBookings.length === 0 ? (
                  <EmptyState message="No pending bookings" />
                ) : (
                  pendingBookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="confirmed" className="space-y-4">
                {confirmedBookings.length === 0 ? (
                  <EmptyState message="No confirmed bookings" />
                ) : (
                  confirmedBookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedBookings.length === 0 ? (
                  <EmptyState message="No completed bookings" />
                ) : (
                  completedBookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="space-y-4">
                {cancelledBookings.length === 0 ? (
                  <EmptyState message="No cancelled bookings" />
                ) : (
                  cancelledBookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

function EmptyState({ message = 'No bookings yet' }) {
  return (
    <Card className="p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <FiAlertCircle className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-600 mb-6">
        Start booking professional care services for your loved ones
      </p>
      <a
        href="/services"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-6"
      >
        Browse Services
      </a>
    </Card>
  );
}
