'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getSkills } from '@/store/slices/skills';
import { FiSearch, FiEdit, FiTrash, FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import AddModal from './components/addModal';
import UpdateModal from './components/updateModal';
import DeleteModal from './components/deleteModal';

interface SkillProps {
    id: number;
    name: string;
}

const Skills = () => {
    const dispatch = useAppDispatch();
    const skillState = useAppSelector((state) => state.Skills);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [skillsPerPage, setSkillsPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [SelectedSkillId, setSelectedSkillId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getSkills({}));
    }, [dispatch]);

    const handleDelete = (id: number) => {
        setSelectedSkillId(id);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (id: number) => {
        setSelectedSkillId(id);
        setIsUpdateModalOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredSkills = (Array.isArray(skillState.data) ? skillState.data : []).filter(
        (skill: SkillProps) => skill && typeof skill.name === 'string' && skill.name.toLowerCase().includes(searchTerm)
    );

    const indexOfLastSkill = currentPage * skillsPerPage;
    const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
    const currentSkills = filteredSkills.slice(indexOfFirstSkill, indexOfLastSkill);
    const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <header className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">Skill Management</h1>
                    <p className="text-sm text-gray-500">Take Control of Skill Relationships: Manage, Update, and Track Information Seamlessly.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <select
                            value={skillsPerPage}
                            onChange={(e) => {
                                setSkillsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Skill..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="rounded-lg border px-4 py-2 pl-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <FiPlus className="mr-2" /> Add Skill
                    </button>
                </div>
            </header>

            {/* Table Section */}
            <section className="overflow-hidden rounded-lg bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSkills.length > 0 ? (
                            currentSkills.map((skill, index) => (
                                <tr key={skill.id || index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-700">{skill.name}</td>
                                    <td className="w-[200px] px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(skill.id)} className="rounded bg-green-100 p-2 text-green-700 hover:bg-green-200">
                                                <FiEdit />
                                            </button>
                                            <button onClick={() => handleDelete(skill.id)} className="rounded bg-red-100 p-2 text-red-700 hover:bg-red-200">
                                                <FiTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="py-4 text-center text-gray-500">
                                    No skills found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {skillState.error && <p className="text-sm text-red-500">{skillState.error}</p>}

                {/* Pagination Section */}
                <div className="flex items-center justify-between border-t bg-white px-6 py-4">
                    <span className="text-sm text-gray-500">
                        Showing {indexOfFirstSkill + 1} to {Math.min(indexOfLastSkill, filteredSkills.length)} of {filteredSkills.length}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
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
            </section>

            <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {SelectedSkillId && (
                <UpdateModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setSelectedSkillId(null);
                        setIsUpdateModalOpen(false);
                    }}
                    skill={skillState.data.find((skill: SkillProps) => skill.id === SelectedSkillId) || null}
                />
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setSelectedSkillId(null);
                    setIsDeleteModalOpen(false);
                }}
                skillId={SelectedSkillId}
            />
        </div>
    );
};

export default Skills;
