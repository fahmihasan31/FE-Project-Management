'use client';

import React from 'react';

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: number | null;
    project: {
        id: number;
        name: string;
        description: string;
        schedule_start: string;
        schedule_end: string;
        status: 'draft' | 'started' | 'ended' | 'postponed';
        amount: number;
        client_id: string;
        documents: any;
        requirements: any;
        members: any;
    };
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ isOpen, onClose, project }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
                {/* Modal Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-blue-600">{project.name}</h2>
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
                    </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4">
                    <p className="text-gray-600">{project.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Client ID:</p>
                            <p className="text-gray-600">{project.client_id}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Status:</p>
                            <span
                                className={`rounded px-2 py-1 text-sm font-medium ${
                                    project.status === 'draft'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : project.status === 'started'
                                        ? 'bg-green-100 text-green-700'
                                        : project.status === 'ended'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {project.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Schedule Start:</p>
                            <p className="text-gray-600">{new Date(project.schedule_start).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Schedule End:</p>
                            <p className="text-gray-600">{new Date(project.schedule_end).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Amount:</p>
                            <p className="text-gray-600">Rp {project.amount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Documents:</p>
                            <p className="text-gray-600">{project.documents ? 'Available' : 'Not Provided'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Requirements:</p>
                            <p className="text-gray-600">{project.requirements ? 'Available' : 'Not Provided'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Members:</p>
                            <p className="text-gray-600">{project.members ? 'Assigned' : 'Not Assigned'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
