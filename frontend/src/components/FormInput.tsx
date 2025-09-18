import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ icon: Icon, label, className = '', ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            placeholder:text-gray-400 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;