import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';
import Button from './Button';

interface QuizCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  questionsCount: number;
  timeLimit: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  bestScore?: number;
  quizId: number; // Add quizId to navigate to the quiz page
}

const QuizCard: React.FC<QuizCardProps> = ({
  icon: Icon,
  title,
  description,
  questionsCount,
  timeLimit,
  difficulty,
  bestScore,
  quizId // Ensure quizId is passed as a prop
}) => {
  const navigate = useNavigate();

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Icon className="text-black mr-2" size={24} />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
        <span className="px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {questionsCount} Questions
        </span>
        <span className="px-2 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {timeLimit} Minutes
        </span>
      </div>

      {bestScore !== undefined && (
        <div className="mb-4 p-2 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Best Score: <span className="ml-1 font-semibold text-black">{bestScore}%</span>
          </p>
        </div>
      )}

      <Button
        onClick={() => navigate(`/quizzes/${quizId}`)} // Navigate to quiz details page
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        {bestScore !== undefined ? 'Retake Quiz' : 'Start Quiz'}
      </Button>
    </div>
  );
};

export default QuizCard;
