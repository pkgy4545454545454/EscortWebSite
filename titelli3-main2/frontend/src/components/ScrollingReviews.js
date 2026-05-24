import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

// Sample reviews data - In production, this would come from API
const sampleReviews = [
  {
    id: 1,
    author: 'Marie D.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Service exceptionnel ! L\'équipe était très professionnelle et à l\'écoute. Je recommande vivement.',
    date: '15 Jan 2026',
    enterprise: 'Spa Luxury Lausanne'
  },
  {
    id: 2,
    author: 'Pierre M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Très satisfait de mon achat. Qualité au rendez-vous et livraison rapide. Parfait !',
    date: '12 Jan 2026',
    enterprise: 'Boutique Élégance'
  },
  {
    id: 3,
    author: 'Sophie L.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 4,
    text: 'Excellente expérience. Le personnel est accueillant et les prestations sont de qualité.',
    date: '10 Jan 2026',
    enterprise: 'Restaurant Le Gourmet'
  },
  {
    id: 4,
    author: 'Thomas R.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Je suis client régulier et je n\'ai jamais été déçu. Un service client irréprochable.',
    date: '8 Jan 2026',
    enterprise: 'Coiffure Prestige'
  },
  {
    id: 5,
    author: 'Emma B.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    rating: 5,
    text: 'La plateforme Titelli m\'a permis de découvrir de superbes prestataires locaux. Merci !',
    date: '5 Jan 2026',
    enterprise: 'Fitness Premium'
  },
  {
    id: 6,
    author: 'Lucas F.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4,
    text: 'Très bon rapport qualité-prix. Je reviendrai sans hésitation.',
    date: '3 Jan 2026',
    enterprise: 'Auto Service Pro'
  }
];

const ReviewCard = ({ review }) => (
  <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-3 sm:p-5 min-w-[260px] sm:min-w-[320px] max-w-[260px] sm:max-w-[320px]" data-testid={`review-card-${review.id}`}>
    <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
      <img 
        src={review.avatar} 
        alt={review.author}
        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${review.author}&background=0047AB&color=fff`; }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-gray-900 font-semibold text-xs sm:text-base truncate">{review.author}</h4>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
        <p className="text-[10px] sm:text-sm text-gray-500 truncate">{review.enterprise}</p>
      </div>
    </div>
    
    <div className="relative">
      <Quote className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 text-[#0047AB]/20" />
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pl-3 sm:pl-4 line-clamp-3">
        {review.text}
      </p>
    </div>
    
    <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-100">
      <span className="text-[10px] sm:text-xs text-gray-500">{review.date}</span>
    </div>
  </div>
);

const ScrollingReviews = ({ reviews = sampleReviews, title = "Ce que nos clients disent", speed = 30 }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Double the reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-8 sm:py-16 md:py-24 bg-gray-50 overflow-hidden" data-testid="scrolling-reviews-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 sm:mb-10">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              {title}
            </h2>
            <p className="text-gray-600 mt-0.5 sm:mt-2 text-xs sm:text-base">Avis vérifiés de notre communauté</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm flex-shrink-0">
            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            <span>4.8/5 basé sur {reviews.length * 50}+ avis</span>
          </div>
        </div>
      </div>

      {/* Scrolling Container */}
      <div 
        className="scrolling-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="scrolling-track animate-scroll-x"
          style={{ 
            animationDuration: `${speed}s`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>

      {/* Mobile hint */}
      <p className="md:hidden text-center text-gray-500 text-[10px] sm:text-xs mt-4 sm:mt-6 px-4">
        Faites glisser pour voir plus d'avis
      </p>
    </section>
  );
};

export default ScrollingReviews;
