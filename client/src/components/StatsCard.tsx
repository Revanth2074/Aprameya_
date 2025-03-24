import { StatItem } from '../lib/types';

interface StatsCardProps {
  stats: StatItem[];
}

const StatsCard = ({ stats }: StatsCardProps) => {
  return (
    <div className="py-16 px-4 bg-muted">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-lg">
              <div className="text-primary text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-foreground/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
