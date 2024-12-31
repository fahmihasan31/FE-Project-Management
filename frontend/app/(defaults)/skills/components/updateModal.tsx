'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { putSkills } from '@/store/slices/skills';
import { toast } from 'react-toastify';

interface UpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    skill: {
        id: number;
        name: string;
    };
}

const UpdateModal = ({ isOpen, onClose, skill }: UpdateModalProps) => {
    const dispatch = useAppDispatch();
    const SkillState = useAppSelector((state) => state.Skills);

    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        if (skill) {
            setFormData({
                name: skill.name || '',
            });
        }
    }, [skill]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error('Please fill all fields.');
            return;
        }

        try {
            await dispatch(putSkills({ payload: formData, id: skill.id })); // Pastikan ID dikirim bersama data
            toast.success('Skills updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating Skills:', error);
            toast.error('Failed to update Skills');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Skills</h3>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        />
                    </div>

                    {SkillState.error && <p className="text-sm text-red-500">{SkillState.error}</p>}

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="rounded-lg bg-green-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-green-700">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
