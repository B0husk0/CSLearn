import React, { useEffect, useState } from 'react';
import { Brain, ShieldAlert, Network, Mail, Smartphone, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizCard from '../components/QuizCard';
import API_URL from '../config';

interface Quiz {
  quizId: number;
  title: string;
  description: string;
  questionsCount: number;
  timeLimit: number;
  difficulty: string;
  bestScore?: number;
  icon: React.ElementType;
}

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {


        const response = await fetch(`${API_URL}/api/Quizzes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }

        const quizzesData = await response.json();

        // Map icons for quizzes
        const icons: Record<number, React.ElementType> = {
          1: Brain,
          2: ShieldAlert,
          3: Network,
          4: Mail,
          5: Smartphone,
          6: Lock,
          7: Shield, // Default or additional icons
        };

        const formattedQuizzes = quizzesData.map((quiz: any) => ({
          quizId: quiz.quizId,
          title: quiz.title,
          description: quiz.description,
          questionsCount: quiz.questionsCount,
          timeLimit: Math.ceil(quiz.timeLimit / 60), // Convert timeLimit from seconds to minutes
          difficulty: quiz.difficulty,
          bestScore: quiz.bestScore || undefined,
          icon: icons[quiz.quizId] || Brain, // Assign icon
        }));

        setQuizzes(formattedQuizzes);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Quizzes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your cybersecurity knowledge with our interactive quizzes.
          </p>
        </div>

        {error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.quizId}
                icon={quiz.icon}
                title={quiz.title}
                description={quiz.description}
                questionsCount={quiz.questionsCount}
                timeLimit={quiz.timeLimit}
                difficulty={quiz.difficulty}
                bestScore={quiz.bestScore}
                quizId={quiz.quizId} // Pass quizId for navigation
                onStartQuiz={() => navigate(`/quiz/${quiz.quizId}`)} // Navigate to quiz details
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default QuizzesPage;
