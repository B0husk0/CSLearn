import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import API_URL from '../config';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user-profile`, {
          method: 'GET',
          credentials: 'include', // ← cookie bude poslané
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Failed to verify authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/Auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Shield className="text-black" size={24} />
          <span className="text-2xl font-bold">CyberSecLearn</span>
        </div>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button className="text-black hover:bg-gray-100" onClick={() => navigate('/modules')}>
                Modules
              </Button>
              <Button className="text-black hover:bg-gray-100" onClick={() => navigate('/quizzes')}>
                Quizzes
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button className="text-black hover:bg-gray-100" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="text-black hover:bg-gray-100" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
