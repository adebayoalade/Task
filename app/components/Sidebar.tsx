import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <MdDashboard /> },
    { path: '/transactions', label: 'Transactions', icon: <GrTransaction /> },
    { path: '/loans', label: 'Loans', icon: <FaRegMoneyBillAlt /> },
    { path: '/profile', label: 'Profile', icon: <AiFillProfile /> },
  ];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Simbrella</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 