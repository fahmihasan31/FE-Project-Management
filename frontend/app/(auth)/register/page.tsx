'use client';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h5 className="mb-4 text-center text-2xl font-medium text-gray-900 dark:text-white">Register to Our Platform</h5>
            <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">Take the first step toward efficient resource management!</p>
            <form className="space-y-6" action="#">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Your Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            placeholder="john doe"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Your Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-12 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label="Toogle password visibility"
                        >
                            {showPassword ? (
                                <FiEyeOff size={20} className="text-gray-500 transition-colors duration-300 hover:text-blue-600" />
                            ) : (
                                <FiEye size={20} className="hover:tet-blue-600 text-gray-500 transition-colors duration-300" />
                            )}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="ConfPassword" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="ConfPassword"
                            id="ConfPassword"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-12 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label="Toogle password visibility"
                        >
                            {showConfirmPassword ? (
                                <FiEyeOff size={20} className="text-gray-500 transition-colors duration-300 hover:text-blue-600" />
                            ) : (
                                <FiEye size={20} className="hover:tet-blue-600 text-gray-500 transition-colors duration-300" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Register Now
                </button>

                <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                    Do you have an account?{' '}
                    <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
