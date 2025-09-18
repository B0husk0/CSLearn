import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from './Button';

interface FeedbackSuccessProps {
  onReset: () => void;
}

const FeedbackSuccess: React.FC<FeedbackSuccessProps> = ({ onReset }) => {
  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <CheckCircle size={48} className="mx-auto text-green-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
      <p className="text-gray-600 mb-6">
        Your feedback has been submitted successfully. We appreciate your input!
      </p>
      <Button
        onClick={onReset}
        className="bg-black text-white hover:bg-gray-800"
      >
        Submit Another Response
      </Button>
    </div>
  );
};

export default FeedbackSuccess;