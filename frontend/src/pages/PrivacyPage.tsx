import React from 'react';
import { Shield, Database, Eye, Bell, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalSection from '../components/LegalSection';
import DownloadButton from '../components/DownloadButton';

const PrivacyPage: React.FC = () => {
  const handleDownload = () => {
    // TODO: PDF download
    console.log('Downloading Privacy Policy PDF');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: March 15, 2024</p>
            </div>
            <DownloadButton
              onClick={handleDownload}
              label="Download PDF"
            />
          </div>

          <LegalSection
            icon={Shield}
            title="1. Information We Collect"
            content={
              <div className="space-y-4">
                <p>
                  We collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account or update your profile</li>
                  <li>Participate in courses, quizzes, or assessments</li>
                  <li>Contact us for support or submit feedback</li>
                  <li>Subscribe to our newsletter or promotional communications</li>
                </ul>
              </div>
            }
          />

          <LegalSection
            icon={Database}
            title="2. How We Use Your Information"
            content={
              <div className="space-y-4">
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Track your progress and customize your learning experience</li>
                  <li>Send you technical notices, updates, and administrative messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                </ul>
              </div>
            }
          />

          <LegalSection
            icon={Eye}
            title="3. Information Sharing"
            content={
              <div className="space-y-4">
                <p>
                  We do not sell, rent, or share your personal information with third parties except as described in this policy. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who assist in operating our platform</li>
                  <li>Law enforcement or other parties when required by law</li>
                  <li>Other users if you choose to make your profile public</li>
                </ul>
              </div>
            }
          />

          <LegalSection
            icon={Lock}
            title="4. Data Security"
            content={
              <div className="space-y-4">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>
                  While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            }
          />

          <LegalSection
            icon={Bell}
            title="5. Your Rights and Choices"
            content={
              <div className="space-y-4">
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, correct, or delete your personal information</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Receive a copy of your personal information</li>
                  <li>Withdraw consent at any time for future processing</li>
                </ul>
              </div>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;