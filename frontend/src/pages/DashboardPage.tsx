import React from 'react';
import { RecentActivityCardProps } from '../components/RecentActivityCard';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  BookOpen, 
  Brain, 
  Clock, 
  BarChart3, 
  Star,
  ChevronRight,
  Award
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressCard from '../components/ProgressCard';
import RecentActivityCard from '../components/RecentActivityCard';
import AchievementCard from '../components/AchievementCard';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const achievements = [
    { icon: Trophy, title: 'Quick Learner', description: 'Completed first module' },
    { icon: Star, title: 'Perfect Score', description: 'Achieved 100% in a quiz' },
    { icon: Award, title: 'Dedicated Student', description: '5 day streak' },
  ];

  const recentActivities: RecentActivityCardProps[] = [
    { 
      title: 'Password Security', 
      type: 'module', // Matches "module"
      progress: 75,
      lastAccessed: '2 hours ago',
      icon: BookOpen 
    },
    { 
      title: 'Phishing Prevention', 
      type: 'quiz', // Matches "quiz"
      score: 90,
      lastAccessed: '1 day ago',
      icon: Brain
    },
    { 
      title: 'Data Protection', 
      type: 'module', // Matches "module"
      progress: 25,
      lastAccessed: '3 days ago',
      icon: BookOpen 
    },
  ];
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <ProgressCard
            icon={BookOpen}
            title="Module Progress"
            value={42}
            total={100}
            label="lessons completed"
            onClick={() => navigate('/modules')}
          />
          <ProgressCard
            icon={Brain}
            title="Quiz Performance"
            value={85}
            label="average score"
            suffix="%"
            onClick={() => navigate('/quizzes')}
          />
          <ProgressCard
            icon={Clock}
            title="Learning Streak"
            value={5}
            label="consecutive days"
            suffix=" days"
            onClick={() => {}}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <button 
                  onClick={() => navigate('/modules')}
                  className="text-sm text-black hover:text-gray-600 flex items-center"
                >
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <RecentActivityCard key={index} {...activity} />
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Learning Statistics</h2>
                <BarChart3 size={20} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Modules Started</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Quizzes Taken</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-gray-600">Avg. Score</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-sm text-gray-600">Time Spent</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={index} {...achievement} />
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/modules')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center"
                >
                  <BookOpen size={20} className="mr-3" />
                  <span>Continue Learning</span>
                </button>
                <button
                  onClick={() => navigate('/quizzes')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center"
                >
                  <Brain size={20} className="mr-3" />
                  <span>Take a Quiz</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;