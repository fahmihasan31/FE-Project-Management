'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { login } from '@/store/slices/auth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.Auth);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await dispatch(login({ email, password }));
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('Anda berhasil login');
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                toast.error('Login failed, please try again');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if (authState.user) {
            toast.info('Redirecting...');
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }
    }, [authState.user, router]);

    return (
        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
            <h5 className="mb-2 text-center text-2xl font-medium text-gray-900 dark:text-white">Log In to our platform</h5>
            <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">Let's make resource management easier together. Log in now !!</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        placeholder="name@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Your password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-12 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                {authState.error && <p className="text-sm text-red-500">{authState.error}</p>}
                <button
                    type="submit"
                    disabled={authState.loading}
                    className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {authState.loading ? 'Logging in...' : 'Login to your account'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
