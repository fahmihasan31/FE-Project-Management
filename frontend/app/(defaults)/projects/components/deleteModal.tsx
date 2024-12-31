'use client';

import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/hook/redux-hook';
import { deleteProject } from '@/store/slices/projects';
import { toast } from 'react-toastify';
import TrashIcon from '@/public/assets/images/image-delete.jpg';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: number | null;
}

const DeleteModal = ({ isOpen, onClose, projectId }: DeleteModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        if (!projectId) {
            toast.error('Employee ID is missing.');
            return;
        }

        try {
            await dispatch(deleteProject(projectId)).unwrap();
            toast.success('Employee deleted successfully.');
            onClose();
        } catch (error) {
            console.error('Failed to delete Employee:', error);
            toast.error('Failed to delete Employee.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose} />
            <div className="relative max-h-full w-full max-w-lg p-6">
                <div className="relative rounded-lg bg-white p-8 shadow dark:bg-gray-800 sm:p-8">
                    <div className="text-center">
                        <Image src={TrashIcon} alt="Trash Icon" className="mx-auto mb-4 h-20 w-20" />
                        <h3 className="mb-6 text-xl font-normal text-gray-900 dark:text-white">Are you sure you want to delete this Project?</h3>
                        <div className="flex justify-center space-x-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
