import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import StoryCard from './components/StoryCard';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';
import VideoTestimonial from './components/VideoTestimonial';
import DetailModal from './components/DetailModal';
import ComparisonChart from './components/ComparisonChart';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SuccessStories = () => {
  const [filters, setFilters] = useState({
    investmentType: 'all',
    growthRange: 'all',
    timeframe: 'all'
  });

  const [selectedStory, setSelectedStory] = useState(null);

  const successStories = [
  {
    id: 1,
    clientName: "Michael Rodriguez",
    clientRole: "Tech Entrepreneur",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17b3c9c38-1763299336236.png",
    clientAvatarAlt: "Professional headshot of Hispanic male entrepreneur with short dark hair wearing navy blue business suit and confident smile",
    image: "https://images.unsplash.com/photo-1686056040370-b5e5c06c4273",
    imageAlt: "Modern luxury penthouse apartment with floor-to-ceiling windows overlooking city skyline at sunset with contemporary furniture",
    summary: "Transformed $150K into $525K through strategic crypto trading and real estate diversification in just 18 months.",
    initialInvestment: 150000,
    currentValue: 525000,
    growthPercentage: 250,
    timeframe: "18 Months",
    investmentTypes: ["Cryptocurrency", "Real Estate", "Diversified"],
    fullTestimonial: "Working with CryptoRealty Pro completely changed my investment approach. The dual expertise in both crypto and real estate gave me confidence to diversify intelligently. The personalized strategy and ongoing guidance helped me navigate market volatility while building substantial wealth across both asset classes.",
    journeyHighlights: [
    {
      title: "Initial Consultation & Strategy",
      description: "Comprehensive portfolio analysis and customized investment strategy combining crypto trading with real estate opportunities"
    },
    {
      title: "Crypto Portfolio Optimization",
      description: "Strategic entry points in Bitcoin and Ethereum during market corrections, with disciplined profit-taking strategies"
    },
    {
      title: "Real Estate Diversification",
      description: "Investment in two rental properties in emerging markets, generating consistent passive income"
    },
    {
      title: "Portfolio Rebalancing",
      description: "Quarterly reviews and adjustments maintaining optimal risk-reward balance across asset classes"
    }]

  },
  {
    id: 2,
    clientName: "Sarah Chen",
    clientRole: "Corporate Executive",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c95c7b25-1763295913147.png",
    clientAvatarAlt: "Professional portrait of Asian female executive with long black hair in elegant gray blazer with warm professional smile",
    image: "https://images.unsplash.com/photo-1639060589553-77c8c2227ac5",
    imageAlt: "Elegant modern residential property exterior with white facade, large windows, manicured lawn and contemporary architectural design",
    summary: "Built a $800K diversified portfolio from $200K initial investment through systematic crypto trading and property investments.",
    initialInvestment: 200000,
    currentValue: 800000,
    growthPercentage: 300,
    timeframe: "2 Years",
    investmentTypes: ["Real Estate", "Cryptocurrency", "Diversified"],
    fullTestimonial: "As a busy executive, I needed expert guidance I could trust. The comprehensive approach to both crypto and real estate investment, combined with clear communication and proven strategies, gave me the confidence to commit significant capital. The results have exceeded my expectations.",
    journeyHighlights: [
    {
      title: "Risk Assessment & Goal Setting",
      description: "Detailed financial analysis and establishment of clear investment objectives aligned with retirement goals"
    },
    {
      title: "Multi-Property Investment",
      description: "Strategic acquisition of three properties in high-growth areas with strong rental yields"
    },
    {
      title: "Crypto Trading Strategy",
      description: "Systematic DCA approach in major cryptocurrencies with strategic altcoin positions"
    },
    {
      title: "Wealth Preservation",
      description: "Implementation of tax-efficient strategies and asset protection measures"
    }]

  },
  {
    id: 3,
    clientName: "David Thompson",
    clientRole: "Business Owner",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1755cd5d7-1763293222156.png",
    clientAvatarAlt: "Professional headshot of Caucasian male business owner with salt and pepper hair wearing charcoal suit with confident expression",
    image: "https://images.unsplash.com/photo-1628498640316-d04c4a1c07e6",
    imageAlt: "Bitcoin cryptocurrency golden coins stacked on financial charts with laptop showing trading graphs in modern office setting",
    summary: "Achieved 180% returns in 12 months through aggressive crypto trading strategy combined with commercial real estate.",
    initialInvestment: 300000,
    currentValue: 840000,
    growthPercentage: 180,
    timeframe: "12 Months",
    investmentTypes: ["Cryptocurrency", "Real Estate"],
    fullTestimonial: "The expertise in timing crypto markets while maintaining stable real estate investments created the perfect balance for my risk tolerance. The transparent communication and data-driven approach gave me confidence during volatile periods.",
    journeyHighlights: [
    {
      title: "Aggressive Growth Strategy",
      description: "High-conviction crypto positions with strict risk management protocols"
    },
    {
      title: "Commercial Property Investment",
      description: "Strategic investment in commercial real estate providing stable cash flow"
    },
    {
      title: "Market Timing Excellence",
      description: "Capitalized on major crypto bull run with disciplined exit strategies"
    },
    {
      title: "Portfolio Stabilization",
      description: "Rebalanced portfolio to lock in gains and reduce risk exposure"
    }]

  },
  {
    id: 4,
    clientName: "Emily Watson",
    clientRole: "Medical Professional",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19c27b25f-1763300463391.png",
    clientAvatarAlt: "Professional portrait of Caucasian female doctor with blonde hair in white medical coat with friendly approachable smile",
    image: "https://images.unsplash.com/photo-1560993212-da62d8d1601f",
    imageAlt: "Spacious modern family home with two-story design, brick exterior, large front yard with green lawn and attached garage",
    summary: "Conservative approach yielded 120% growth over 2 years through balanced crypto and residential real estate portfolio.",
    initialInvestment: 180000,
    currentValue: 396000,
    growthPercentage: 120,
    timeframe: "2 Years",
    investmentTypes: ["Real Estate", "Diversified"],
    fullTestimonial: "As someone with limited investment experience, the educational approach and patient guidance made all the difference. The conservative strategy aligned perfectly with my risk tolerance while still delivering impressive returns.",
    journeyHighlights: [
    {
      title: "Investment Education",
      description: "Comprehensive training on crypto fundamentals and real estate investment principles"
    },
    {
      title: "Conservative Crypto Allocation",
      description: "Blue-chip cryptocurrency positions with long-term holding strategy"
    },
    {
      title: "Residential Property Portfolio",
      description: "Two single-family rental properties in stable suburban markets"
    },
    {
      title: "Passive Income Generation",
      description: "Established reliable monthly cash flow from rental properties"
    }]

  },
  {
    id: 5,
    clientName: "James Martinez",
    clientRole: "Software Engineer",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce519685-1763295042386.png",
    clientAvatarAlt: "Professional headshot of Hispanic male software engineer with short black hair and beard wearing casual blue shirt with friendly smile",
    image: "https://images.unsplash.com/photo-1622630732303-8e94514a1746",
    imageAlt: "Ethereum cryptocurrency silver coins displayed on financial documents with digital trading charts and laptop in background",
    summary: "Tech-savvy approach combined with real estate fundamentals generated 220% returns in 20 months.",
    initialInvestment: 120000,
    currentValue: 384000,
    growthPercentage: 220,
    timeframe: "20 Months",
    investmentTypes: ["Cryptocurrency", "Diversified"],
    fullTestimonial: "The technical analysis expertise in crypto markets combined with traditional real estate wisdom created a unique advantage. The data-driven approach resonated with my analytical mindset.",
    journeyHighlights: [
    {
      title: "Technical Analysis Mastery",
      description: "Advanced crypto trading strategies using technical indicators and market analysis"
    },
    {
      title: "DeFi Opportunities",
      description: "Strategic positions in decentralized finance protocols with high yield potential"
    },
    {
      title: "Real Estate Technology",
      description: "Investment in properties in tech hubs with strong appreciation potential"
    },
    {
      title: "Portfolio Automation",
      description: "Implementation of automated rebalancing and profit-taking strategies"
    }]

  },
  {
    id: 6,
    clientName: "Lisa Anderson",
    clientRole: "Marketing Director",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c73d1a7-1763293809964.png",
    clientAvatarAlt: "Professional portrait of Caucasian female marketing director with shoulder-length brown hair in burgundy blazer with confident smile",
    image: "https://images.unsplash.com/photo-1666145775451-e49389a795b6",
    imageAlt: "Luxury waterfront condominium building with modern glass architecture reflecting sunset over water with palm trees in foreground",
    summary: "Achieved financial independence through strategic $250K investment growing to $750K in 24 months.",
    initialInvestment: 250000,
    currentValue: 750000,
    growthPercentage: 200,
    timeframe: "24 Months",
    investmentTypes: ["Real Estate", "Cryptocurrency", "Diversified"],
    fullTestimonial: "The holistic approach to wealth building through both crypto and real estate gave me the diversification I needed. The personalized attention and strategic guidance made complex investment decisions simple.",
    journeyHighlights: [
    {
      title: "Financial Independence Planning",
      description: "Comprehensive strategy designed to achieve early retirement goals"
    },
    {
      title: "Multi-Market Real Estate",
      description: "Diversified property investments across three different markets"
    },
    {
      title: "Crypto Portfolio Management",
      description: "Balanced cryptocurrency portfolio with regular profit realization"
    },
    {
      title: "Passive Income Streams",
      description: "Multiple income sources from rentals and crypto staking"
    }]

  }];


  const videoTestimonials = [
  {
    id: 1,
    clientName: "Michael Rodriguez",
    clientRole: "Tech Entrepreneur",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17b3c9c38-1763299336236.png",
    clientAvatarAlt: "Professional headshot of Hispanic male entrepreneur with short dark hair wearing navy blue business suit and confident smile",
    thumbnail: "https://images.unsplash.com/photo-1492691704634-0fe43e322381",
    thumbnailAlt: "Professional businessman in modern office setting with city skyline visible through large windows during golden hour",
    quote: "The dual expertise in crypto and real estate transformed my investment strategy completely.",
    duration: "3:45",
    rating: 5.0,
    date: "Nov 2025"
  },
  {
    id: 2,
    clientName: "Sarah Chen",
    clientRole: "Corporate Executive",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c95c7b25-1763295913147.png",
    clientAvatarAlt: "Professional portrait of Asian female executive with long black hair in elegant gray blazer with warm professional smile",
    thumbnail: "https://images.unsplash.com/photo-1681909623271-b5d90dd4c163",
    thumbnailAlt: "Professional businesswoman in elegant office environment with modern decor and natural lighting from large windows",
    quote: "Clear communication and proven strategies gave me confidence to commit significant capital.",
    duration: "4:12",
    rating: 5.0,
    date: "Oct 2025"
  },
  {
    id: 3,
    clientName: "David Thompson",
    clientRole: "Business Owner",
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1755cd5d7-1763293222156.png",
    clientAvatarAlt: "Professional headshot of Caucasian male business owner with salt and pepper hair wearing charcoal suit with confident expression",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12cd2d54e-1763296593358.png",
    thumbnailAlt: "Mature businessman in contemporary office space with modern furniture and professional lighting setup",
    quote: "The transparent approach and data-driven strategies delivered exceptional results.",
    duration: "3:28",
    rating: 5.0,
    date: "Sep 2025"
  }];


  const statsData = {
    totalStories: 47,
    averageGrowth: 185,
    totalValueCreated: 12.5,
    satisfaction: 98
  };

  const chartData = [
  { name: 'Michael R.', initial: 150, current: 525 },
  { name: 'Sarah C.', initial: 200, current: 800 },
  { name: 'David T.', initial: 300, current: 840 },
  { name: 'Emily W.', initial: 180, current: 396 },
  { name: 'James M.', initial: 120, current: 384 },
  { name: 'Lisa A.', initial: 250, current: 750 }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      investmentType: 'all',
      growthRange: 'all',
      timeframe: 'all'
    });
  };

  const filteredStories = useMemo(() => {
    return successStories?.filter((story) => {
      if (filters?.investmentType !== 'all') {
        const typeMatch = filters?.investmentType === 'crypto' ? story?.investmentTypes?.includes('Cryptocurrency') :
        filters?.investmentType === 'real-estate' ? story?.investmentTypes?.includes('Real Estate') :
        story?.investmentTypes?.includes('Diversified');
        if (!typeMatch) return false;
      }

      if (filters?.growthRange !== 'all') {
        const [min, max] = filters?.growthRange?.split('-')?.map((v) => v === '+' ? Infinity : parseInt(v));
        if (story?.growthPercentage < min || max && story?.growthPercentage > max) return false;
      }

      if (filters?.timeframe !== 'all') {
        const timeframeMap = {
          '6-months': 6,
          '1-year': 12,
          '2-years': 24,
          '3-years': 36
        };
        const months = parseInt(story?.timeframe?.split(' ')?.[0]);
        const filterMonths = timeframeMap?.[filters?.timeframe];
        if (filters?.timeframe === '3-years' && months < filterMonths) return false;
        if (filters?.timeframe !== '3-years' && months !== filterMonths) return false;
      }

      return true;
    });
  }, [filters, successStories]);

  return (
    <>
      <Helmet>
        <title>Success Stories - CryptoRealty Pro | Client Portfolio Transformations</title>
        <meta name="description" content="Discover how our clients achieved remarkable portfolio growth through strategic cryptocurrency trading and real estate investments. Real results, real transformations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Icon name="Award" size={18} />
                <span>Proven Results</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Success Stories That Inspire
              </h1>
              <p className="text-lg text-muted-foreground">
                Real clients, real results. Discover how strategic guidance in cryptocurrency trading and real estate investment transformed their financial futures.
              </p>
            </div>

            <StatsOverview stats={statsData} />

            <ComparisonChart data={chartData} />

            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters} />


            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Client Transformations ({filteredStories?.length})
                </h2>
              </div>

              {filteredStories?.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories?.map((story) =>
                <StoryCard
                  key={story?.id}
                  story={story}
                  onViewDetails={setSelectedStory} />

                )}
                </div> :

              <div className="text-center py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Stories Found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results</p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              }
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Video Testimonials</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoTestimonials?.map((testimonial) =>
                <VideoTestimonial key={testimonial?.id} testimonial={testimonial} />
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of successful investors who have transformed their financial futures through strategic crypto and real estate investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/consultation-booking">
                  <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/crypto-trading-mastery">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Icon name="TrendingUp" size={20} className="mr-2" />
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {selectedStory &&
        <DetailModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)} />

        }
      </div>
    </>);

};

export default SuccessStories;