import React from 'react';
import UserProfile from '../components/UserProfile';
import { useUserData } from '../hooks/useUserData';

const ProfilePage: React.FC = () => {
  const { userData, loading, error } = useUserData();

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
  </div>;
  
  if (!userData) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">No data available</div>
  </div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <UserProfile name={userData.name} email={userData.email} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;