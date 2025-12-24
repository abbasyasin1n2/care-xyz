import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroSlider from '@/components/shared/HeroSlider';
import ServiceCard from '@/components/shared/ServiceCard';
import ReviewCard from '@/components/shared/ReviewCard';
import WhyChooseUs from '@/components/shared/WhyChooseUs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FiUsers, FiAward, FiStar, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'Care.xyz - Professional Baby Sitting & Elderly Care Services in Bangladesh',
  description: 'Find trusted and reliable care services for children, elderly, and special needs family members. Book professional caregivers across all 8 divisions of Bangladesh with flexible scheduling, affordable rates, and 24/7 availability. Verified caregivers for baby sitting, home nursing, elderly care, and disability support.',
  keywords: 'baby sitting Bangladesh, elderly care services, home nursing, special needs care, professional caregivers, child care Dhaka, senior care, patient care at home, disability care, verified caregivers Bangladesh, 24/7 care services',
  authors: [{ name: 'Care.xyz' }],
  creator: 'Care.xyz',
  publisher: 'Care.xyz',
  metadataBase: new URL('https://carexyz.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Care.xyz - Professional Baby Sitting & Elderly Care Services in Bangladesh',
    description: 'Trusted and verified care services for your loved ones. Professional caregivers available across all divisions of Bangladesh. Baby sitting, elderly care, home nursing, and special needs support with flexible scheduling and affordable rates.',
    url: 'https://carexyz.vercel.app',
    siteName: 'Care.xyz',
    images: [
      {
        url: 'https://i.ibb.co.com/7dyMfvwb/Screenshot-2025-12-24-142349.png',
        width: 1200,
        height: 630,
        alt: 'Care.xyz - Professional Baby Sitting & Elderly Care Services in Bangladesh',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Care.xyz - Professional Care Services in Bangladesh',
    description: 'Trusted care services for children, elderly & special needs. Verified caregivers across Bangladesh with 24/7 availability.',
    images: ['https://i.ibb.co.com/7dyMfvwb/Screenshot-2025-12-24-142349.png'],
    creator: '@carexyz',
    site: '@carexyz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
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

async function getReviews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    return data.reviews || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export default async function Home() {
  const services = await getServices();
  const reviews = await getReviews();

  const stats = [
    { icon: FiUsers, value: '5000+', label: 'Happy Families', color: 'text-blue-600' },
    { icon: FiAward, value: '100+', label: 'Professional Caregivers', color: 'text-green-600' },
    { icon: FiStar, value: '4.8', label: 'Average Rating', color: 'text-yellow-600' },
    { icon: FiTrendingUp, value: '98%', label: 'Success Rate', color: 'text-purple-600' }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                About Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Reliable & Trusted Care Services in Bangladesh
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Care.xyz is dedicated to providing professional and compassionate care services for your loved ones. 
                We understand the importance of quality care and ensure that every family member receives the attention 
                and support they deserve.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our mission is to make caregiving easy, secure, and accessible for everyone in Bangladesh. 
                With our team of verified and trained professionals, we bring peace of mind to families across the country.
              </p>
              <Link href="/about">
                <Button size="lg" className="group">
                  Learn More About Us
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-600 text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">7+</div>
                  <div className="text-blue-100">Care Services</div>
                </div>
                <div className="bg-green-600 text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-green-100">Available</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-purple-600 text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-purple-100">Verified</div>
                </div>
                <div className="bg-orange-600 text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">8</div>
                  <div className="text-orange-100">Divisions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Care Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of care services tailored to meet the unique needs of your family members
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" className="group">
                View All Services
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from families who trust us with their loved ones
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 6).map((review, index) => (
              <ReviewCard key={review._id} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a care service today and give your loved ones the care they deserve
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services">
              <Button size="lg" variant="secondary" className="group">
                Browse Services
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
