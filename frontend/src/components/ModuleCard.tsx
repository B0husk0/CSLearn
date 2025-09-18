import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  moduleId: number; // Add moduleId to link to the correct module
}

const ModuleCard: React.FC<ModuleCardProps> = ({ icon: Icon, title, description, progress, moduleId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/modules/${moduleId}`); // Redirect to the module detail page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-4">
        <Icon className="text-black mr-2" size={24} />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-gray-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-black">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
          ></div>
        </div>
      </div>
      <Button
        className="w-full bg-black text-white hover:bg-gray-800"
        onClick={handleButtonClick}
      >
        {progress === 0 ? 'Start Module' : 'Continue Module'}
      </Button>
    </div>
  );
};

export default ModuleCard;
