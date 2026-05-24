import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gift, Coins, TrendingUp, Star, Award, ChevronRight, Percent, History, ArrowRight, Sparkles, ShoppingBag, Users, CheckCircle, Lock } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CashbackPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [cashbackData, setCashbackData] = useState({
    balance: 0,
    total_earned: 0,
    transactions: [],
    tier: 'bronze'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCashbackData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCashbackData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/cashback/balance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCashbackData(data);
      }
    } catch (error) {
      console.error('Error fetching cashback:', error);
    } finally {
      setLoading(false);
    }
  };

  const tiers = [
    { 
      name: 'Bronze', 
      id: 'bronze',
      rate: '2%', 
      minSpend: '0 CHF',
      color: 'from-amber-700 to-amber-900',
      textColor: 'text-amber-400',
      benefits: ['2% de cashback sur tous les achats', 'Accès aux offres spéciales']
    },
    { 
      name: 'Silver', 
      id: 'silver',
      rate: '3%', 
      minSpend: '500 CHF',
      color: 'from-gray-400 to-gray-600',
      textColor: 'text-gray-300',
      benefits: ['3% de cashback sur tous les achats', 'Livraison gratuite', 'Accès prioritaire aux ventes']
    },
    { 
      name: 'Gold', 
      id: 'gold',
      rate: '5%', 
      minSpend: '1500 CHF',
      color: 'from-[#D4AF37] to-yellow-700',
      textColor: 'text-[#D4AF37]',
      benefits: ['5% de cashback sur tous les achats', 'Livraison express gratuite', 'Service client VIP', 'Cadeaux exclusifs']
    },
    { 
      name: 'Platinum', 
      id: 'platinum',
      rate: '8%', 
      minSpend: '5000 CHF',
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      benefits: ['8% de cashback sur tous les achats', 'Concierge personnel', 'Événements VIP', 'Double points les week-ends']
    }
  ];

  const howItWorks = [
    { icon: ShoppingBag, title: 'Achetez', description: 'Faites vos achats chez nos partenaires' },
    { icon: Coins, title: 'Cumulez', description: 'Gagnez du cashback sur chaque achat' },
    { icon: Gift, title: 'Utilisez', description: 'Convertissez en réductions ou retirez' }
  ];

  const currentTier = tiers.find(t => t.id === cashbackData.tier) || tiers[0];

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="cashback-page">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0047AB]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[pink] text-sm font-medium">Programme de fidélité</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Esclava <span className="text-[pink]">Cashback</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Gagnez de l'argent chaque mois selon votre type d'abonnement V.I.P.
            </p>
          </div>

          {/* User Balance Card - Only for authenticated users */}
          {isAuthenticated ? (
            <div className={`max-w-md mx-auto bg-gradient-to-br ${currentTier.color} rounded-2xl p-6 shadow-2xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold">{currentTier.name}</span>
                </div>
                <span className="text-white/80 text-sm">{currentTier.rate} cashback</span>
              </div>
              <div className="text-center py-4">
                <p className="text-white/60 text-sm mb-1">Votre solde</p>
                <p className="text-4xl font-bold text-white">
                  {loading ? '...' : `${cashbackData.balance.toFixed(2)} CHF`}
                </p>
                <p className="text-white/60 text-xs mt-2">
                  Total gagné : {cashbackData.total_earned.toFixed(2)} CHF
                </p>
              </div>
              <button 
                onClick={() => navigate('/dashboard/client')}
                className="w-full py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Utiliser mon cashback
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-center">
                <Lock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Connectez-vous pour voir votre solde cashback</p>
                <Link 
                  to="/auth"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white font-medium rounded-xl hover:bg-[#0047AB]/80 transition-all"
                >
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Transaction History - Only for authenticated users */}
      {isAuthenticated && cashbackData.transactions.length > 0 && (
        <section className="py-16 bg-white/5">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              <History className="w-6 h-6 text-[#D4AF37]" />
              Historique récent
            </h2>
            <div className="space-y-4">
              {cashbackData.transactions.slice(0, 5).map((tx, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{tx.description}</p>
                    <p className="text-gray-500 text-sm">{new Date(tx.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <span className={`font-semibold ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)} CHF
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-[#0047AB]/20 to-[#D4AF37]/20 border border-white/10 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Prêt à commencer à économiser ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Rejoignez des milliers de clients qui économisent avec Titelli Cashback
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0047AB] text-white font-semibold rounded-xl hover:bg-[#0047AB]/80 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Commencer mes achats
              </Link>
              <Link 
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                Découvrir les services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CashbackPage;
