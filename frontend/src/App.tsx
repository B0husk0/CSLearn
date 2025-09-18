
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OrgAdminDashboardPage from './pages/OrgAdminDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/:quizId" element={<QuizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home/about" element={<AboutPage />} />
        <Route path="/home/contact" element={<ContactPage />} />
        <Route path="/home/faq" element={<FAQPage />} />
        <Route path="/home/terms" element={<TermsPage />} />
        <Route path="/home/privacy" element={<PrivacyPage />} />
        <Route path="/home/feedback" element={<FeedbackPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/org-admin" element={<OrgAdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;