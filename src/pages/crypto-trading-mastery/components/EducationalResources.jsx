import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/UI/Button';

const EducationalResources = () => {
  const resources = [
  {
    id: 1,
    type: "Guide",
    title: "Complete Beginner\'s Guide to Cryptocurrency Trading",
    description: "Everything you need to know to start your crypto journey with confidence. From wallet setup to your first trade.",
    image: "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e",
    imageAlt: "Modern workspace setup with laptop displaying cryptocurrency trading charts and graphs, smartphone showing crypto wallet app, notebook with handwritten trading notes, and coffee cup on clean white desk",
    downloadSize: "2.4 MB",
    pages: "48 pages",
    level: "Beginner",
    downloads: "2,847"
  },
  {
    id: 2,
    type: "Ebook",
    title: "Advanced Technical Analysis for Crypto Markets",
    description: "Master chart patterns, indicators, and trading signals specific to cryptocurrency markets.",
    image: "https://images.unsplash.com/photo-1652534568870-794f8fbaf96b",
    imageAlt: "Professional trader analyzing multiple cryptocurrency candlestick charts on large monitor screen showing Bitcoin and Ethereum price movements with technical indicators and volume bars in dark trading interface",
    downloadSize: "5.8 MB",
    pages: "124 pages",
    level: "Advanced",
    downloads: "1,523"
  },
  {
    id: 3,
    type: "Checklist",
    title: "Pre-Trade Risk Assessment Framework",
    description: "Essential checklist to evaluate every trade opportunity and manage risk effectively.",
    image: "https://images.unsplash.com/photo-1685099174002-71957f38758b",
    imageAlt: "Close-up of hands holding tablet displaying cryptocurrency risk management dashboard with pie charts showing portfolio allocation, risk metrics, and stop-loss indicators against blurred office background",
    downloadSize: "890 KB",
    pages: "12 pages",
    level: "All Levels",
    downloads: "4,192"
  },
  {
    id: 4,
    type: "Video Course",
    title: "Portfolio Diversification Strategies",
    description: "Learn how to build a balanced crypto portfolio that maximizes returns while minimizing risk.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_124afdd24-1763550410874.png",
    imageAlt: "Professional video recording setup with camera filming cryptocurrency investment expert presenting portfolio diversification concepts using whiteboard with colorful charts and digital asset allocation diagrams",
    downloadSize: "Video",
    pages: "8 modules",
    level: "Intermediate",
    downloads: "987"
  }];


  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':return 'success';
      case 'Intermediate':return 'warning';
      case 'Advanced':return 'error';
      default:return 'secondary';
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Icon name="GraduationCap" size={20} />
            <span className="text-sm font-semibold">Educational Resources</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Free Resources to Accelerate Your Learning
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Download comprehensive guides, checklists, and frameworks that have helped thousands of traders improve their crypto investment strategies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {resources?.map((resource) =>
          <div
            key={resource?.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">

              <div className="relative h-56 overflow-hidden">
                <Image
                src={resource?.image}
                alt={resource?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                <div className="absolute top-4 left-4">
                  <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-foreground">
                    {resource?.type}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`bg-${getLevelColor(resource?.level)}/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-white`}>
                    {resource?.level}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {resource?.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {resource?.description}
                </p>
                
                <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="FileText" size={16} />
                      <span>{resource?.pages}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="HardDrive" size={16} />
                      <span>{resource?.downloadSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={16} />
                    <span>{resource?.downloads} downloads</span>
                  </div>
                </div>
                
                <Button
                variant="outline"
                size="default"
                fullWidth
                iconName="Download"
                iconPosition="left">

                  Download Free
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <Icon name="Sparkles" size={48} color="white" className="mx-auto mb-6" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want More Exclusive Content?
            </h3>
            
            <p className="text-white/90 mb-8 text-lg">
              Join my newsletter to receive weekly market analysis, trading tips, and exclusive resources delivered directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />

              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
            
            <p className="text-white/70 text-sm mt-4">
              Join 5,000+ traders receiving weekly insights
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default EducationalResources;