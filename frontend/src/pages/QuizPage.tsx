import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Timer, 
  AlertCircle, 
  CheckCircle,
  Brain,
  HelpCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import DialogueBubble from '../components/DialogueBubble';
import API_URL from '../config';

interface Option {
  optionId: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
  bestScore?: number;
}

interface Character {
  name: string;
  avatar: string;
  role: string;
}

const characters: Record<string, Character> = {
  riley: {
    name: 'Riley',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    role: 'Cybersecurity Expert'
  },
  grace: {
    name: 'Grace',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    role: 'Privacy Specialist'
  }
};

const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const progress = quiz ? ((currentQuestionIndex + 1) / quiz.questions.length) * 100 : 0;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {


const response = await fetch(`${API_URL}/api/Quizzes/${quizId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
});


        if (!response.ok) throw new Error('Failed to fetch quiz details');

        const data = await response.json();
        setQuiz(data);
        setTimeRemaining(data.timeLimit);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    console.log("Quiz loaded:", quiz);
    console.log("Current question index:", currentQuestionIndex);
    console.log("Current question:", currentQuestion);
 }, [quiz, currentQuestionIndex]);
 
  useEffect(() => {
    if (timeRemaining && timeRemaining > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      setQuizCompleted(true);
    }
  }, [timeRemaining, quizCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
  
    console.log("Selecting answer, answerIndex:", answerIndex);  // Log selected answer index
  
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
  
    // Adjust the correctAnswer from the backend to match the 0-indexed frontend answer
    const adjustedCorrectAnswer = currentQuestion ? currentQuestion.correctAnswer - 1 : -1;
  
    console.log("Adjusted correct answer (for comparison):", adjustedCorrectAnswer);  // Log the adjusted correct answer
  
    // Check if currentQuestion is defined before using it
    if (currentQuestion) {
      console.log("Current Question ID:", currentQuestion.questionId);  // Log current question ID
      setAnswers((prev) => {
        const updatedAnswers = { ...prev, [currentQuestion.questionId]: answerIndex };
        console.log("Updated answers:", updatedAnswers);  // Log the updated answers state
        return updatedAnswers;
      });
    } else {
      console.error("Error: currentQuestion is undefined at the time of answer selection.");
    }
  
    // Compare the selected answer with the adjusted correct answer
    const isAnswerCorrect = adjustedCorrectAnswer === answerIndex;
    console.log("Is the selected answer correct?", isAnswerCorrect);
  };
  
  
  
  
 

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    if (!quiz) return 0;
  
    // Count the correct answers
    const correctAnswers = quiz.questions.reduce((total, question) => {
      const selected = answers[question.questionId]; // Selected answer for this question
      return selected === question.correctAnswer - 1 ? total + 1 : total;
    }, 0);
  
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };
  
  const submitScore = async (score: number) => {
    try {
      
      
  
      const response = await fetch(`${API_URL}/api/Quizzes/${quizId}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(score),
      });
  
if (!response.ok) {
  const errorText = await response.text();
  console.error('Submit failed:', response.status, errorText);
  throw new Error('Failed to submit score');
}

  
      console.log('Score submitted successfully');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };
  
  useEffect(() => {
    if (quizCompleted) {
      const score = calculateScore();
      submitScore(score); // Submit the score once the quiz is completed
    }
  }, [quizCompleted]);
  

  const getCharacterComment = () => {
    if (!showFeedback || !currentQuestion) return null;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer - 1;
    return {
      character: isCorrect ? characters.riley : characters.grace,
      position: isCorrect ? 'left' : 'right' as const,
      content: isCorrect
        ? "Great job! That's exactly right!"
        : currentQuestion.explanation,
    };
  };

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center text-gray-600">
        <p>Loading...</p>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <Brain className="mx-auto mb-4" size={48} />
              <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
              <p className="text-xl mb-2">Your Score: {score}%</p>
              <p className="text-gray-600">
                {score >= 80 ? 'Excellent work!' : 'Keep practicing to improve!'}
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate('/quizzes')} className="bg-black text-white hover:bg-gray-800">
                Back to Quizzes
              </Button>
              <Button onClick={() => window.location.reload()} className="border border-black hover:bg-gray-50">
                Retake Quiz
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/quizzes')}
              className="flex items-center text-gray-600 hover:text-black"
            >
              <ChevronLeft size={20} />
              <span>Back to Quizzes</span>
            </button>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Timer size={20} className="mr-2" />
              <span className="font-medium">{formatTime(timeRemaining || 0)}</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <span className="text-sm font-medium bg-black text-white px-3 py-1 rounded-full">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {getCharacterComment() && (
            <div className="mb-8">
              <DialogueBubble {...getCharacterComment()!} />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-xl font-medium">{currentQuestion?.text}</h2>
              </div>
            </div>

            <div className="space-y-4">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswer === index
                      ? index === currentQuestion.correctAnswer - 1
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="flex-grow">{option.text}</span>
                    {showFeedback && selectedAnswer === index && (
                      index === currentQuestion.correctAnswer - 1 ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
                      )
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!showFeedback}
              className={`bg-black text-white hover:bg-gray-800 ${
                !showFeedback && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuizPage;
