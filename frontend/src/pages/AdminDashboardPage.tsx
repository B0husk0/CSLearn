import React, { useEffect, useState } from 'react';
import {
  Users, Search, Download, ArrowUpDown, BarChart3, Building2, BookOpen, Brain
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

const AdminDashboardPage: React.FC = () => {
  const [users, setUsers] = useState<UserProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof UserProgress>('fullName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/dashboard/admin`, {
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.warn('User not authenticated.');
        } else {
          const text = await res.text();
          console.error(`Error ${res.status}:`, text);
        }
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load admin dashboard data', err);
    }
  };

  fetchData();
}, []);


  const filteredUsers = users
    .filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organizationName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }
      return ((aValue as number) - (bValue as number)) * direction;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search..." />
        {/* Štatistiky */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <Users size={24} className="text-gray-500 mb-2" />
    <h3 className="text-2xl font-bold">{users.length}</h3>
    <p className="text-gray-600">Total Users</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <BookOpen size={24} className="text-gray-500 mb-2" />
    <h3 className="text-2xl font-bold">
      {users.length ? `${Math.round(users.reduce((sum, u) => sum + u.modulesCompleted / u.totalModules, 0) / users.length * 100)}%` : '0%'}
    </h3>
    <p className="text-gray-600">Avg. Completion</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <Brain size={24} className="text-gray-500 mb-2" />
    <h3 className="text-2xl font-bold">
      {users.length ? `${Math.round(users.reduce((sum, u) => sum + u.quizAverage, 0) / users.length)}%` : '0%'}
    </h3>
    <p className="text-gray-600">Avg. Quiz Score</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <Building2 size={24} className="text-gray-500 mb-2" />
    <h3 className="text-2xl font-bold">
      {new Set(users.map(u => u.organizationName)).size}
    </h3>
    <p className="text-gray-600">Organizations</p>
  </div>
</div>

{/* Tabuľka */}
<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {[
            { key: 'fullName', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'organizationName', label: 'Organization' },
            { key: 'modulesCompleted', label: 'Modules' },
            { key: 'quizAverage', label: 'Quiz Avg.' },
            { key: 'achievementsCount', label: 'Achievements' }
          ].map(column => (
            <th key={column.key} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              <button className="flex items-center space-x-1" onClick={() => setSortField(column.key as keyof UserProgress)}>
                <span>{column.label}</span>
                <ArrowUpDown size={16} />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {filteredUsers.map(user => (
          <tr key={user.userId} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.organizationName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.modulesCompleted}/{user.totalModules}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.quizAverage}%</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.achievementsCount}</td>
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

export default AdminDashboardPage;
