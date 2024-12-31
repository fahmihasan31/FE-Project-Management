'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getClients } from '@/store/slices/clients';
import { FiSearch, FiEdit, FiTrash, FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import AddModal from './components/addModal';
import UpdateModal from './components/updateModal';
import DeleteModal from './components/deleteModal';

interface ClientProps {
    id: number;
    name: string;
    address: string;
    phone_number: string;
}

const Clients = () => {
    const dispatch = useAppDispatch();
    const clientState = useAppSelector((state) => state.Clients);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage, setClientsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getClients({}));
    }, [dispatch]);

    const handleEdit = (id: number) => {
        setSelectedClientId(id);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setSelectedClientId(id);
        setIsDeleteModalOpen(true);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredClients = (Array.isArray(clientState.data) ? clientState.data : []).filter(
        (client: ClientProps) =>
            client && (client.name.toLowerCase().includes(searchTerm) || client.address.toLowerCase().includes(searchTerm) || client.phone_number.toLowerCase().includes(searchTerm))
    );

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <header className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">Client Management</h1>
                    <p className="text-sm text-gray-500">Take Control of Client Relationships: Manage, Update, and Track Information Seamlessly.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <select
                            value={clientsPerPage}
                            onChange={(e) => {
                                setClientsPerPage(Number(e.target.value));
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
                        <FiPlus className="mr-2" /> Add Client
                    </button>
                </div>
            </header>

            {/* Table Section */}
            <section className="overflow-hidden rounded-lg bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-[300px] px-6 py-4">Name</th>
                            <th className="w-[300px] px-6 py-4">Address</th>
                            <th className="w-[300px] px-6 py-4">Phone Number</th>
                            <th className="w-[300px] px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClients.length > 0 ? (
                            currentClients.map((client, index) => (
                                <tr key={client.id || index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-700">{client.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{client.address}</td>
                                    <td className="px-6 py-4 text-gray-500">{client.phone_number}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(client.id)} className="rounded bg-green-100 p-2 text-green-700 hover:bg-green-200">
                                                <FiEdit />
                                            </button>
                                            <button onClick={() => handleDelete(client.id)} className="rounded bg-red-100 p-2 text-red-700 hover:bg-red-200">
                                                <FiTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-gray-500">
                                    No clients found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {clientState.error && <p className="text-sm text-red-500">{clientState.error}</p>}

                {/* Pagination Section */}
                <div className="flex items-center justify-between border-t bg-white px-6 py-4">
                    <span className="text-sm text-gray-500">
                        Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, filteredClients.length)} of {filteredClients.length}
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

            {selectedClientId && (
                <UpdateModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setSelectedClientId(null);
                        setIsUpdateModalOpen(false);
                    }}
                    client={clientState.data.find((client: ClientProps) => client.id === selectedClientId) || null}
                />
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setSelectedClientId(null);
                    setIsDeleteModalOpen(false);
                }}
                clientId={selectedClientId}
            />
        </div>
    );
};

export default Clients;
