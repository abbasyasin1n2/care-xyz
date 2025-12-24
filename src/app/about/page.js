import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { FiShield, FiUsers, FiHeart, FiAward, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';

export const metadata = {
  title: 'About Us | Care.xyz - Professional Care Services in Bangladesh',
  description: 'Learn about Care.xyz, Bangladesh\'s trusted platform for professional baby sitting and elderly care services. Our mission is to provide quality, compassionate care.',
};

export default function AboutPage() {
  const features = [
    {
      icon: FiShield,
      title: 'Verified Professionals',
      description: 'All our caregivers undergo thorough background checks and verification to ensure your family\'s safety.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FiUsers,
      title: '24/7 Availability',
      description: 'Round-the-clock service availability across all divisions in Bangladesh. We\'re here when you need us.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: FiHeart,
      title: 'Compassionate Care',
      description: 'We understand the importance of quality care and ensure every family member receives personalized attention.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: FiAward,
      title: 'Quality Assured',
      description: 'Regular training and monitoring of our caregivers to maintain the highest standards of service quality.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const values = [
    'Professionalism and Excellence',
    'Compassion and Empathy',
    'Safety and Security',
    'Trust and Transparency',
    'Continuous Improvement',
    'Customer Satisfaction'
  ];

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
                  <BreadcrumbPage>About</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                About Care.xyz
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Bringing Professional Care to Every Home
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Care.xyz is Bangladesh's leading platform for professional care services, dedicated to making quality 
                caregiving accessible, secure, and reliable for families across the nation.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide compassionate, professional, and reliable care services that bring peace of mind to families 
                  throughout Bangladesh. We strive to connect families with verified, trained caregivers who treat every 
                  client with dignity, respect, and the highest standard of care.
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted care service platform in Bangladesh, setting new standards for quality, 
                  professionalism, and compassion. We envision a future where every family has access to affordable, 
                  professional care that enhances the quality of life for their loved ones.
                </p>
              </Card>
            </div>

            {/* Features */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Care.xyz?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We're committed to excellence in every aspect of our service
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Our Values */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  These principles guide everything we do at Care.xyz
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">5000+</div>
                  <div className="text-blue-100">Happy Families</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-blue-100">Verified Caregivers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">8</div>
                  <div className="text-blue-100">Divisions Covered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">4.8★</div>
                  <div className="text-blue-100">Average Rating</div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
