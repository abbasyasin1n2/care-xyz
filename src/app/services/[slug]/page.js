import { notFound } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiDollarSign, FiCheckCircle, FiCalendar, FiArrowRight } from 'react-icons/fi';

async function getService(slug) {
  try {
    // Direct database query for server component
    const { getServicesCollection } = await import('@/lib/mongodb');
    const servicesCollection = await getServicesCollection();
    const service = await servicesCollection.findOne({ slug });
    
    if (!service) return null;
    
    // Convert MongoDB _id to string
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
  const { slug } = await params;
  const service = await getService(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | Care.xyz',
    };
  }

  return {
    title: `${service.name} | Care.xyz - Professional Care Services`,
    description: service.description,
    keywords: `${service.name}, ${service.category}, care services, Bangladesh, ${service.slug}`,
    openGraph: {
      title: `${service.name} - Care.xyz`,
      description: service.description,
      url: `https://carexyz.vercel.app/services/${service.slug}`,
      siteName: 'Care.xyz',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} - Care.xyz`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
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
                  <BreadcrumbPage>{service.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Service Detail */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiClock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Available</div>
                        <div className="font-semibold text-gray-900">24/7</div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Status</div>
                        <div className="font-semibold text-green-600">Available</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-3 bg-blue-100 text-blue-800">
                    Professional Care
                  </Badge>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {service.name}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <Separator />

                {/* Pricing */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiDollarSign className="h-5 w-5 text-blue-600" />
                    Pricing
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                      <div className="text-sm text-gray-600 mb-2">Per Day</div>
                      <div className="text-3xl font-bold text-blue-600">৳{service.pricePerDay}</div>
                      <div className="text-sm text-gray-500 mt-1">24 hours coverage</div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
                      <div className="text-sm text-gray-600 mb-2">Per Hour</div>
                      <div className="text-3xl font-bold text-green-600">৳{service.pricePerHour}</div>
                      <div className="text-sm text-gray-500 mt-1">Flexible timing</div>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                    What's Included
                  </h3>
                  <div className="grid gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* CTA */}
                <div className="space-y-4">
                  <Link href={`/booking/${service._id}`}>
                    <Button size="lg" className="w-full group text-lg py-6">
                      <FiCalendar className="mr-2 h-5 w-5" />
                      Book This Service Now
                      <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <p className="text-center text-sm text-gray-500">
                    Secure booking • Verified professionals • 24/7 support
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16">
              <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-blue-100">Verified Caregivers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-blue-100">Customer Support</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">8</div>
                    <div className="text-blue-100">Divisions Covered</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
