import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  id: number;
  username: string;
  email: string;
 
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/me'); 
        setProfile(response.data);
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки профиля');
        if (err.response?.status === 401) logout(); 
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [logout]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>
      {profile && (
        <div className="border p-4 rounded shadow">
          <p><strong>Имя пользователя:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>ID:</strong> {profile.id}</p>
        </div>
      )}
      <button
        onClick={() => {
          logout();
          window.location.href = '/';
        }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default Profile;