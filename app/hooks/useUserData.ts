'use client';

import { useState, useEffect } from 'react';
import { UserInfo } from '../../app/types';
import { fetchUserData } from '../../app/services/api';

export const useUserData = () => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { userData, loading, error };
}; 