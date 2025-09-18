import React from 'react';
import { MessageSquare, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import Button from './Button';

interface FeedbackFormProps {
  onSubmit: (data: {
    rating: number;
    category: string;
    message: string;
    recommend: boolean | null;
  }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = React.useState<number>(0);
  const [category, setCategory] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [recommend, setRecommend] = React.useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, category, message, recommend });
    // Reset form
    setRating(0);
    setCategory('');
    setMessage('');
    setRecommend(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How would you rate your experience?
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`p-2 rounded-full transition-colors ${
                rating >= value ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              <Star size={24} fill={rating >= value ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What area would you like to give feedback about?
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          required
        >
          <option value="">Select a category</option>
          <option value="content">Learning Content</option>
          <option value="platform">Platform Experience</option>
          <option value="support">Customer Support</option>
          <option value="technical">Technical Issues</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Share your thoughts
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            resize-none"
          placeholder="Tell us what you think..."
          required
        />
      </div>

      {/* Recommendation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Would you recommend CyberSecLearn to others?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setRecommend(true)}
            className={`flex items-center px-4 py-2 rounded-full border transition-colors ${
              recommend === true
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ThumbsUp size={20} className="mr-2" />
            Yes
          </button>
          <button
            type="button"
            onClick={() => setRecommend(false)}
            className={`flex items-center px-4 py-2 rounded-full border transition-colors ${
              recommend === false
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ThumbsDown size={20} className="mr-2" />
            No
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center"
      >
        <MessageSquare size={20} className="mr-2" />
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;