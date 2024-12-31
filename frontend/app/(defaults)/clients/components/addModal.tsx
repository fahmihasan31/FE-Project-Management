'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { postClients } from '@/store/slices/clients';
import { toast } from 'react-toastify';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ClientData {
    name: string;
    address: string;
    phone_number: string;
}

const AddModal = ({ isOpen, onClose }: AddModalProps) => {
    const dispatch = useAppDispatch();
    const ClientState = useAppSelector((state) => state.Clients);

    const [data, setData] = useState<ClientData>({
        name: '',
        address: '',
        phone_number: '',
    });

    const resetForm = () => {
        setData({
            name: '',
            address: '',
            phone_number: '',
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.name || !data.address || !data.phone_number) {
            toast.error('Please fill all fields.');
            return;
        }

        try {
            await dispatch(postClients(data)).unwrap();
            toast.success('Client added successfully');
            resetForm();
            onClose();
        } catch (error) {
            console.log('Error adding client:', error);
            toast.error('Failed to add client');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Client</h3>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleClose()}
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
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={handleChange}
                            placeholder="Enter your Phone Number"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        />
                    </div>

                    {/* Error State */}
                    {ClientState.error && <p className="text-sm text-red-500">{ClientState.error}</p>}

                    {/* Buttons: Create and Cancel */}
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
