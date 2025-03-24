import { researchItems } from '../lib/data';
import ResearchItemComponent from '../components/ResearchItem';

const Research = () => {
  return (
    <div className="fadeIn">
      {/* Header Section */}
      <div className="diagonal-bg py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h1 className="font-space font-bold text-3xl md:text-5xl text-white text-center mb-4">
            Research - Advancing Autonomous Technology
          </h1>
          <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
            Our cutting-edge research contributes to the global community of autonomous systems development
          </p>
        </div>
      </div>

      {/* Research Content */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* Research Entries */}
          {researchItems.map((item) => (
            <ResearchItemComponent key={item.id} research={item} />
          ))}

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-foreground/70 italic">Research conducted by Aprameya members</p>
            <p className="mt-2 text-sm text-foreground/60">
              For research collaboration inquiries, please contact{' '}
              <a href="mailto:research@aprameyaklu.com" className="text-primary hover:underline">
                research@aprameyaklu.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
