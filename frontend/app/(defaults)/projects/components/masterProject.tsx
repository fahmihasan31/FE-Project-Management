import React, { useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { getClients } from '@/store/slices/clients';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';

interface MasterProjectProps {
    formData: any;
    setFormData: (data: any) => void;
}

const MasterProject = ({ formData, setFormData }: MasterProjectProps) => {
    const dispatch = useAppDispatch();
    const clientState = useAppSelector((state) => state.Clients);

    useEffect(() => {
        dispatch(getClients({}));
    }, [dispatch]);

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-6 text-2xl font-semibold text-gray-700">Master Project</h3>

            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-600">Project Name</label>
                <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="Enter project name"
                />
            </div>

            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-600">Description</label>
                <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="Enter project description"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">Start Date</label>
                    <div className="relative">
                        <FiCalendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="datetime-local"
                            value={formData.schedule_start || ''}
                            onChange={(e) => setFormData({ ...formData, schedule_start: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">End Date</label>
                    <div className="relative">
                        <FiCalendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="datetime-local"
                            value={formData.schedule_end || ''}
                            onChange={(e) => setFormData({ ...formData, schedule_end: e.target.value })}
                            className="w-full rounded-md border border-gray-300 p-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-600">Status</label>
                <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                    <option value="draft">Draft</option>
                    <option value="started">Started</option>
                    <option value="ended">Ended</option>
                    <option value="postponed">Postponed</option>
                </select>
            </div>

            {/* Amount */}
            <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-600">Amount</label>
                <input
                    type="number"
                    value={formData.amount || ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ ...formData, amount: value ? parseInt(value, 10) : 0 });
                    }}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="Enter project amount"
                />
            </div>

            <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-600">Client</label>
                <select
                    value={formData.client_id || ''}
                    onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                    <option value="" disabled>
                        {clientState.loading ? 'Loading clients...' : 'Select a client'}
                    </option>
                    {clientState.data.map((client: any) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                {clientState.error && <p className="mt-1 text-sm text-red-500">{clientState.error}</p>}
            </div>
        </div>
    );
};

export default MasterProject;
