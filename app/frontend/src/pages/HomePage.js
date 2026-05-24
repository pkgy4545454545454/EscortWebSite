import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaSnapchatGhost, FaWhatsapp } from "react-icons/fa";
import { ChevronRight, ChevronLeft, Star, ArrowRight, Play, Briefcase, MapPin, Target,  Clock, Filter, GraduationCap, Calendar, Pause, Volume2, VolumeX, Search, Sparkles, Gift, CheckCircle, Users, Send, X, FileText } from 'lucide-react';
import { featuredAPI, categoryAPI, enterpriseAPI, servicesProductsAPI, jobsAPI, clientDocumentsAPI, trainingsAPI } from '../services/api';
import EnterpriseCard from '../components/EnterpriseCard';
import ServiceProductCard from '../components/ServiceProductCard';
import ScrollingReviews from '../components/ScrollingReviews';
import { toast } from 'sonner';
import { Zap, Heart,  Shield, Award } from 'lucide-react';
import WelcomePopup from '../components/WelcomePopup';
// Carousel Component with light theme - Responsive
const Carousel = ({ children, itemWidth = 280 }) => {
  const carouselRef = useRef(null);
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = itemWidth + 16;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className="relative group">
      <button
        onClick={() => scrollCarousel('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-110 -ml-2 sm:-ml-4 opacity-0 group-hover:opacity-100 sm:opacity-100"
        data-testid="carousel-prev"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={() => scrollCarousel('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-110 -mr-2 sm:-mr-4 opacity-0 group-hover:opacity-100 sm:opacity-100"
        data-testid="carousel-next"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <div 
        ref={carouselRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
};


const HomePage = () => {
  const navigate = useNavigate();
  const [allEnterprises, setAllEnterprises] = useState([]);
  const [tendances, setTendances] = useState([]);
  const [guests, setGuests] = useState([]);
  const [offres, setOffres] = useState([]);
  const [premium, setPremium] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [jewelryWatchProducts, setJewelryWatchProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [jobFilters, setJobFilters] = useState({
    type: '',
    location: '',
    enterprise: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Application Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);
  const [applyForm, setApplyForm] = useState({
    resume_url: '',
    cover_letter: ''
  });
  const [applying, setApplying] = useState(false);

  // Training purchase state
  const [purchasingTraining, setPurchasingTraining] = useState(null);

  // Filter enterprises with real photos only (no unsplash/default images)
const hasRealPhoto = (enterprise) => {
  if (!enterprise) return false;

  const img = enterprise.cover_image || enterprise.image || '';

  if (!img) return false;

  if (
    img.includes('unsplash') ||
    img.includes('placeholder') ||
    img.includes('default')
  ) {
    return false;
  }

  return true;
};

  // Sort enterprises by profile completeness
  const sortByProfileCompleteness = (enterprises) => {
    return [...enterprises].sort((a, b) => {
      const getScore = (e) => {
        let score = 0;
        if (hasRealPhoto(e)) score += 5; // Priority to real photos
        if (e.logo) score += 2;
        if (e.description && e.description.length > 50) score += 2;
        if (e.slogan) score += 1;
        if (e.rating > 0) score += 2;
        if (e.review_count > 0) score += 1;
        if (e.is_certified) score += 2;
        if (e.is_labeled) score += 2;
        if (e.is_premium) score += 2;
        return score;
      };
      return getScore(b) - getScore(a);
    });
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const [enterprisesRes, tendRes, guestRes, offreRes, premRes, prodCatRes, servCatRes, jobsRes, trainingsRes, jewelryProductsRes] = await Promise.all([
          enterpriseAPI.list({ limit: 100 }),
          featuredAPI.tendances(),
          featuredAPI.guests(),
          featuredAPI.offres(),
          featuredAPI.premium(),
          categoryAPI.products(),
          categoryAPI.services(),
          jobsAPI.listAll().catch(() => ({ data: [] })),
          trainingsAPI.listAll({ limit: 6 }).catch(() => ({ data: [] })),
          servicesProductsAPI.list({ type: 'product', limit: 50 }).catch(() => ({ data: [] }))
        ]);

        // Filter and sort all enterprises - only those with real photos, then ALPHABETICALLY
        const allEnts = enterprisesRes.data.enterprises || [];
        setAllEnterprises(allEnts);
        // Sort alphabetically by business_name or name
  
        // Filter featured enterprises too - also alphabetically
        const tendData = (tendRes.data || []).filter(hasRealPhoto).sort((a, b) => 
          (a.business_name || a.name || '').localeCompare(b.business_name || b.name || '')
        );
        const guestData = (guestRes.data || []).filter(hasRealPhoto).sort((a, b) => 
          (a.business_name || a.name || '').localeCompare(b.business_name || b.name || '')
        );
        const premData = (premRes.data || []).filter(hasRealPhoto).sort((a, b) => 
          (a.business_name || a.name || '').localeCompare(b.business_name || b.name || '')
        );
        
        setTendances(tendData);
        setGuests(guestData);
        setOffres(offreRes.data);
        setPremium(premData);
        setProductCategories(prodCatRes.data);
        setServiceCategories(servCatRes.data);
        const jobsData = jobsRes.data || [];
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        setTrainings(trainingsRes.data || []);
        
        // Filter jewelry/watch products for the special section
        const allProducts = jewelryProductsRes.data?.items || jewelryProductsRes.data || [];
        const jewelryProducts = allProducts.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const name = (p.name || '').toLowerCase();
          return cat.includes('bijou') || cat.includes('montre') || cat.includes('horlog') || 
                 cat.includes('joaill') || name.includes('montre') || name.includes('bijou');
        });
        setJewelryWatchProducts(jewelryProducts);
        
        // Filter best products with nice images and price
        const productsWithImages = allProducts.filter(p => {
          const images = p.images || [];
          const hasImage = images.length > 0 && images[0] && !images[0].includes('placeholder');
          const hasPrice = p.price && p.price > 0;
          return hasImage && hasPrice;
        });
        // Sort by those starting with 't' first, then alphabetically
        const sortedProducts = productsWithImages.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          const startsWithTA = nameA.startsWith('t');
          const startsWithTB = nameB.startsWith('t');
          if (startsWithTA && !startsWithTB) return -1;
          if (!startsWithTA && startsWithTB) return 1;
          return nameA.localeCompare(nameB);
        });
        setBestProducts(sortedProducts.slice(0, 20));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...jobs];
    
    if (jobFilters.type) {
      result = result.filter(job => job.type === jobFilters.type);
    }
    
    if (jobFilters.location) {
      result = result.filter(job => 
        (job.location || '').toLowerCase().includes(jobFilters.location.toLowerCase())
      );
    }
    
    if (jobFilters.enterprise) {
      result = result.filter(job => 
        (job.enterprise_name || '').toLowerCase().includes(jobFilters.enterprise.toLowerCase())
      );
    }
    
    setFilteredJobs(result);
  }, [jobFilters, jobs]);
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  // Open apply modal
  const handleApplyClick = async (e, job) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('titelli_token');
    if (!token) {
      toast.error('Connectez-vous pour postuler');
      return;
    }
    
    setSelectedJob(job);
    setApplyForm({ resume_url: '', cover_letter: '' });
    
    try {
      const res = await clientDocumentsAPI.list();
      const allDocs = res.data?.documents || res.data || [];
      const cvDocs = allDocs.filter(d => d.category === 'cv' || d.category === 'general' || d.file_type?.includes('pdf'));
      setUserDocuments(cvDocs.length > 0 ? cvDocs : allDocs);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setUserDocuments([]);
    }
    
    setShowApplyModal(true);
  };
  
  // Submit application
  const handleSubmitApplication = async () => {
    if (!applyForm.resume_url) {
      toast.error('Veuillez sélectionner un CV');
      return;
    }
    
    setApplying(true);
    try {
      await jobsAPI.apply(selectedJob.id, {
        resume_url: applyForm.resume_url,
        cover_letter: applyForm.cover_letter
      });
      toast.success('Candidature envoyée avec succès !');
      setShowApplyModal(false);
    } catch (error) {
      const msg = error.response?.data?.detail || 'Erreur lors de l\'envoi';
      toast.error(msg);
    } finally {
      setApplying(false);
    }
  };

  // Handle training purchase
  const handlePurchaseTraining = async (training) => {
    const token = localStorage.getItem('titelli_token');
    if (!token) {
      toast.error('Connectez-vous pour acheter une formation');
      navigate('/auth');
      return;
    }
    
    setPurchasingTraining(training.id);
    try {
      const res = await trainingsAPI.purchase(training.id);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      const msg = error.response?.data?.detail || 'Erreur lors de l\'achat';
      toast.error(msg);
    } finally {
      setPurchasingTraining(null);
    }
  };

  // Video state for panoramic hero
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const enterprisesByCategory = allEnterprises.reduce((acc, enterprise) => {
    const category = enterprise.category || 'Autres';
    if (!acc[category]) acc[category] = [];
    acc[category].push(enterprise);
    return acc;
  }, {});



const advantages = [
  {
    title: "Domination de luxe",
    description: "Profitez de mes services extreme sans limite unique en suisse.",
    icon: Zap
  },
  {
    title: "Video Xtreme",
    description: "Régalez vous avec mes meilleures vidoés X, Tournez depuis 2010",
    icon: Heart
  },
  {
    title: "Scénarios X",
    description: "Régalez vous avec mes scénarios les plus délirants et extrême, tournés depuis 2010",
    icon: Users
  },

  {
    title: "Récompenses",
    description: "Profitez de programmes de fidélité attractifs.",
    icon: Award
  },
];


  const panoramicVideoUrl = `ses.mp4`;
  const panoramicVideoUrllll = `suceesclava.mp4`;
  const panoramicVideoUrll = `1000114277.mp4`;
  const panoramicVideoUrlll = `suceesclava.mp4`;
  const heroImage = 'nadidadominaback.png';
  const heroImagee = 'back.jpg';

  const mainCategories = [
    { id: 'services', label: 'Services', path: '/services', icon: Sparkles },
    { id: 'produits', label: 'Produits', path: '/products', icon: Gift },
    { id: 'certifies', label: 'Certifiés', path: '/certifies', icon: CheckCircle },
    { id: 'guests', label: 'Guests', path: '/guests', icon: Users },
  ];

  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [opennn, setOpennn] = useState(false);
  const [showPopup, setShowPopup] = useState(true);



return (

  <div className="min-h-screen bg-black">
  {showPopup && (
    <WelcomePopup
      closePopup={() => setShowPopup(false)}
    />
  )}{/* HERO SECTION */}
<section
  className="relative w-full min-h-screen overflow-hidden bg-black"
  data-testid="hero-section"
>
  {/* BACKGROUND */}
  <div className="absolute inset-0 z-0">
    <img
      src={heroImage}
      alt="Hero"
      className="w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">

    <h1
      className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
      style={{
        fontFamily: 'Playfair Display, serif',
      }}
    >
      Deviens<br />

      <span className="text-red-500">
        Soumis <span id="extreme">V.I.P</span>
      </span>

      <br />

      <span className="text-lg md:text-2xl block mt-4">
        🚫 Scénario sans limites 🚫
      </span>
    </h1>

    <button
      onClick={() => setOpenn(true)}
      className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg"
    >
      DEVENIR V.I.P
    </button>

  </div>

  {/* POPUP */}
  {openn === true && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 overflow-y-auto max-h-[90vh]">

        <h3 className="text-center text-2xl font-bold text-red-600 underline mb-6">
          Que contient le programme V.I.P. ? 🚫
        </h3>

        <div className="space-y-3 text-sm text-black">

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Video domination entiere et illimitées§</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Vidéos de torture en direct avec maître VIP</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Sexe interdit : c**, z****, i*****, f****</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Tchat avec concours et services à gagner</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>
              Services exclusifs disponibles uniquement dans le groupe
            </p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>
              1 client choisi chaque mercredi pour une séance extrême offerte
            </p>
          </div>

        </div>

        {/* PAYMENT BOX */}
        <div className="mt-8 bg-gray-100 rounded-xl p-4 border border-gray-200">

          <h4 className="text-center text-lg font-bold underline text-black mb-4">
            Comment le rejoindre ?
          </h4>

          <div className="space-y-3 text-black text-sm">

            <div>
              <p className="font-semibold">💳 Prix :</p>
              <p>Entrée illimitée : 19.90 CHF</p>
            </div>

            <div>
              <p className="font-semibold">📱 Paiement TWINT / REVOLUT :</p>
              <p className="font-bold text-base">076 295 76 88</p>
            </div>

            <div>
              <p className="font-semibold">
                Lors du paiement :
              </p>

              <p>
                Indiquez le mot <span className="font-bold">'T'</span> ainsi que
                votre nom Telegram.
              </p>
            </div>

            <p className="italic text-gray-700 text-center">
              Vous serez ajouté dans l’heure qui suit.
            </p>

          </div>
        </div>

        <button
          onClick={() => setOpenn(false)}
          className="w-full mt-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          Fermer
        </button>

      </div>
    </div>
  )}
</section>

{/* SECOND SECTION */}
<section
  className="relative py-20 px-4 overflow-hidden"
  style={{
    border: '3px solid red',
    boxShadow: '0 0 30px red'
  }}
>

  {/* BACKGROUND */}
  <div className="absolute inset-0 z-0">

    <img
      src={heroImagee}
      alt="Background"
      className="w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-black/60"></div>

  </div>

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col justify-center items-center text-center px-4">

    <button
      onClick={() => setOpennn(true)}
      className="text-white bg-red-800 hover:bg-red-900 px-8 py-10 rounded-xl font-bold transition-all"
    >
      EXTREME SCENARIOS
    </button>

  </div>

  {/* MODAL */}
  {opennn === true && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 overflow-y-auto max-h-[90vh]"
      >

        <h3 className="text-center text-2xl font-bold text-red-600 underline mb-6">
          Que contiennent les Scénarios extrêmes ? 🚫
        </h3>

        <div className="space-y-3 text-sm text-black">

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Temps possible : de 1h à 1 semaine</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Humiliation extrême</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>Séquestration (1 semaine maximum)</p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>
              Violence physique (respecter ma limite à discuter lors du jour J)
            </p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>
              Putanata (Jeux de la pinata mais avec moi suspendue tête en bas)
            </p>
          </div>

          <hr />

          <div className="flex items-start gap-2">
            <span>🚫</span>
            <p>
              Fouetage, électrisations, lutte
            </p>
          </div>

        </div>

        {/* INFO */}
        <div className="mt-8 bg-gray-100 rounded-xl p-4 border border-gray-200">

          <h4 className="text-center text-lg font-bold underline text-black mb-4">
            COIN RÉSERVÉ AUX EXPÉRIMENTÉS BDSM
          </h4>

          <div className="space-y-3 text-black text-sm">

            <div>
              <p className="font-semibold">⚠️ IMPORTANT ⚠️</p>
            </div>

            <div>
              <p className="font-semibold">
                Comment ça se passe ?
              </p>

              <p>
                Vous choisissez votre séance, la durée et lors de la validation
                du paiement le rendez-vous est fixé.
              </p>

              <p className="mt-2">
                Ce genre de séances demande une préparation mentale et physique
                importante.
              </p>
            </div>

            <p className="italic text-gray-700 text-center">
              Une fois votre demande validée je vous contacte rapidement.
            </p>

          </div>
        </div>

        <button
          onClick={() => setOpennn(false)}
          className="w-full mt-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          Fermer
        </button>

        <a
          href="https://esclavaescort.ch/punition.php"
          className="w-full mt-4 py-3 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-800 transition flex items-center justify-center"
        >
          JE VEUX
        </a>

      </div>
    </div>
  )}
</section>

{/* IMAGES SECTION FIXED */}
<section className="py-20 px-4 bg-black">

  <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

    <div
      className="rounded-2xl overflow-hidden border border-pink-500/20"
      style={{
        backgroundColor: 'pink',
      }}
    >
      <img
        src="nadiacorps.jpg"
        alt=""
        className="w-full h-[500px] object-cover"
      />

    </div>


 

  </div>

</section>
      {/* Les meilleurs produits - Real Product Cards */}
      




      {/* CTA Section */}
    
    </div>
  );
};

export default HomePage; 