import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface RecentActivityCardProps {
  icon: LucideIcon;
  title: string;
  type: 'module' | 'quiz';
  progress?: number;
  score?: number;
  lastAccessed: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  icon: Icon,
  title,
  type,
  progress,
  score,
  lastAccessed
}) => {
  return (
    <div className="flex items-center p-4 rounded-lg hover:bg-gray-50">
      <div className="p-2 bg-gray-100 rounded-lg mr-4">
        <Icon size={24} />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">
          {type === 'module' 
            ? `${progress}% completed` 
            : `Score: ${score}%`}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{lastAccessed}</p>
      </div>
    </div>
  );
};

export default RecentActivityCard;