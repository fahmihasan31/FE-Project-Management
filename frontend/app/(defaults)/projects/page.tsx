'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getProjects } from '@/store/slices/projects';
import { getClients } from '@/store/slices/clients';
import { FiSearch, FiPlus, FiEdit2, FiEye, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import AddModal from './components/addModal';
import DeleteModal from './components/deleteModal';
import ProjectDetailModal from './components/detailModal';

interface ProjectProps {
    id: number;
    client_id: string;
    name: string;
    description: string;
    schedule_start: string;
    schedule_end: string;
    status: 'draft' | 'started' | 'ended' | 'postponed';
    amount: number;
}

const ProjectManagement = () => {
    const dispatch = useAppDispatch();
    const projectState = useAppSelector((state) => state.Projects);
    const clientState = useAppSelector((state) => state.Clients);

    useEffect(() => {
        dispatch(getProjects({}));
        dispatch(getClients({}));
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [SelectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [projectsPerPage, setProjectsPerPage] = useState(6);

    // Filter and Paginate Logic
    const filteredProjects = projectState.data.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const handleDelete = (id: number) => {
        setIsDeleteModalOpen(true);
        setSelectedProjectId(id);
    };

    const handleView = (id: number) => {
        setSelectedProjectId(id);
        setIsViewModalOpen(true);
    };

    const getClientName = (clientId: string) => {
        const client = clientState.data.find((client: { id: string }) => client.id === clientId);
        return client ? client.name : 'Unknown Client';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">Project Management</h1>
                    <p className="text-sm text-gray-500">Manage and track your projects effortlessly.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <select
                            value={projectsPerPage}
                            onChange={(e) => {
                                setProjectsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value={6}>6</option>
                            <option value={9}>9</option>
                        </select>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Projects..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="rounded-lg border px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <FiPlus className="mr-2" /> Add Project
                    </button>
                </div>
            </header>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentProjects.length > 0 ? (
                    currentProjects.map((project: ProjectProps) => (
                        <div key={project.id} className="rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b px-4 py-3">
                                <h3 className="truncate text-lg font-semibold text-gray-800">{project.name}</h3>
                                <span
                                    className={`rounded px-2 py-1 text-xs font-medium ${
                                        project.status === 'started'
                                            ? 'bg-green-100 text-green-700'
                                            : project.status === 'draft'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : project.status === 'ended'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {project.status}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="space-y-2 p-4">
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Client:</span> {getClientName(project.client_id)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Start:</span> {new Date(project.schedule_start).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">End:</span> {new Date(project.schedule_end).toLocaleDateString()}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Description:</span> {project.description}
                                </p>
                                <p className="text-sm font-bold text-blue-600">Rp. {project.amount.toLocaleString()}</p>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between border-t px-4 py-2">
                                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800" onClick={() => handleView(project.id)}>
                                    <FiEye /> View
                                </button>
                                <button className="flex items-center gap-2 text-yellow-600 hover:text-yellow-800" onClick={() => console.log('clicked')}>
                                    <FiEdit2 /> Edit
                                </button>
                                <button className="flex items-center gap-2 text-red-600 hover:text-red-800" onClick={() => handleDelete(project.id)}>
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No projects found.</div>
                )}
            </div>

            {/* Pagination Section */}
            <div className="flex items-center justify-between border-t bg-white px-6 py-4">
                <span className="text-sm text-gray-500">
                    Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length}
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                        <FiArrowLeft />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        <FiArrowRight />
                    </button>
                </div>
            </div>

            <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setSelectedProjectId(null);
                    setIsDeleteModalOpen(false);
                }}
                projectId={SelectedProjectId}
            />

            <ProjectDetailModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                project={projectState.data.find((client: ProjectProps) => client.id === SelectedProjectId) || null}
                projectId={null}
            />
        </div>
    );
};

export default ProjectManagement;
