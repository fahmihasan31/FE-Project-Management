import React from 'react';
import { FaUser, FaProjectDiagram, FaDollarSign, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

type projectOverview = {
    isOpen: boolean;
    onClose: () => void;
};

const ProjectOverview = ({ isOpen, onClose }: projectOverview) => {
    if (!isOpen) return null;

    const projectData = {
        client: 'Acme Corporation',
        projectName: 'Website Redesign',
        description: "Redesigning the Acme Corporation's main website for better user experience.",
        startDate: '2023-01-01',
        endDate: '2023-06-30',
        amount: 50000,
        members: ['Alice', 'Bob', 'Charlie', 'Diana'],
        progress: 10,
        documents: ['Proposal.pdf', 'Design_Document.pdf', 'Final_Report.pdf'],
    };

    const amountPerMember = projectData.amount / projectData.members.length;
    const isHealthy = amountPerMember >= 10000;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg">
                <button onClick={onClose} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-700 focus:outline-none">
                    ✕
                </button>

                <div className="flex">
                    {/* Left Section */}
                    <div className="w-3/5 pr-8">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Project Overview</h2>

                        <div className="space-y-6">
                            <div className="flex items-center">
                                <FaProjectDiagram className="mr-4 text-2xl text-blue-600" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Client</span>
                                    <span className="text-lg font-semibold text-gray-800">{projectData.client}</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaProjectDiagram className="mr-4 text-2xl text-green-600" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Project Name</span>
                                    <span className="text-lg font-semibold text-gray-800">{projectData.projectName}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">Description</p>
                                <p className="mt-1 text-gray-700">{projectData.description}</p>
                            </div>

                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-4 text-2xl text-orange-600" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Start Date</span>
                                    <span className="text-lg font-semibold text-gray-800">{projectData.startDate}</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-4 text-2xl text-red-600" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">End Date</span>
                                    <span className="text-lg font-semibold text-gray-800">{projectData.endDate}</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaDollarSign className="mr-4 text-2xl text-yellow-600" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Amount</span>
                                    <span className="text-lg font-semibold text-gray-800">${projectData.amount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
                                <ul className="mt-2 space-y-2">
                                    {projectData.members.map((member, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <FaUser className="mr-3 text-xl text-gray-500" /> {member}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                                <ul className="mt-2 space-y-2">
                                    {projectData.documents.map((doc, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <FaFileAlt className="mr-3 text-xl text-gray-500" /> {doc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-2/5 pl-8">
                        <h3 className="mb-6 text-2xl font-bold text-gray-800">Statistics</h3>

                        <div className="relative mb-8 h-40 w-40">
                            <svg className="absolute left-0 top-0" width="100%" height="100%" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10"></circle>
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke={isHealthy ? '#10b981' : '#ef4444'}
                                    strokeWidth="10"
                                    strokeDasharray={`${projectData.progress} ${100 - projectData.progress}`}
                                    transform="rotate(-90 50 50)"
                                    strokeLinecap="round"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-800">{projectData.progress}%</span>
                            </div>
                        </div>

                        <div className="mb-8 text-center">
                            <p className="text-sm font-medium text-gray-500">Amount Per Member</p>
                            <p className="mt-1 text-lg font-semibold text-gray-800">${amountPerMember.toFixed(2)}</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">Total Members</p>
                            <p className="mt-1 text-lg font-semibold text-gray-800">{projectData.members.length}</p>
                        </div>

                        <button className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Manage Project</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
