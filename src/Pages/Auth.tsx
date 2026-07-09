

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Проверка паролей при регистрации
        if (!isLogin && password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            if (isLogin) {
                // ===== ЛОГИН =====
                const formData = new URLSearchParams();
                formData.append('username', username);
                formData.append('password', password);

                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData,
                });
                if (!loginRes.ok) {
                    const err = await loginRes.json();
                    throw new Error(err.detail || 'Ошибка входа');
                }
                const loginData = await loginRes.json();
                const token = loginData.access_token;

                const profileRes = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!profileRes.ok) throw new Error('Не удалось получить данные пользователя');
                const userData = await profileRes.json();

                login(token, userData);
                navigate('/profile');
            } else {
                // ===== РЕГИСТРАЦИЯ =====
                const registerRes = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });
                if (!registerRes.ok) {
                    const err = await registerRes.json();
                    throw new Error(err.detail || 'Ошибка регистрации');
                }
                // Регистрация успешна – автоматически логиним
                const formData = new URLSearchParams();
                formData.append('username', username);
                formData.append('password', password);

                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData,
                });
                if (!loginRes.ok) {
                    const err = await loginRes.json();
                    throw new Error(err.detail || 'Ошибка автоматического входа');
                }
                const loginData = await loginRes.json();
                const token = loginData.access_token;

                const profileRes = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!profileRes.ok) throw new Error('Не удалось получить данные пользователя');
                const userData = await profileRes.json();

                login(token, userData);
                navigate('/profile');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                {!isLogin && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                )}

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />



                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                )}

                <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded" >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>

            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        setPassword('');
                        setConfirmPassword('');
                    }}
                    className="text-blue-600 hover:underline"
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    );
};

export default Auth;