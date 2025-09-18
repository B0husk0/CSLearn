import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface LegalSectionProps {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
}

const LegalSection: React.FC<LegalSectionProps> = ({ icon: Icon, title, content }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-gray-100 rounded-lg mr-3">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="prose prose-gray max-w-none">
        {content}
      </div>
    </section>
  );
};

export default LegalSection;