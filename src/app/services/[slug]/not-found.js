import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

export default function ServiceNotFound() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <FiAlertCircle className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            The service you're looking for doesn't exist or has been removed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="w-full sm:w-auto">
                <FiArrowLeft className="mr-2" />
                Browse All Services
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
