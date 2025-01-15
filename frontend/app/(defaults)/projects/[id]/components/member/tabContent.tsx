import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getEmployees } from '@/store/slices/employees';
import { addMember, getMembersByRequirement } from '@/store/slices/projects';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';

const MemberTabContent = ({ projectId }: { projectId: string | any }) => {
    const dispatch = useAppDispatch();
    const employeeState = useAppSelector((state) => state.Employees);

    // State untuk menyimpan data yang dipilih
    const [selectedData, setSelectedData] = useState({
        projectManager: null,
        businessAnalyst: null,
        engineer: null,
        tester: null,
    });

    useEffect(() => {
        dispatch(getEmployees({}));
    }, [dispatch]);

    const handleSelectChange = (role: string, selectedOption: any) => {
        if (selectedOption) {
            setSelectedData((prevState) => ({
                ...prevState,
                [role]: selectedOption,
            }));

            if (role === 'engineer' || role === 'tester') {
                dispatch(getMembersByRequirement(projectId));
            } else if (role === 'projectManager' || role === 'businessAnalyst') {
                dispatch(getEmployees({}));
            }
        }
    };

    // Data employee
    const employeeOptions = employeeState.data.map((employee) => ({
        value: employee.id,
        label: employee.name,
    }));

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Member</h1>

                {/* Project Manager */}
                <div className="mb-4">
                    <label htmlFor="project_manager" className="text-sm font-medium text-gray-700">
                        Project Manager
                    </label>
                    <Select
                        id="project_manager"
                        name="project_manager"
                        isMulti
                        value={selectedData.projectManager}
                        onChange={(selectedOption: any) => handleSelectChange('projectManager', selectedOption)}
                        options={employeeOptions}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Project Manager"
                    />
                </div>

                {/* Business Analyst */}
                <div className="mb-4">
                    <label htmlFor="business_analyst" className="text-sm font-medium text-gray-700">
                        Business Analyst
                    </label>
                    <Select
                        id="business_analyst"
                        name="business_analyst"
                        isMulti
                        value={selectedData.businessAnalyst}
                        onChange={(selectedOption: any) => handleSelectChange('businessAnalyst', selectedOption)}
                        options={employeeOptions}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Business Analyst"
                    />
                </div>

                {/* Engineer */}
                <div className="mb-4">
                    <label htmlFor="engineer" className="text-sm font-medium text-gray-700">
                        Engineer
                    </label>
                    <Select
                        id="engineer"
                        name="engineer"
                        isMulti
                        value={selectedData.engineer}
                        onChange={(selectedOption: any) => handleSelectChange('engineer', selectedOption)}
                        options={employeeOptions}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Engineer"
                    />
                </div>

                {/* Tester */}
                <div className="mb-6">
                    <label htmlFor="tester" className="text-sm font-medium text-gray-700">
                        Tester
                    </label>
                    <Select
                        id="tester"
                        name="tester"
                        isMulti
                        value={selectedData.tester}
                        onChange={(selectedOption: any) => handleSelectChange('tester', selectedOption)}
                        options={employeeOptions}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Tester"
                    />
                </div>

                <div className="mb-6 flex justify-end">
                    <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                        Save
                    </button>
                </div>

                {/* Tabel Member */}
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {Object.entries(selectedData).map(([role, member]: any) => (
                            <tr key={role}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-900">{role.replace(/([A-Z])/g, ' $1')}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{member && member.length > 0 ? member.map((m: any) => m.label).join(', ') : 'Not Assigned'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberTabContent;
