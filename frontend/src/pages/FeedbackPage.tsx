import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackSuccess from '../components/FeedbackSuccess';
import API_URL from '../config';

const FeedbackPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    rating: number;
    category: string;
    message: string;
    recommend: boolean | null;
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/Feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-12">
                <div className="inline-block p-3 bg-black rounded-full mb-4">
                  <MessageSquare size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Share Your Feedback</h1>
                <p className="text-xl text-gray-600">
                  Help us improve your learning experience. Your feedback is anonymous and valuable to us.
                </p>
              </div>

              {error && (
                <div className="mb-6 text-red-600 text-center">
                  {error}
                </div>
              )}

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <FeedbackForm onSubmit={handleSubmit} />
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <FeedbackSuccess onReset={() => setIsSubmitted(false)} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeedbackPage;
