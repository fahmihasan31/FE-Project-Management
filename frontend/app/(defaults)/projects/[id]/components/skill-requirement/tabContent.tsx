import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getSkills } from '@/store/slices/skills';
import { getEmployees } from '@/store/slices/employees';
import { addRequirement } from '@/store/slices/projects';
import { getRequirementsByProject } from '@/store/slices/projects';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';

import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
    skills: EmployeeSkill[];
}

interface requirementData {
    project_id: string | any;
    skill_id: string | [];
}

const getRateColor = (rate: number) => {
    if (rate <= 6) return 'bg-red-100 text-red-700';
    if (rate <= 8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
};

const SkillRequirementTabContent = ({ projectId }: { projectId: string | any }) => {
    const dispatch = useAppDispatch();
    const skillState = useAppSelector((state) => state.Skills);
    const projectState = useAppSelector((state) => state.Projects);

    const [formData, setFormData] = useState<requirementData>({
        project_id: '',
        skill_id: '',
    });

    useEffect(() => {
        dispatch(getSkills({}));
        dispatch(getEmployees({}));
        if (projectId) {
            dispatch(getRequirementsByProject(projectId)).then(() => {
                const project = projectState.data.find((project) => project.id === projectId);
                if (project) {
                    setFormData({
                        project_id: project.id,
                        skill_id: project.skill_id || '',
                    });
                }
            });
        }
    }, [dispatch, projectId]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!formData.skill_id) {
                toast.error('Please select a skill.');
                return;
            }

            const payload = {
                ...formData,
            };

            await dispatch(addRequirement(payload));
            console.log('handle', formData);
            toast.success('Requirement added successfully!');
        } catch (error) {
            toast.error('Failed to add requirement. Please try again.');
        }
    };

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-neutral-900">
                <div className="mb-6">
                    <label htmlFor="skill_id" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Add Skills
                    </label>
                    <select
                        id="skill_id"
                        name="skill_id"
                        value={formData.skill_id}
                        onChange={handleChange}
                        className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
                        required
                    >
                        <option value="">Select Skill</option>
                        {skillState.data?.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div>
                            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Employees with Selected Skills</h4>

                            {employeeState.loading ? (
                                <p className="text-gray-500 dark:text-gray-400">Loading employees...</p>
                            ) : (
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="w-[300px] px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Skill & Rate</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredEmployees.length > 0 ? (
                                            filteredEmployees.map((employee) => (
                                                <tr key={employee.id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        <strong>{employee.name}</strong>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {employee.skills
                                                                .filter((skill) => selectedSkillIds.includes(skill.master_skill?.id || 0))
                                                                .sort((a, b) => b.rate - a.rate)
                                                                .map((skill) => (
                                                                    <span
                                                                        key={skill.master_skill?.id}
                                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getRateColor(skill.rate)}`}
                                                                    >
                                                                        <span className="truncate">{skill.master_skill?.name || 'unknown'}</span>
                                                                        <FaStar size={10} className="ml-2" />
                                                                        <span className="ml-1 text-xs font-semibold">{skill.rate}</span>
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                                    No employees match the selected skills.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div> */}

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillRequirementTabContent;
