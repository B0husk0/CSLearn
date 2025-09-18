import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DialogueBubble from '../components/DialogueBubble';
import Button from '../components/Button';
import ModuleProgress from '../components/ModuleProgress';
import API_URL from '../config';

interface Character {
  name: string;
  avatar: string;
  role: string;
}

const characters: Record<string, Character> = {
  riley: {
    name: 'Riley',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    role: 'Cybersecurity Expert',
  },
  grace: {
    name: 'Grace',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    role: 'Privacy Specialist',
  },
  blade: {
    name: 'Blade',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    role: 'Ethical Hacker'
  },
};

const ModuleDetailPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Module/${moduleId}`);
        if (response.ok) {
          const data = await response.json();
          setModuleDetails(data);
        } else {
          console.error('Failed to fetch module details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const updateProgress = async (progressValue: number) => {
    setProgress(progressValue);
    try {
      const response = await fetch(`${API_URL}/api/Modules/Progress/${moduleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(progressValue),
      });
      if (!response.ok) {
        console.error('Failed to update module progress');
      }
    } catch (error) {
      console.error('Error updating module progress:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < moduleDetails.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setShowFeedback(false);
      const newProgress = ((currentStep + 2) / moduleDetails.steps.length) * 100;
      updateProgress(Math.min(100, Math.round(newProgress)));
    } else {
      updateProgress(100); // Complete module
      navigate('/modules');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setShowFeedback(false);
    }
  };

  const handleAnswer = (stepIndex: number, answerIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [stepIndex]: answerIndex }));
    setShowFeedback(true);
  };

  if (!moduleDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Loading module details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStepData = moduleDetails.steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/modules')}
              className="flex items-center text-gray-600 hover:text-black"
            >
              <ChevronLeft size={20} />
              <span>Back to Modules</span>
            </button>
          </div>

          <ModuleProgress progress={progress}
          moduleName={moduleDetails.moduleName} />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="space-y-8">
              <DialogueBubble
                character={
                  characters[currentStepData.characterName.toLowerCase()] || {
                    name: currentStepData.characterName,
                    avatar: `https://via.placeholder.com/100?text=${currentStepData.characterName}`,
                    role: 'Module Character',
                  }
                }
                position={currentStepData.position}
                content={currentStepData.content}
              />

              {currentStepData.stepType === 'quiz' && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Choose the correct answer:</h3>
                  <div className="space-y-3">
                    {currentStepData.quizOptions?.map((option: any, index: number) => (
                      <button
                        key={option.optionId}
                        onClick={() => handleAnswer(currentStep, index)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          userAnswers[currentStep] === index
                            ? option.isCorrect
                              ? 'bg-green-50 border-green-200'
                              : 'bg-red-50 border-red-200'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="flex-grow">{option.optionText}</span>
                          {showFeedback && userAnswers[currentStep] === index && (
                            option.isCorrect ? (
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
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center ${
                currentStep === 0 ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <ChevronLeft size={20} className="mr-1" />
              Previous
            </Button>
            <div className="flex items-center">
              <PlayCircle size={20} className="mr-2" />
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {moduleDetails.steps.length}
              </span>
            </div>
            <Button
              onClick={handleNext}
              className="flex items-center bg-black text-white hover:bg-gray-800"
            >
              {currentStep === moduleDetails.steps.length - 1 ? 'Complete Module' : 'Next'}
              <ChevronRight size={20} className="ml-1" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModuleDetailPage;
