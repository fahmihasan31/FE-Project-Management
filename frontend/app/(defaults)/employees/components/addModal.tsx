'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { postEmployees } from '@/store/slices/employees';
import { getSkills } from '@/store/slices/skills';
import { toast } from 'react-toastify';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface EmployeeSkill {
    id: string;
    master_skill?: {
        id: number;
        name: string;
    };
    rate: number;
}

interface EmployeeData {
    name: string;
    latest_education: string;
    skills: EmployeeSkill[];
}

const AddModal = ({ isOpen, onClose }: AddModalProps) => {
    const dispatch = useAppDispatch();
    const EmployeeState = useAppSelector((state) => state.Employees);
    const SkillsState = useAppSelector((state) => state.Skills);

    useEffect(() => {
        dispatch(getSkills({}));
    }, [dispatch]);

    const [data, setData] = useState<EmployeeData>({
        name: '',
        latest_education: '',
        skills: [],
    });

    const resetForm = () => {
        setData({
            name: '',
            latest_education: '',
            skills: [],
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        const updatedSkills = [...data.skills];

        if (name === 'rate') {
            updatedSkills[index].rate = parseInt(value, 10);
        } else if (name === 'skill') {
            updatedSkills[index].id = value;
        }

        setData({ ...data, skills: updatedSkills });
    };

    const selectedSkills = data.skills.map((skill) => skill.id);

    const handleAddSkill = () => {
        setData({
            ...data,
            skills: [...data.skills, { id: '', rate: 1 }],
        });
    };

    const handleRemoveSkill = (index: number) => {
        const updatedSkills = data.skills.filter((_, i) => i !== index);
        setData({ ...data, skills: updatedSkills });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.name || !data.latest_education || !data.skills.length || data.skills.some((skill) => !skill.id)) {
            toast.error('Please fill all fields.');
            return;
        }

        const payload = {
            ...data,
            skills: data.skills.map((skill) => ({
                master_skill_id: skill.id,
                rate: skill.rate,
            })),
        };

        try {
            await dispatch(postEmployees(payload)).unwrap();
            console.log('payload add data employey: ', payload);
            toast.success('Employee added successfully');
            resetForm();
            onClose();
        } catch (error) {
            toast.error('Failed to add employee');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Employee</h3>
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
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                placeholder="Enter employee name"
                                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="latest_education" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Latest Education
                            </label>
                            <input
                                type="text"
                                id="latest_education"
                                name="latest_education"
                                value={data.latest_education}
                                onChange={(e) => setData({ ...data, latest_education: e.target.value })}
                                placeholder="Enter latest education"
                                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
                        <div className="max-h-52 overflow-y-auto rounded-lg border border-gray-300 shadow-sm dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Skill</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Rate</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {data.skills.map((skillData, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                                            <td className="px-2 py-3">
                                                <select
                                                    name="skill"
                                                    value={skillData.id || ''}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                                >
                                                    <option value="">Select a skill</option>
                                                    {SkillsState.data
                                                        .filter((skill) => !selectedSkills.includes(skill.id) || skill.id === skillData.id)
                                                        .map((skill) => (
                                                            <option key={skill.id} value={skill.id}>
                                                                {skill.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    name="rate"
                                                    value={skillData.rate}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                                                >
                                                    {[...Array(10)].map((_, i) => (
                                                        <option key={i} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button type="button" onClick={() => handleRemoveSkill(index)} className="text-4xl text-red-500">
                                                    -
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button type="button" onClick={handleAddSkill} className="mt-4 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                            Add Skill
                        </button>
                    </div>

                    {EmployeeState.error && <p className="text-sm text-red-500">{EmployeeState.error}</p>}

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
