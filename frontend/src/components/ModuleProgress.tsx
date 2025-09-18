import React from 'react';

interface ModuleProgressProps {
  progress: number;
  moduleName: string;
}

const ModuleProgress: React.FC<ModuleProgressProps> = ({ progress, moduleName }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">{moduleName}</h2>
        <span className="text-sm font-medium bg-black text-white px-3 py-1 rounded-full">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ModuleProgress;
