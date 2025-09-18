import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-100 py-8 mt-auto">
    <div className="container mx-auto px-4 text-center text-gray-600">
      <p className="mb-4">&copy; 2024 CyberSecLearn. All rights reserved.</p>
      <nav className="space-x-4">
        <a href="/home/about" className="hover:text-black">About</a>
        <a href="/home/contact" className="hover:text-black">Contact</a>
        <a href="/home/feedback" className="hover:text-black">Feedback</a>
        <a href="/home/privacy" className="hover:text-black">Privacy Policy</a>
        <a href="/home/terms" className="hover:text-black">Terms of Service</a>
      </nav>
    </div>
  </footer>
);

export default Footer;