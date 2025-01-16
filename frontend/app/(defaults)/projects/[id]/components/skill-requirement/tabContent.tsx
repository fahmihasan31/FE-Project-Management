import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { getSkills } from '@/store/slices/skills';
import { getEmployees } from '@/store/slices/employees';
import { addRequirement } from '@/store/slices/projects';
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
    requirement: {
        project_id: string;
        master_skill_id: string;
    };
}

const getRateColor = (rate: number) => {
    if (rate <= 6) return 'bg-red-100 text-red-700';
    if (rate <= 8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
};

const SkillRequirementTabContent = ({ projectId }: { projectId: string | any }) => {
    const dispatch = useAppDispatch();
    const skillState = useAppSelector((state) => state.Skills);
    const employeeState = useAppSelector((state) => state.Employees);
    const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<EmployeeProps[]>([]);
    const manageState = useAppSelector((state) => state.Projects);

    useEffect(() => {
        dispatch(getSkills({}));
        dispatch(getEmployees({}));
        const req = manageState.selectedData.requirements.map((item: any) => item.master_skill_id);
        setSelectedSkillIds([...req]);
    }, [dispatch]);

    const handleSkillChange = (selectedOptions: any[] | null) => {
        const selectedIds = selectedOptions?.map((option) => option.value) || [];
        setSelectedSkillIds(selectedIds);
    };

    useEffect(() => {
        if (selectedSkillIds.length > 0 && employeeState.data.length > 0) {
            const matchingEmployees = employeeState.data.filter((employee: EmployeeProps) => employee.skills.some((skill) => skill.master_skill && selectedSkillIds.includes(skill.master_skill.id)));
            setFilteredEmployees(matchingEmployees);
        } else {
            setFilteredEmployees([]);
        }
    }, [selectedSkillIds, employeeState.data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            project_id: projectId,
            skill_id: selectedSkillIds,
        };

        try {
            await dispatch(addRequirement(payload));
            toast.success('Skill Requirement added successfully');
        } catch (error) {
            toast.error('Failed to add Skill Requirement');
        }
    };

    const skillOption2 = useMemo(() => {
        const ops =
            skillState.data.map((skill) => ({
                value: skill.id,
                label: skill.name,
            })) || [];
        return ops;
    }, [skillState.data]);

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-neutral-900">
                <div className="mb-6">
                    <label htmlFor="skills" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Add Skills
                    </label>
                    <Select
                        id="skills"
                        isMulti
                        options={skillOption2}
                        onChange={handleSkillChange}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select skill"
                        value={skillOption2.filter((option: any) => selectedSkillIds.includes(option.value))}
                    />
                </div>

                <div>
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
                </div>

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
