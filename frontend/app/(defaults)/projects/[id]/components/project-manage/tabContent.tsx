import { getClients } from '@/store/slices/clients';
import { putProject } from '@/store/slices/projects';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface projectData {
    client_id: string;
    name: string;
    description: string;
    schedule_start: string;
    schedule_end: string;
    status: string;
    amount: number;
}

const ProjectManage = ({ projectId }: { projectId: string | any }) => {
    const dispatch = useAppDispatch();
    const clientState = useAppSelector((state) => state.Clients);
    const projectState = useAppSelector((state) => state.Projects);

    useEffect(() => {
        dispatch(getClients({}));
        if (projectId) {
            const project = projectState.data.find((projects) => projects.id === projectId);
            if (project) {
                setFormData({
                    client_id: project.client_id,
                    name: project.name,
                    description: project.description,
                    schedule_start: project.schedule_start,
                    schedule_end: project.schedule_end,
                    status: project.status,
                    amount: project.amount,
                });
            }
        }
    }, [dispatch, projectId, projectState.data]);

    const [formData, setFormData] = useState<projectData>({
        client_id: '',
        name: '',
        description: '',
        schedule_start: '',
        schedule_end: '',
        status: 'draft',
        amount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'amount' ? (value === '' ? 0 : parseInt(value)) : value,
        }));
    };

    const formatDateForDisplay = (date: string): string => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    const formatDateForStorage = (date: string): string => {
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        dispatch(getClients({}));
        if (projectId) {
            const project = projectState.data.find((projects) => projects.id === projectId);
            if (project) {
                setFormData({
                    client_id: project.client_id,
                    name: project.name,
                    description: project.description,
                    schedule_start: formatDateForDisplay(project.schedule_start),
                    schedule_end: formatDateForDisplay(project.schedule_end),
                    status: project.status,
                    amount: project.amount,
                });
            }
        }
    }, [dispatch, projectId, projectState.data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                schedule_start: formatDateForStorage(formData.schedule_start),
                schedule_end: formatDateForStorage(formData.schedule_end),
            };

            await dispatch(putProject({ payload: payload, id: projectId }));
            console.log('form data', formData);
            console.log('put project:', payload);
            toast.success('Project updated successfully');
        } catch (error) {
            console.log('update failed', error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="client_id" className="mb-2 block text-sm font-medium text-gray-900">
                                Client Name
                            </label>
                            <select
                                id="client_id"
                                name="client_id"
                                value={formData.client_id}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                required
                            >
                                <option value="">Select Client</option>
                                {clientState.data?.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                                Project Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                placeholder="Project Name"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                placeholder="Project Description"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="schedule_start" className="mb-2 block text-sm font-medium text-gray-900">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="schedule_start"
                                name="schedule_start"
                                value={formData.schedule_start}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="schedule_end" className="mb-2 block text-sm font-medium text-gray-900">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="schedule_end"
                                name="schedule_end"
                                value={formData.schedule_end}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-900">
                                Amount
                            </label>
                            <input
                                type="string"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                placeholder="Amount"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-900">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                required
                            >
                                <option value="Draft">Draft</option>
                                <option value="Project Initiator">Project Initiator</option>
                                <option value="Development">Development</option>
                                <option value="SIT">SIT</option>
                                <option value="UIT">UIT</option>
                                <option value="Go Live">Go Live</option>
                                <option value="HyperCase">HyperCase</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectManage;
