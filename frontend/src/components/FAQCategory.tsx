import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategoryProps {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
  expanded: boolean;
  onToggle: () => void;
}

const FAQCategory: React.FC<FAQCategoryProps> = ({
  title,
  icon,
  items,
  expanded,
  onToggle
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {expanded && (
        <div className="border-t border-gray-200">
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-4 bg-white ${
                index !== items.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <h4 className="font-medium mb-2">{item.question}</h4>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQCategory;