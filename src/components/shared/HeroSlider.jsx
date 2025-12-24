'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion } from 'motion/react';
import Autoplay from 'embla-carousel-autoplay';
import { FiArrowRight } from 'react-icons/fi';

const slides = [
  {
    image: '/assets/Nursing-care-slider1.jpg',
    title: 'Professional Home Nursing Care',
    description: 'Expert nursing services for chronic diseases and specialized patient care at home',
    link: '/services/home-nursing-service'
  },
  {
    image: '/assets/Care-for-Special-Children-silder2.jpg',
    title: 'Special Needs Child Care',
    description: 'Compassionate support for children with developmental delays and special needs',
    link: '/services/special-needs-child-care'
  },
  {
    image: '/assets/Elder-care-slider3.jpeg',
    title: 'Elderly Companion Care',
    description: 'Dedicated care and attention for your elderly family members',
    link: '/services/elderly-companion-care'
  },
  {
    image: '/assets/Post-operative Patients-slider4.jpg',
    title: 'Post-Operative Care',
    description: 'Specialized recovery support after surgery with professional supervision',
    link: '/services/post-operative-care'
  },
  {
    image: '/assets/Adults-with-Disabilities-Service-slider5.png',
    title: 'Adults with Disabilities Care',
    description: 'Empowering care services supporting daily living and independence',
    link: '/services/adults-with-disabilities'
  }
];

export default function HeroSlider() {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover brightness-75"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="max-w-2xl text-white"
                    >
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl mb-8 text-gray-200">
                        {slide.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Link href={slide.link}>
                          <Button size="lg" className="group">
                            Learn More
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link href="/services">
                          <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30">
                            All Services
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
