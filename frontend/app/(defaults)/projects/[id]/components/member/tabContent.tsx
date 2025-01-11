import React, { useState } from 'react';
import Select from 'react-select';

const roles = [
    { label: 'Project Manager', value: 'project_manager' },
    { label: 'Business Analyst', value: 'business_analyst' },
    { label: 'Engineer', value: 'engineer' },
    { label: 'Tester', value: 'tester' },
];

const employeeOptions = [
    { label: 'Fahmi (Vuejs *5)', value: 'fahmi_vuejs' },
    { label: 'Rere (Vuejs *5)', value: 'rere_vuejs' },
    { label: 'Sandy (Vuejs *7)', value: 'sandy_vuejs' },
    { label: 'Abdul (Golang *5)', value: 'abdul_golang' },
    { label: 'Rere (Golang *5)', value: 'rere_golang' },
    { label: 'Sandy (Golang *7)', value: 'sandy_golang' },
    { label: 'Sandy (Power BI *7)', value: 'sandy_powerbi' },
];

const MemberTabContent = () => {
    const [selectedMembers, setSelectedMembers] = useState({});

    const handleSelectChange = (role: string, selectedOptions: any) => {
        setSelectedMembers({
            ...selectedMembers,
            [role]: selectedOptions,
        });
    };

    const handleSave = () => {
        console.log('Saved data:', selectedMembers);
        alert('Data saved successfully!');
    };

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-4 text-2xl font-semibold text-gray-700">Assign Members to Roles</h1>
                <div className="space-y-6">
                    {roles.map((role) => (
                        <div key={role.value} className="grid grid-cols-3 items-center gap-4">
                            <span className="font-medium text-gray-600">{role.label}</span>
                            <Select isMulti options={employeeOptions} className="" onChange={(selectedOptions: any) => handleSelectChange(role.value, selectedOptions)} placeholder="Select members" />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSave}
                    className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default MemberTabContent;
