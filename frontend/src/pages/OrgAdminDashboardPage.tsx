import React, { useEffect, useState } from 'react';
import {
  Users, ArrowUpDown, BarChart3, BookOpen, Brain, Trophy
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import API_URL from '../config';

interface UserProgress {
  userId: number;
  fullName: string;
  email: string;
  organizationName: string;
  modulesCompleted: number;
  totalModules: number;
  quizAverage: number;
  achievementsCount: number;
  role: number;
}

const OrgAdminDashboardPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<UserProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof UserProgress>('fullName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/organization`, {
          credentials: 'include'
        });

        if (!res.ok) {
          const text = await res.text();
          console.error(`Error ${res.status}:`, text);
          return;
        }

        const data = await res.json();
        setTeamMembers(data);
      } catch (err) {
        console.error('Failed to load org dashboard data', err);
      }
    };

    fetchData();
  }, []);

  const filtered = teamMembers
    .filter(m =>
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const dir = sortDirection === 'asc' ? 1 : -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * dir;
      }
      return ((aVal as number) - (bVal as number)) * dir;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Organization Dashboard</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search team members..." />

        {/* Štatistiky */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Users size={24} className="text-gray-500 mb-2" />
            <h3 className="text-2xl font-bold">{filtered.length}</h3>
            <p className="text-gray-600">Team Members</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <BookOpen size={24} className="text-gray-500 mb-2" />
            <h3 className="text-2xl font-bold">
              {filtered.length ? `${Math.round(filtered.reduce((sum, u) => sum + u.modulesCompleted / u.totalModules, 0) / filtered.length * 100)}%` : '0%'}
            </h3>
            <p className="text-gray-600">Avg. Completion</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Brain size={24} className="text-gray-500 mb-2" />
            <h3 className="text-2xl font-bold">
              {filtered.length ? `${Math.round(filtered.reduce((sum, u) => sum + u.quizAverage, 0) / filtered.length)}%` : '0%'}
            </h3>
            <p className="text-gray-600">Avg. Quiz Score</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Trophy size={24} className="text-gray-500 mb-2" />
            <h3 className="text-2xl font-bold">
              {filtered.reduce((sum, u) => sum + u.achievementsCount, 0)}
            </h3>
            <p className="text-gray-600">Achievements</p>
          </div>
        </div>

        {/* Tabuľka */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: 'fullName', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'modulesCompleted', label: 'Modules' },
                    { key: 'quizAverage', label: 'Quiz Avg.' },
                    { key: 'achievementsCount', label: 'Achievements' }
                  ].map(col => (
                    <th key={col.key} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      <button onClick={() => setSortField(col.key as keyof UserProgress)} className="flex items-center space-x-1">
                        <span>{col.label}</span>
                        <ArrowUpDown size={16} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map(user => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">{user.modulesCompleted}/{user.totalModules}</td>
                    <td className="px-6 py-4">{user.quizAverage}%</td>
                    <td className="px-6 py-4">{user.achievementsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrgAdminDashboardPage;
