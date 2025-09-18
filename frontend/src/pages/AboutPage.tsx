import React from 'react';
import { Shield, Heart, Users, Globe, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  description: string;
}

interface Character {
  name: string;
  role: string;
  avatar: string;
  description: string;
  specialty: string;
}

const AboutPage: React.FC = () => {
  const characters: Character[] = [
    {
      name: 'Riley',
      role: 'Cybersecurity Expert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description: 'A seasoned cybersecurity professional who guides learners through complex security concepts with practical, real-world examples.',
      specialty: 'Network Security & Threat Detection'
    },
    {
      name: 'Grace',
      role: 'Privacy Specialist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      description: 'An advocate for digital privacy who helps users understand the importance of protecting personal data in the modern world.',
      specialty: 'Data Protection & Privacy Laws'
    },
    {
      name: 'Blade',
      role: 'Ethical Hacker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'A white-hat hacker who demonstrates security vulnerabilities and teaches defensive techniques through hands-on exercises.',
      specialty: 'Penetration Testing & Security Auditing'
    },
    {
      name: 'Sam',
      role: 'Security Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      description: 'A detail-oriented analyst who breaks down complex security incidents into learnable lessons for all skill levels.',
      specialty: 'Incident Response & Risk Assessment'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Expert-Led Learning',
      description: 'Learn from industry professionals with real-world experience in cybersecurity.'
    },
    {
      icon: Heart,
      title: 'Engaging Content',
      description: 'Interactive modules and quizzes designed to make learning both effective and enjoyable.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Join a community of learners and professionals passionate about cybersecurity.'
    },
    {
      icon: Globe,
      title: 'Always Updated',
      description: 'Stay current with the latest cybersecurity trends and best practices.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Securing the Digital Future</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              CyberSecLearn is dedicated to making cybersecurity education accessible, 
              engaging, and effective for everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe that cybersecurity knowledge should be accessible to everyone. 
                Our platform combines expert knowledge, engaging content, and practical 
                exercises to help you build real-world security skills.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Sparkles className="mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2">50,000+</h3>
                  <p className="text-gray-600">Active Learners</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Shield className="mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2">100+</h3>
                  <p className="text-gray-600">Security Modules</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose CyberSecLearn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <feature.icon className="mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Characters Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Your Instructors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {characters.map((character, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{character.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{character.role}</p>
                    <p className="text-gray-600 mb-4">{character.description}</p>
                    <div className="bg-gray-50 px-4 py-2 rounded-full text-sm">
                      <span className="font-medium">Specialty:</span> {character.specialty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;