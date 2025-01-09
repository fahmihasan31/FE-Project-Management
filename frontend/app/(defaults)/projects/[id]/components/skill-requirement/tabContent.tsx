import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getSkills } from '@/store/slices/skills';
import { getEmployees } from '@/store/slices/employees';
import { FaStar } from 'react-icons/fa';
import Select from 'react-select';

type SkillOption = {
    value: string;
    label: string;
};

type Employee = {
    id: number;
    name: string;
    skills: {
        id: string;
        name: string;
        rate: number;
        master_skill: {
            id: string;
            name: string;
        };
    }[];
};

const getRateColor = (rate: number) => {
    if (rate <= 6) return 'bg-red-100 text-red-700';
    if (rate <= 8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
};

const SkillRequirementTabContent = () => {
    const dispatch = useAppDispatch();
    const skills = useAppSelector((state) => state.Skills);
    const employees = useAppSelector((state) => state.Employees);
    const [selectedSkills, setSelectedSkills] = useState<SkillOption[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        if (!skills.data.length) {
            dispatch(getSkills({}));
        }
    }, [dispatch, skills.data.length]);

    useEffect(() => {
        if (!employees.data.length) {
            dispatch(getEmployees({}));
        }
    }, [dispatch, employees.data.length]);

    const handleSkillChange = (selectedOptions: SkillOption[] | null) => {
        setSelectedSkills(selectedOptions || []);

        if (selectedOptions && selectedOptions.length > 0) {
            const selectedSkillIds = selectedOptions.map((option) => option.value);

            const filtered = employees.data.filter((employee: any) =>
                employee.skills.some((skill: any) =>
                    selectedSkillIds.includes(skill.master_skill.id) // Menggunakan master_skill.id untuk mencocokkan skill
                )
            );

            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees([]);
        }
    };

    const skillOptions = skills.data.map((skill: any) => ({
        value: skill.id,
        label: skill.name,
    }));

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">Project Requirements</h3>

                <div className="mb-6">
                    <label htmlFor="skills" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Add Skills
                    </label>
                    <Select
                        id="skills"
                        isMulti
                        value={selectedSkills}
                        onChange={handleSkillChange}
                        options={skillOptions}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select skills..."
                        isLoading={skills.loading}
                    />
                </div>

                <div>
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Employees with Selected Skills</h4>
                    <ul>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <li key={employee.id} className="mb-2 text-gray-700 dark:text-gray-300">
                                    <strong>{employee.name}</strong>:{' '}
                                    {employee.skills
                                        .filter((skill) =>
                                            selectedSkills.some((selected) => selected.value === skill.master_skill.id)
                                        )
                                        .sort((a, b) => b.rate - a.rate)
                                        .map((skill, index) => (
                                            <span key={skill.master_skill.id || index} className={`inline-flex items-center mr-1 rounded-full px-3 py-1 text-xs font-medium ${getRateColor(skill.rate)}`}>
                                                <span className="truncate">{skill.master_skill.name}</span>
                                                <FaStar size={10} className="ml-2" />
                                                <span className="ml-1 text-xs font-semibold">{skill.rate}</span>
                                            </span>
                                        ))}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 dark:text-gray-400">No employees match the selected skills.</li>
                        )}
                    </ul>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillRequirementTabContent;
