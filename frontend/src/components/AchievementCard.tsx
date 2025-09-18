import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  icon: Icon,
  title,
  description
}) => {
  return (
    <div className="flex items-center p-4 rounded-lg hover:bg-gray-50">
      <div className="p-2 bg-gray-100 rounded-lg mr-4">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default AchievementCard;