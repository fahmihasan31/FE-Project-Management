'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getEmployees } from '@/store/slices/employees';
import { FiSearch, FiEdit, FiTrash, FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import AddModal from './components/addModal';
import DeleteModal from './components/deleteModal';
import UpdateModal from './components/updateModal';

interface EmployeeSkill {
    id: string;
    master_skill?: {
        id: number;
        name: string;
    };
    rate: number;
}

interface EmployeeProps {
    id: number;
    name: string;
    latest_education: string;
    skills: EmployeeSkill[];
}

const Employees = () => {
    const dispatch = useAppDispatch();
    const employeeState = useAppSelector((state) => state.Employees);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [SelectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getEmployees({}));
    }, [dispatch]);

    const handleDelete = (id: number) => {
        setSelectedEmployeeId(id);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (id: number) => {
        setSelectedEmployeeId(id);
        setIsUpdateModalOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredEmployees = (Array.isArray(employeeState.data) ? employeeState.data : []).filter(
        (employee: EmployeeProps) =>
            employee &&
            (employee.name.toLowerCase().includes(searchTerm) ||
                employee.latest_education.toLowerCase().includes(searchTerm) ||
                employee.skills.some((skill) => skill.master_skill?.name.toLowerCase().includes(searchTerm)))
    );

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const getRateColor = (rate: number) => {
        if (rate <= 6) return 'bg-red-100 text-red-700';
        if (rate <= 8) return 'bg-yellow-100 text-yellow-700';
        return 'bg-green-100 text-green-700';
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <header className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">Employee Management</h1>
                    <p className="text-sm text-gray-500">Seamlessly manage and track all your Employee.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <select
                            value={employeesPerPage}
                            onChange={(e) => {
                                setEmployeesPerPage(Number(e.target.value));
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
                            placeholder="Search Employee..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="rounded-lg border px-4 py-2 pl-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <FiPlus className="mr-2" /> Add Employee
                    </button>
                </div>
            </header>

            {/* Table Section */}
            <section className="overflow-hidden rounded-lg bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-[300px] px-6 py-4">Name</th>
                            <th className="w-[300px] px-6 py-4">Education</th>
                            <th className="w-[300px] px-6 py-4">Skills</th>
                            <th className="w-[300px] px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.length > 0 ? (
                            currentEmployees.map((employee: EmployeeProps, index: number) => (
                                <tr key={employee.id || index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{employee.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{employee.latest_education}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex w-[500px] flex-wrap gap-2">
                                            {employee.skills
                                                .slice()
                                                .sort((a, b) => b.rate - a.rate)
                                                .map((skill: EmployeeSkill, index: number) => (
                                                    <span key={skill.id || index} className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getRateColor(skill.rate)}`}>
                                                        <span className="truncate">{skill.master_skill?.name || 'Unknown'}</span>
                                                        <span className="ml-2 text-xs font-semibold">{skill.rate}</span>
                                                    </span>
                                                ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(employee.id)} className="rounded bg-green-100 p-2 text-green-700 hover:bg-green-200">
                                                <FiEdit />
                                            </button>
                                            <button onClick={() => handleDelete(employee.id)} className="rounded bg-red-100 p-2 text-red-700 hover:bg-red-200">
                                                <FiTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-sm text-gray-500">
                                    No clients found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {employeeState.error && <p className="text-sm text-red-500">{employeeState.error}</p>}

                {/* Pagination Section */}
                <div className="flex items-center justify-between border-t bg-white px-6 py-4">
                    <span className="text-sm text-gray-500">
                        Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length}
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

            {SelectedEmployeeId && (
                <UpdateModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setSelectedEmployeeId(null);
                        setIsUpdateModalOpen(false);
                    }}
                    employee={employeeState.data.find((client: EmployeeProps) => client.id === SelectedEmployeeId) || null}
                />
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setSelectedEmployeeId(null);
                    setIsDeleteModalOpen(false);
                }}
                employeeId={SelectedEmployeeId}
            />
        </div>
    );
};

export default Employees;
