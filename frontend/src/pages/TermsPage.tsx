import React from 'react';
import { Shield, Scale, Users, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalSection from '../components/LegalSection';
import DownloadButton from '../components/DownloadButton';

const TermsPage: React.FC = () => {
  const handleDownload = () => {
    // TODO: PDF download
    console.log('Downloading Terms of Service PDF');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-gray-600">Last updated: March 15, 2024</p>
            </div>
            <DownloadButton
              onClick={handleDownload}
              label="Download PDF"
            />
          </div>

          <LegalSection
            icon={Shield}
            title="1. Acceptance of Terms"
            content={
              <div className="space-y-4">
                <p>
                  By accessing and using CyberSecLearn's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Your continued use of the platform following the posting of changes will be deemed your acceptance of those changes.
                </p>
              </div>
            }
          />

          <LegalSection
            icon={Users}
            title="2. User Accounts"
            content={
              <div className="space-y-4">
                <p>
                  You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for all activity that occurs under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            }
          />

          <LegalSection
            icon={Scale}
            title="3. Intellectual Property"
            content={
              <div className="space-y-4">
                <p>
                  All content, features, and functionality of the CyberSecLearn platform, including but not limited to text, graphics, logos, and software, are owned by CyberSecLearn and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not modify, reproduce, distribute, create derivative works of, publicly display, or exploit in any way any of the platform's content without explicit written permission.
                </p>
              </div>
            }
          />

          <LegalSection
            icon={AlertTriangle}
            title="4. Limitation of Liability"
            content={
              <div className="space-y-4">
                <p>
                  CyberSecLearn shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the platform or any content.
                </p>
                <p>
                  We make no warranties or representations about the accuracy or completeness of the platform's content or the content of any websites linked to our platform.
                </p>
              </div>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;