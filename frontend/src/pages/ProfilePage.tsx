import React, { useEffect, useState } from 'react';
import {
  User, Mail, Building2, Trophy, Edit2, Upload, Trash2, X
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import API_URL from '../config';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  isAdmin: boolean;
  imageUrl: string;
  modulesCompleted: number;
  totalModules: number;
  averageQuizScore: number | null;
  achievements: {
    title: string;
    description: string;
    achievedAt: string;
  }[];
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: ''
  });


  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${API_URL}/api/user-profile`, {
        method: 'GET',
        headers: {
      'Content-Type': 'application/json',},
        credentials: 'include',
      });
      if (!res.ok) return console.error('Failed to fetch profile');
      const data = await res.json();
      setProfile(data);
      setEditForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl
      });
    };
    fetchProfile();
  },[]);

  const handleSave = async () => {
    const res = await fetch(`${API_URL}/api/user-profile`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email
      })
    });
    if (res.ok) {
      setProfile(prev => prev ? { ...prev, ...editForm } : null);
      setIsEditing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_URL}/api/user-profile/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    const data = await res.json();
    setEditForm(prev => ({ ...prev, imageUrl: data.imageUrl }));
    setProfile(prev => prev ? { ...prev, imageUrl: data.imageUrl } : null);
  };

  const handleDeleteImage = async () => {
    const res = await fetch(`${API_URL}/api/user-profile/image`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      setEditForm(prev => ({ ...prev, imageUrl: '' }));
      setProfile(prev => prev ? { ...prev, imageUrl: '' } : null);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        imageUrl: profile.imageUrl
      });
    }
    setIsEditing(false);
  };

  if (!profile) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={editForm.imageUrl || '/default-avatar.png'}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                {isEditing && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <label className="cursor-pointer p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800">
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      <Upload size={16} />
                    </label>
                    <button
                      onClick={handleDeleteImage}
                      className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold mt-4">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">{profile.isAdmin ? 'Administrator' : 'User'}</p>
              <p className="text-gray-500">{profile.organizationName}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Profile Information</h2>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="bg-black text-white hover:bg-gray-800">
                    <Edit2 size={16} className="mr-2" /> Edit Profile
                  </Button>
                )}
              </div>

              {isEditing ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                      icon={User}
                      label="First Name"
                      value={editForm.firstName}
                      onChange={e => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                    <FormInput
                      icon={User}
                      label="Last Name"
                      value={editForm.lastName}
                      onChange={e => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                    <FormInput
                      icon={Mail}
                      label="Email"
                      type="email"
                      value={editForm.email}
                      onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">Organization</label>
                      <div className="p-2 bg-gray-50 border rounded text-gray-500">
                        {profile.organizationName}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <Button onClick={handleCancel} className="border hover:bg-gray-100">
                      <X size={16} className="mr-2" /> Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
                      Save Changes
                    </Button>
                  </div>
                </>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <p><b>First Name:</b> {profile.firstName}</p>
                  <p><b>Last Name:</b> {profile.lastName}</p>
                  <p><b>Email:</b> {profile.email}</p>
                  <p><b>Organization:</b> {profile.organizationName}</p>
                </div>
              )}
            </section>

            {/* Stats */}
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{profile.modulesCompleted}/{profile.totalModules}</p>
                  <p className="text-sm text-gray-600">Modules Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.averageQuizScore !== null ? `${Math.round(profile.averageQuizScore)}%` : 'N/A'}</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              {profile.achievements.length === 0 ? (
                <p className="text-gray-500">No achievements yet.</p>
              ) : (
                <ul className="space-y-4">
                  {profile.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Trophy className="text-yellow-500" size={24} />
                      <div>
                        <p className="font-medium">{a.title}</p>
                        <p className="text-sm text-gray-600">{a.description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(a.achievedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
