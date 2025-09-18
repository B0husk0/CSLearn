import React from 'react';
import { BookOpen, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to CyberSecLearn</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Empower yourself with essential cybersecurity knowledge. Learn to protect your digital life through interactive modules and engaging quizzes.
          </p>
          <Button 
            className="bg-black text-white hover:bg-gray-800 text-lg px-6 py-3"
            onClick={() => navigate('/login')} // Redirect to Login
          >
            Start Learning Now
          </Button>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card
            icon={BookOpen}
            title="Interactive Modules"
            description="Engage with real-world scenarios to learn practical cybersecurity skills. Our modules cover topics from phishing prevention to secure password creation."
          />
          <Card
            icon={Trophy}
            title="Gamified Learning"
            description="Earn badges and track your progress as you complete modules and quizzes. Challenge yourself to become a cybersecurity expert!"
          />
          <Card
            icon={Users}
            title="For Individuals & Teams"
            description="Whether you're an individual looking to enhance your skills or an organization aiming to train your team, CyberSecLearn has you covered."
          />
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to boost your cybersecurity knowledge?</h2>
          <Button 
            className="bg-black text-white hover:bg-gray-800 text-lg px-6 py-3"
            onClick={() => navigate('/signup')} // Redirect to Signup
          >
            Create Your Free Account
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
