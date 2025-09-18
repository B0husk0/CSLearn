import React from 'react';
import { type LucideIcon, ChevronRight } from 'lucide-react';

interface ProgressCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  total?: number;
  label: string;
  suffix?: string;
  onClick: () => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  icon: Icon,
  title,
  value,
  total,
  label,
  suffix = '',
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left w-full hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon size={24} />
        <ChevronRight size={20} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}{suffix}</span>
        {total && <span className="text-gray-500 ml-1">/ {total}</span>}
      </div>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </button>
  );
};

export default ProgressCard;