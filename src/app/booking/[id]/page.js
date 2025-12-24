import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import BookingForm from '@/components/booking/BookingForm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';
import { FiInfo } from 'react-icons/fi';

async function getService(id) {
  try {
    const { getServicesCollection } = await import('@/lib/mongodb');
    const { ObjectId } = await import('mongodb');
    const servicesCollection = await getServicesCollection();
    
    const service = await servicesCollection.findOne({ _id: new ObjectId(id) });
    
    if (!service) return null;
    
    return {
      ...service,
      _id: service._id.toString()
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = await getService(id);
  
  if (!service) {
    return {
      title: 'Service Not Found | Care.xyz',
    };
  }

  return {
    title: `Book ${service.name} | Care.xyz`,
    description: `Book professional ${service.name} service. Available 24/7 across Bangladesh.`,
  };
}

export default async function BookingPage({ params }) {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect('/login?callbackUrl=/booking/' + params.id);
  }

  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    redirect('/services');
  }

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
                  <BreadcrumbLink href="/services">Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/services/${service.slug}`}>{service.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Book Service</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Service Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-3 bg-blue-100 text-blue-800">
                      {service.category}
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Per Day:</span>
                        <span className="font-semibold text-blue-600">৳{service.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Per Hour:</span>
                        <span className="font-semibold text-green-600">৳{service.pricePerHour}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Alert>
                  <FiInfo className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Booking Information:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• All fields are required</li>
                      <li>• Payment on service delivery</li>
                      <li>• 24/7 customer support available</li>
                      <li>• You can manage bookings from dashboard</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Right Column - Booking Form */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Book Your Service
                  </h1>
                  <p className="text-gray-600">
                    Fill in the details below to book {service.name}. Our team will contact you shortly.
                  </p>
                </div>

                <BookingForm service={service} user={session.user} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
