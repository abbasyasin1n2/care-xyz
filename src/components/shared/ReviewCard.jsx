'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { FiStar } from 'react-icons/fi';
import { format } from 'date-fns';

export default function ReviewCard({ review, index }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={review.user_photoURL} alt={review.userName} />
              <AvatarFallback>{review.userName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              <p className="text-sm text-gray-500">{review.service_name}</p>
            </div>
          </div>
          <div className="flex items-center mb-3">
            {renderStars(review.ratings)}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {review.ratings.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-4">
            "{review.review}"
          </p>
          <p className="text-xs text-gray-400">
            {format(new Date(review.date), 'MMMM d, yyyy')}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
