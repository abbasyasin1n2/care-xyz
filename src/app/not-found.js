import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiHome, FiSearch } from 'react-icons/fi';

export const metadata = {
  title: '404 - Page Not Found | Care.xyz',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <FiHome className="mr-2 h-5 w-5" />
                Go to Homepage
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <FiSearch className="mr-2 h-5 w-5" />
                Browse Services
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              <span>•</span>
              <Link href="/services" className="text-blue-600 hover:underline">Services</Link>
              <span>•</span>
              <Link href="/about" className="text-blue-600 hover:underline">About</Link>
              <span>•</span>
              <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
