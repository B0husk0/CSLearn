import React, { useState, useMemo } from 'react';
import {
  Shield,
  BookOpen,
  CreditCard,
  Users,
  HelpCircle,
  Settings,
  Laptop
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FAQCategory from '../components/FAQCategory';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const faqCategories: FAQCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen size={24} />,
      items: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner and follow the registration process. You\'ll need to provide your email address and create a password.'
        },
        {
          question: 'Is there a free trial?',
          answer: 'Yes! We offer a 14-day free trial with access to all features. No credit card required.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Shield size={24} />,
      items: [
        {
          question: 'How is my data protected?',
          answer: 'We use industry-standard encryption and security measures to protect your data. All information is stored on secure servers with regular backups.'
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account at any time from your profile settings. All your data will be permanently removed.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      icon: <CreditCard size={24} />,
      items: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.'
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
        }
      ]
    },
    {
      id: 'teams',
      title: 'Teams & Organizations',
      icon: <Users size={24} />,
      items: [
        {
          question: 'How do team accounts work?',
          answer: 'Team accounts allow multiple users to access the platform under one organization. Administrators can manage user permissions and track team progress.'
        },
        {
          question: 'Is there bulk pricing for teams?',
          answer: 'Yes, we offer special pricing for teams of 5 or more users. Contact our sales team for details.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: <Laptop size={24} />,
      items: [
        {
          question: 'What browsers are supported?',
          answer: 'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge.'
        },
        {
          question: 'Is there offline access?',
          answer: 'Currently, an internet connection is required to access the platform. We\'re working on offline capabilities for the future.'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return faqCategories;

    const query = searchQuery.toLowerCase();
    return faqCategories.map(category => ({
      ...category,
      items: category.items.filter(
        item =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-black rounded-full">
                <HelpCircle size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for answers..."
            />
          </div>

          <div className="space-y-4">
            {filteredCategories.map(category => (
              <FAQCategory
                key={category.id}
                title={category.title}
                icon={category.icon}
                items={category.items}
                expanded={expandedCategories.includes(category.id)}
                onToggle={() => toggleCategory(category.id)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 flex items-center"
              >
                <Settings size={20} className="mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;