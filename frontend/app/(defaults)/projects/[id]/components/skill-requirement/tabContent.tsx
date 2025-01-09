import React, { useState } from 'react';
import Select from 'react-select';

type SkillOption = {
    value: string;
    label: string;
};

type Employee = {
    name: string;
    skills: {
        name: string;
        rate: number;
    }[];
};

const SkillRequirementTabContent = () => {
    const [selectedSkills, setSelectedSkills] = useState<SkillOption[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

    // Dummy data for skills
    const skillOptions: SkillOption[] = [
        { value: 'VueJS', label: 'VueJS' },
        { value: 'Golang', label: 'Golang' },
        { value: 'Power BI', label: 'Power BI' },
        { value: 'ReactJS', label: 'ReactJS' },
        { value: 'NodeJS', label: 'NodeJS' },
    ];

    // Dummy data for employees
    const employees: Employee[] = [
        {
            name: 'Sandy',
            skills: [
                { name: 'VueJS', rate: 7 },
                { name: 'Golang', rate: 7 },
                { name: 'Power BI', rate: 7 },
            ],
        },
        {
            name: 'Rere',
            skills: [
                { name: 'VueJS', rate: 5 },
                { name: 'Golang', rate: 5 },
            ],
        },
        {
            name: 'Abdul',
            skills: [{ name: 'Golang', rate: 5 }],
        },
        {
            name: 'Nina',
            skills: [
                { name: 'ReactJS', rate: 6 },
                { name: 'NodeJS', rate: 8 },
            ],
        },
        {
            name: 'Lisa',
            skills: [
                { name: 'Power BI', rate: 9 },
                { name: 'ReactJS', rate: 7 },
            ],
        },
    ];

    const handleSkillChange = (selectedOptions: SkillOption[] | null) => {
        setSelectedSkills(selectedOptions || []);

        if (selectedOptions && selectedOptions.length > 0) {
            const selectedSkillNames = selectedOptions.map((option) => option.value);

            const matchingEmployees = employees.filter((employee) => employee.skills.some((skill) => selectedSkillNames.includes(skill.name)));

            setFilteredEmployees(matchingEmployees);
        } else {
            setFilteredEmployees([]);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">Project Requirements</h3>

                {/* Add skill dropdown */}
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
                    />
                </div>

                {/* Display filtered employees */}
                <div>
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Employees with Selected Skills</h4>
                    <ul>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <li key={employee.name} className="mb-2 text-gray-700 dark:text-gray-300">
                                    <strong>{employee.name}</strong>:{' '}
                                    {employee.skills
                                        .filter((skill) => selectedSkills.some((selected) => selected.value === skill.name))
                                        .map((skill) => `${skill.name} (Level ${skill.rate})`)
                                        .join(', ')}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 dark:text-gray-400">No employees match the selected skills.</li>
                        )}
                    </ul>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillRequirementTabContent;
