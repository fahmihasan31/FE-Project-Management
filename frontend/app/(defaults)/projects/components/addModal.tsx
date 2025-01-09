'use client';

import React, { useEffect, useState } from 'react';
import { postProject } from '@/store/slices/projects';
import { getClients } from '@/store/slices/clients';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import Select from 'react-select';
import { toast } from 'react-toastify';
// import { FiCalendar } from 'react-icons/fi';

type AddModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

interface projectData {
    client_id: string;
    name: string;
    description: string;
    schedule_start: string;
    schedule_end: string;
    status: string;
    amount: number;
}

const AddModal = ({ isOpen, onClose }: AddModalProps) => {
    const dispatch = useAppDispatch();
    const clientState = useAppSelector((state) => state.Clients);
    const [formData, setFormData] = useState<projectData>({
        client_id: '',
        name: '',
        description: '',
        schedule_start: '',
        schedule_end: '',
        status: 'draft',
        amount: 0,
    });

    useEffect(() => {
        dispatch(getClients({}));
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'amount' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormData((prev) => ({
            ...prev,
            client_id: selectedOption ? selectedOption.value : '',
        }));
    };

    const resetForm = () => {
        setFormData({
            client_id: '',
            name: '',
            description: '',
            schedule_start: '',
            schedule_end: '',
            status: 'draft',
            amount: 0,
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                schedule_start: formatDate(formData.schedule_start),
                schedule_end: formatDate(formData.schedule_end),
            };
            await dispatch(postProject(payload)).unwrap();
            console.log('payload add project', formData);
            toast.success('Project added successfully');
            resetForm();
            onClose();
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    if (!isOpen) return null;

    // Transforming client data for react-select
    const clientOptions = clientState.data?.map((client) => ({
        value: client.id,
        label: client.name,
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Project</h3>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleClose}
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
                        <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Client
                        </label>
                        <Select
                            id="client_id"
                            name="client_id"
                            value={clientOptions?.find((client) => client.value === formData.client_id)}
                            onChange={handleSelectChange}
                            options={clientOptions}
                            className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                            placeholder="Select a client"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter project description"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                            rows={4}
                        />
                    </div>

                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="schedule_start" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Schedule Start
                            </label>
                            <input
                                type="date"
                                id="schedule_start"
                                name="schedule_start"
                                value={formData.schedule_start}
                                onChange={handleChange}
                                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="schedule_end" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Schedule End
                            </label>
                            <input
                                type="date"
                                id="schedule_end"
                                name="schedule_end"
                                value={formData.schedule_end}
                                onChange={handleChange}
                                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Amount
                        </label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter project amount"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        />
                    </div>

                    {/* Error State */}
                    {clientState.error && <p className="text-sm text-red-500">{clientState.error}</p>}

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
