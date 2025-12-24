'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { FiCheckCircle, FiShield, FiClock, FiHeart } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Trusted Professionals',
    description: 'All our caregivers are verified, trained, and experienced professionals'
  },
  {
    icon: FiClock,
    title: '24/7 Availability',
    description: 'Round-the-clock care services available whenever you need them'
  },
  {
    icon: FiCheckCircle,
    title: 'Quality Assured',
    description: 'We maintain the highest standards of care and professionalism'
  },
  {
    icon: FiHeart,
    title: 'Compassionate Care',
    description: 'We treat your loved ones with the care and respect they deserve'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Care<span className="text-blue-600">.xyz</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best care services in Bangladesh with professionalism, compassion, and reliability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/assets/Why-Should-You-Choose-Us.jpg"
              alt="Why Choose Us"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
