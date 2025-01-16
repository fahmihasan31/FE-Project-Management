import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { getEmployees } from '@/store/slices/employees';
import { addMember } from '@/store/slices/projects';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { toast } from 'react-toastify';

const MemberTabContent = ({ projectId }: { projectId: string | any }) => {
    const dispatch = useAppDispatch();
    const employeeState = useAppSelector((state) => state.Employees);
    const manageState = useAppSelector((state) => state.Projects);

    const [selectEmp, setSelectEmp] = useState<any>({});

    useEffect(() => {
        dispatch(getEmployees({}));
        if (manageState.selectedData?.members) {
            const initialMembers = manageState.selectedData.members.reduce((acc: any, member: any) => {
                if (!acc[member.role]) {
                    acc[member.role] = [];
                }
                acc[member.role].push(member.employee_id);
                return acc;
            }, {});
            setSelectEmp(initialMembers);
            console.log('Mapped roles to employee IDs:', initialMembers);
        }
    }, [dispatch, manageState.selectedData]);

    const handleEmpChange = (role: string) => (selectedOptions: any) => {
        setSelectEmp((prevState: any) => ({
            ...prevState,
            [role]: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
        }));
    };

    const employeeOptionAll = useMemo(() => {
        return (
            employeeState.data.map((employee: any) => ({
                value: employee.id,
                label: employee.name,
            })) || []
        );
    }, [employeeState.data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convert selectEmp state to the payload structure
        const members = Object.entries(selectEmp).flatMap(([role, employeeIds]) => {
            return (employeeIds as string[]).map((employee_id) => ({
                employee_id,
                role,
            }));
        });

        const payload = {
            project_id: projectId,
            members,
        };

        try {
            await dispatch(addMember(payload));
            toast.success('Members added successfully!');
        } catch (error) {
            toast.error('Failed to add members to the project.');
            console.error('Error adding members to project:', error);
        }
    };

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
                        isMulti
                        id="project_manager"
                        name="project_manager"
                        value={employeeOptionAll.filter((option: any) => selectEmp.project_manager?.includes(option.value))}
                        onChange={handleEmpChange('project_manager')}
                        options={employeeOptionAll}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Project Manager"
                    />
                </div>

                {/* business analyst */}
                <div className="mb-4">
                    <label htmlFor="business_analyst" className="text-sm font-medium text-gray-700">
                        Business Analyst
                    </label>
                    <Select
                        isMulti
                        id="business_analyst"
                        name="business_analyst"
                        value={employeeOptionAll.filter((option: any) => selectEmp.business_analyst?.includes(option.value))}
                        onChange={handleEmpChange('business_analyst')}
                        options={employeeOptionAll}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Project Business Analyst"
                    />
                </div>

                {/* Engineer */}
                <div className="mb-4">
                    <label htmlFor="engineer" className="text-sm font-medium text-gray-700">
                        Engineer
                    </label>
                    <Select
                        isMulti
                        id="engineer"
                        name="engineer"
                        value={employeeOptionAll.filter((option: any) => selectEmp.engineer?.includes(option.value))}
                        onChange={handleEmpChange('engineer')}
                        options={employeeOptionAll}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Project engineer"
                    />
                </div>

                {/* tester */}
                <div className="mb-4">
                    <label htmlFor="tester" className="text-sm font-medium text-gray-700">
                        Tester
                    </label>
                    <Select
                        isMulti
                        id="tester"
                        name="tester"
                        value={employeeOptionAll.filter((option: any) => selectEmp.tester?.includes(option.value))}
                        onChange={handleEmpChange('tester')}
                        options={employeeOptionAll}
                        className="mt-1 w-full rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        placeholder="Select Project tester"
                    />
                </div>

                <div className="mb-6 flex justify-end">
                    <button type="submit" onClick={handleSubmit} className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberTabContent;
