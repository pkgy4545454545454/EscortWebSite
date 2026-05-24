import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { wishlistAPI } from '../services/api';
import { toast } from 'sonner';

const ServiceProductCard = ({ item, onAddToCart }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const videoRef = useRef(null);

  const {
    id,
    name,
    description,
    price,
    currency,
    type,
    images,
    is_premium,
    enterprise_id,
    enterprise_name,
    rating,
    review_count,
    available = true,
  } = item;

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('titelli_token');
    if (!token) {
      toast.error('Connectez-vous pour ajouter aux favoris');
      navigate('/auth');
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await wishlistAPI.remove(id);
        setIsInWishlist(false);
        toast.success('Retiré des favoris');
      } else {
        await wishlistAPI.add({
          item_id: id,
          item_type: type,
          item_name: name,
          item_price: price,
          item_image: images?.[0] || '',
          enterprise_id: enterprise_id,
          enterprise_name: enterprise_name,
        });
        setIsInWishlist(true);
        toast.success('Ajouté aux favoris !');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail;
      if (typeof errorMsg === 'string') {
        toast.error(errorMsg);
      } else if (Array.isArray(errorMsg)) {
        toast.error(errorMsg[0]?.msg || 'Erreur de validation');
      } else {
        toast.error('Erreur lors de l\'ajout aux favoris');
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  const defaultImage = type === 'service'
    ? 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800'
    : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';

  const displayRating = rating ? `${rating.toFixed(1)} / 5` : '4.5 / 5';
  const displayReviews = review_count || 0;

  // VIDEO URL DE TEST
  const videoUrl = "20250821_034353.mp4";

  return (
    <div
      className="bg-white border border-gray-100 shadow-sm hover:shadow-lg group  overflow-hidden transition-all" 
      data-testid={`item-card-${id}`}
    >
      {/* VIDEO DISPLAY DIRECTLY */}
      <Link to={`/`} className="block relative   overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}   // <--- URL de test
          className="w-full  object-cover transition-transform duration-500 pixelated" style={{height:'900px !important'}}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay & VIP */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
    
        <button
            onClick={() => {
              window.location.href = "https://esclavaescort.ch/vip.php";
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 rounded-lg w-fit m-auto"
            style={{
                                  backgroundColor: "#a16207",
                                  padding: "10px",
                                  border: "2px solid #facc15",
                                  animation: "glow 1.5s infinite",
                                  cursor: "pointer"
                                }}
          >
            Deviens VIP et profite de toutes mes video en illimités !
        </button>
        </div>

        {is_premium && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse shadow-lg">
            👑 VIP
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
       

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          Pipe baveuse, Anal Hard, FaceFuck, Fisting, Uro, Scene de v**** (etc...) Abonne toi !
        </p>

        <div className="flex items-center gap-1 mb-3 justify-center text-black ">
        <a href="https://esclavaescort.ch/vip.php"
        style={{
                        backgroundColor: "#a16207",
                        padding: "10px",
                        border: "2px solid #facc15",
                        animation: "glow 1.5s infinite",
                        cursor: "pointer"
                      }}
        
        
        >
          Devenir V.I.P
        </a>
        </div>



        {/* Action buttons */}
        <div className="flex items-center gap-2">
   
        </div>
      </div>
    </div>
  );
};

export default ServiceProductCard;