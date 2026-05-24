import React, { useState, useEffect } from 'react';
import { X, Users, Building2, Check, Star, ShoppingBag, Briefcase, Search, Award, Shield } from 'lucide-react';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExplore = () => {
    handleClose();
    window.location.href = 'indroul.php';
  };

  if (!isVisible) return null;

  // Avantages pour les clients
  const clientAdvantages = [
    { icon: Search, text: "Trouvez facilement les meilleurs prestataires" },
    { icon: Star, text: "Accédez aux avis vérifiés" },
    { icon: ShoppingBag, text: "Réservez et commandez en ligne" },
    { icon: Shield, text: "Paiement sécurisé garanti" },
  ];

  // Avantages pour les entreprises
  const enterpriseAdvantages = [
    { icon: Users, text: "Réduction sur les abonnements" },
    { icon: Award, text: "Réduction sur le prix des services" },
    { icon: Briefcase, text: "Contenu video" },
    { icon: Star, text: "1an abonnement vip" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
      {/* Overlay sombre */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup - Landscape sur desktop, Portrait sur mobile */}
      <div className="relative w-full max-w-[340px] sm:max-w-3xl lg:max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Bouton fermer */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          data-testid="welcome-popup-close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Layout: Colonne sur mobile, Ligne sur desktop */}
        <div className="flex flex-col sm:flex-row">
          
          {/* Section gauche - Titre et branding */}
          <div className="bg-pink-600 p-5 sm:p-8 sm:w-2/5 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              TENTE TA CHANCE !
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">
              Joue a la roulette de la chance et tente de <br className="hidden sm:block" /> gagner une récompense exclusive !
            </p>
            <div className="mt-3 sm:mt-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
              <span className="text-black text-xs sm:text-sm font-medium">Réduction et avantages !</span>
            </div>
          </div>

          {/* Section droite - Avantages */}
          <div className="p-5 sm:p-8 sm:w-3/5 flex flex-col justify-center">
            {/* Layout en colonnes sur desktop, empilé sur mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-6">
              
              {/* Colonne Clients */}
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#D4AF37]/10">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">A gagner

                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-3 justify-center m-auto">
                  {enterpriseAdvantages.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm leading-snug">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-8">
         
              <button
                onClick={handleExplore}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-[#0047AB] hover:bg-[#003080] text-white rounded-xl transition-all text-xs sm:text-sm font-medium"
                data-testid="welcome-popup-signup"
              >
                <a href='indroul.php' style={{color:'white'}}>
                  Jouer
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
