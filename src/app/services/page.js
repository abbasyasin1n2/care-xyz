import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ServiceCard from '@/components/shared/ServiceCard';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Our Services | Care.xyz - Professional Care Services in Bangladesh',
  description: 'Browse our comprehensive range of professional care services including baby care, elderly care, nursing care, and special needs support across Bangladesh.',
};

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return data.services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

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
                  <BreadcrumbPage>Services</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Header */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                Our Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Care Services
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer comprehensive care solutions tailored to meet the unique needs of your family members. 
                All our caregivers are professionally trained, verified, and available 24/7 across Bangladesh.
              </p>
            </div>

            {/* Services Count */}
            <div className="mb-8">
              <p className="text-center text-gray-600">
                Showing <span className="font-semibold text-gray-900">{services.length}</span> professional care services
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">Please check back later or contact support.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
