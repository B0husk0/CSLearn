import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, AlertCircle, CheckCircle, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('success');
    // Reset form after success
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@cyberseclearn.com',
      link: 'mailto:support@cyberseclearn.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'San Francisco, CA',
      link: null
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our platform? We're here to help you with anything you need.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      {contactInfo.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="p-2 bg-white rounded-lg mr-4">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{item.title}</h3>
                            {item.link ? (
                              <a 
                                href={item.link}
                                className="text-gray-600 hover:text-black"
                              >
                                {item.content}
                              </a>
                            ) : (
                              <p className="text-gray-600">{item.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="font-semibold mb-4">Live Chat Support</h3>
                      <Button 
                        className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center"
                        onClick={() => {}}
                      >
                        <MessageSquare size={20} className="mr-2" />
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                    {status === 'success' && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                        <CheckCircle className="text-green-500 mr-2" size={20} />
                        <p className="text-green-700">Your message has been sent successfully!</p>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <AlertCircle className="text-red-500 mr-2" size={20} />
                        <p className="text-red-700">There was an error sending your message. Please try again.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormInput
                          icon={User}
                          type="text"
                          label="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                        <FormInput
                          icon={Mail}
                          type="email"
                          label="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>

                      <FormInput
                        icon={MessageSquare}
                        type="text"
                        label="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        required
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                            placeholder:text-gray-400 resize-none"
                          required
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="submit"
                          className="bg-black text-white hover:bg-gray-800 flex items-center"
                          disabled={status === 'success'}
                        >
                          <Send size={20} className="mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    question: "How quickly can I expect a response?",
                    answer: "We typically respond to all inquiries within 24 hours during business days."
                  },
                  {
                    question: "Do you offer technical support?",
                    answer: "Yes, our technical support team is available 24/7 through live chat and email."
                  }
                  
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;