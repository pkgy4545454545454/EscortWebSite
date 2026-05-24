import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Check, 
  Star, 
  Shield, 
  Zap, 
  Heart,
  Users,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Target,
  Gift
} from 'lucide-react';

const AboutPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Vidéos promo lifestyle
  const promoVideos = [
    { id: 1, title: "Hakim et son chauffeur", description: "Découvrez comment Titelli simplifie votre quotidien" },
    { id: 2, title: "Une sortie en famille", description: "Planifiez des moments inoubliables" },
    { id: 3, title: "Grand-mère et son quotidien", description: "La technologie au service de tous" },
    { id: 4, title: "Femme d'affaire, toujours", description: "Efficacité et élégance au quotidien" },
    { id: 5, title: "Business is business", description: "Comment gagner avec Titelli" },
    { id: 6, title: "Soirée entre copines!", description: "Organisez vos sorties en un clic" },
    { id: 7, title: "J'invite ma femme ce soir!", description: "Surprenez vos proches" },
    { id: 8, title: "Surprise pour mâle?", description: "Des idées cadeaux originales" },
  ];

  // Avantages Titelli
  const advantages = [
    {
      icon: Zap,
      title: "Livraison instantanée",
      description: "Faites-vous livrer une tenue ou un styliste en instantané en tout temps!"
    },
    {
      icon: Heart,
      title: "Soins à domicile",
      description: "Recevez un coiffeur ou un soin à domicile!"
    },
    {
      icon: Users,
      title: "Chauffeur personnel",
      description: "Envoyez le chauffeur récupérer vos courses : pressing, marché, documents oubliés!"
    },
    {
      icon: Gift,
      title: "Shopping express",
      description: "Un parfum en chemin, une paire de chaussures ou votre snack préféré!"
    },
    {
      icon: Shield,
      title: "Professionnels certifiés",
      description: "Recevez un professionnel de santé à domicile ou un expert comptable."
    },
    {
      icon: Award,
      title: "Prestataires labellisés",
      description: "Les meilleures prestations à domicile avec nos prestataires labellisés."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              À Propos de <span className="text-yellow-400">Titelli</span>
            </h1>
            <p className="text-2xl md:text-3xl text-yellow-400 font-medium mb-8">
              CE QUE VOUS VOULEZ, OÙ VOUS LE VOULEZ,<br />
              QUAND VOUS LE VOULEZ ET COMME VOUS LE VOULEZ !
            </p>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Titelli accompagne ses clients tout au long de leur journée de consommation.
              Devenez notre recommandation préférée.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/20">
              <Target className="w-12 h-12 text-yellow-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Notre Vision</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Rendre le client toujours plus proche de ses prestataires préférés.
                Connecter les meilleurs prestataires de la région et permettre chaque jour à de nouveaux clients de les découvrir.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20">
              <Sparkles className="w-12 h-12 text-orange-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Notre Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Valoriser le savoir-faire et les produits de nos prestataires régionaux.
                Notre objectif ? Connecter nos clients aux meilleurs prestataires sur Titelli, faites-en parti !
              </p>
            </div>
          </div>

          {/* Slogan central */}
          <div className="text-center mb-20 py-12 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent rounded-3xl">
            <blockquote className="text-3xl md:text-4xl font-bold text-white italic mb-4">
              "Tous les prestataires préférés de votre région se trouvent sur Titelli."
            </blockquote>
            <p className="text-xl text-yellow-400">
              « Ne cherchez plus vos clients et laissez-les vous trouver ! »
            </p>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Les avantages <span className="text-yellow-400">Titelli</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Découvrez tout ce que Titelli peut faire pour vous
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all group"
              >
                <adv.icon className="w-10 h-10 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-gray-400">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos Promo Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Découvrez la vie avec <span className="text-yellow-400">Titelli</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Vidéos promo lifestyle avant/après Titelli
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all cursor-pointer group"
                onClick={() => setActiveVideo(video.id)}
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/40 transition-colors">
                    <Play className="w-8 h-8 text-yellow-400" />
                  </div>
                  <span className="absolute top-3 right-3 text-xs bg-black/50 px-2 py-1 rounded text-gray-300">
                    Prochainement
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre but Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Notre engagement
          </h2>
          
          <div className="space-y-6 text-lg text-gray-400">
            <p className="flex items-center justify-center gap-3">
              <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">Notre but</strong>, Vos intérêts.</span>
            </p>
            <p className="flex items-center justify-center gap-3">
              <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">Notre objectif</strong>, vos bénéfices.</span>
            </p>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl border border-yellow-500/20">
            <p className="text-xl text-gray-300 leading-relaxed">
              Titelli voit et croit en le <strong className="text-yellow-400">véritable potentiel</strong> de votre entreprise ainsi qu'en votre plus-value. 
              Nous avons réunis pour vous les meilleurs experts de divers domaines afin de vous permettre d'optimiser de la plus importante des manières votre entreprise.
            </p>
            <p className="text-2xl font-bold text-white mt-6">
              Découvrez le plein potentiel de votre commerce et dévoilez-en sa meilleure version.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-xl text-gray-400 mb-6">
              Connaissez-vous tous les clients potentiels de votre secteur d'activité ?
            </p>
            <p className="text-2xl font-bold text-yellow-400">
              Connectez-vous et permettez chaque jour à de nouveaux clients de vous découvrir sur Titelli.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à rejoindre <span className="text-yellow-400">Titelli</span> ?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            « Ne manquez plus aucune occasion de vendre. »<br />
            Connectez-vous véritablement à vos clients.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/inscription-entreprise"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
            >
              Devenir partenaire <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/auth"
              className="px-8 py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all border border-gray-600"
            >
              Créer un compte client
            </Link>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link to="/cgv" className="hover:text-yellow-400 transition-colors">Conditions Générales de Vente</Link>
          <span>•</span>
          <Link to="/mentions-legales" className="hover:text-yellow-400 transition-colors">Mentions Légales</Link>
          <span>•</span>
          <Link to="/partenaires" className="hover:text-yellow-400 transition-colors">Nos Partenaires</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
