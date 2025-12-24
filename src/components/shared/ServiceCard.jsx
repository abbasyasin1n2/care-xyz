'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi';

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Badge className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700">
            {service.category}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{service.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <FiDollarSign className="mr-1 h-4 w-4" />
              <span className="font-semibold">৳{service.pricePerDay}</span>
              <span className="text-gray-500 ml-1">/day</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1 h-4 w-4" />
              <span className="font-semibold">৳{service.pricePerHour}</span>
              <span className="text-gray-500 ml-1">/hour</span>
            </div>
          </div>
          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/services/${service.slug}`} className="w-full">
            <Button className="w-full group">
              View Details
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
