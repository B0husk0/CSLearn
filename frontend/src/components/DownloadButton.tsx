import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  label: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
    >
      <Download size={20} className="mr-2" />
      {label}
    </button>
  );
};

export default DownloadButton;