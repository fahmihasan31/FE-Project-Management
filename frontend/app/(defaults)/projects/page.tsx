'use client';
import React, { useState, useEffect } from 'react';

import { getProjects } from '@/store/slices/projects';
import { getClients } from '@/store/slices/clients';
import { FiSearch, FiPlus, FiEdit2, FiEye, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import AddModal from './components/addModal';
import DeleteModal from './components/deleteModal';
import ProjectDetailModal from './components/detailModal';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';

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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const projectState = useAppSelector((state) => state.Projects);
    const clientState = useAppSelector((state) => state.Clients);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [projectsPerPage, setProjectsPerPage] = useState(6);

    // State to track the visibility of the dropdown menu
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getProjects({}));
        dispatch(getClients({}));
    }, [dispatch]);

    const filteredProjects = projectState.data?.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

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

    const handleManage = (id: number) => {
        router.push(`/projects/${id}`);
    };

    const handleToggleMenu = (id: number) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    const getClientName = (clientId: string) => {
        const client = clientState.data?.find((client: { id: string }) => client.id === clientId);
        return client ? client.name : 'Unknown Client';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">Project Management</h1>
                    <p className="text-sm text-gray-500">Manage and track your projects effortlessly.</p>
                </div>
                <div className="flex items-center gap-4">
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
                        <div key={project.id} className="rounded-lg border bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="truncate text-lg font-semibold text-gray-800">{project.name}</h3>

                                <div className="relative">
                                    <FiMoreVertical
                                        className={`cursor-pointer rounded-lg ${activeMenu === project.id ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
                                        size={16}
                                        onClick={() => handleToggleMenu(project.id)}
                                    />
                                    {activeMenu === project.id && (
                                        <div className="absolute right-0 z-10 mt-2 w-32 rounded-lg bg-white shadow-lg">
                                            <button className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100" onClick={() => handleView(project.id)}>
                                                View
                                            </button>
                                            <button className="block w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-gray-100" onClick={() => handleManage(project.id)}>
                                                Manage
                                            </button>
                                            <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100" onClick={() => handleDelete(project.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Client:</span> {getClientName(project.client_id)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Schedule Start:</span> {project.schedule_start}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Schedule End:</span> {project.schedule_end}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">Description:</span> {project.description}
                                </p>
                                <p className="text-sm font-bold text-blue-600">Rp. {project.amount.toLocaleString()}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t pt-4">
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
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No projects found.</div>
                )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t bg-white px-6 py-4">
                <span className="text-sm text-gray-500">
                    Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length}
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                        Previous
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Next
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
                projectId={selectedProjectId}
            />
            <ProjectDetailModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
        </div>
    );
};

export default ProjectManagement;
