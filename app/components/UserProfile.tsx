import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0">
        <div className="h-16 w-16 sm:h-12 sm:w-12 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-xl text-white font-semibold">
            {name.charAt(0)}
          </span>
        </div>
        <div className="text-center sm:text-left sm:ml-4">
          <h3 className="text-lg font-medium text-gray-800">{name}</h3>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;