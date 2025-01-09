import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getEmployees } from '@/store/slices/employees';

interface ProjectTeamProps {
    formData: any;
    setFormData: (data: any) => void;
}

const ProjectTeam = ({ formData, setFormData }: ProjectTeamProps) => {
    const dispatch = useAppDispatch();
    const EmployeesState = useAppSelector((state) => state.Employees);
    const [selectedTeam, setSelectedTeam] = useState<{ id: string; role: string }[]>(formData.member || []);
    const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getEmployees({}));
    }, [dispatch]);

    useEffect(() => {
        const availableEmployees = EmployeesState.data.filter((employee: any) => !selectedTeam.some((teamMember) => teamMember.id === employee.id));
        setFilteredEmployees(availableEmployees);
    }, [selectedTeam, EmployeesState.data]);

    const handleAddEmployee = (employeeId: string) => {
        if (employeeId) {
            const updatedTeam = [...selectedTeam, { id: employeeId, role: '' }];
            setSelectedTeam(updatedTeam);
            setFormData({ ...formData, team: updatedTeam });
        }
    };

    const handleRemoveEmployee = (employeeId: string) => {
        const updatedTeam = selectedTeam.filter((member) => member.id !== employeeId);
        setSelectedTeam(updatedTeam);
        setFormData({ ...formData, team: updatedTeam });
    };

    const handleRoleChange = (employeeId: string, role: string) => {
        const updatedTeam = selectedTeam.map((member) => (member.id === employeeId ? { ...member, role } : member));
        setSelectedTeam(updatedTeam);
        setFormData({ ...formData, team: updatedTeam });
    };

    return (
        <div>
            <h3 className="mb-4 text-xl font-bold">Project Team</h3>

            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-600">Add Employee</label>
                <select
                    className="w-full rounded-md border border-gray-300 p-2"
                    onChange={(e) => {
                        handleAddEmployee(e.target.value);
                        e.target.value = '';
                    }}
                    value=""
                >
                    <option value="" disabled>
                        Select an employee
                    </option>
                    {filteredEmployees.map((employee: any) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {selectedTeam.map(({ id, role }) => {
                    const employee = EmployeesState.data.find((e: any) => e.id === id);
                    return (
                        <div key={id} className="flex items-center gap-4 rounded-md border p-4">
                            <span className="flex-1 text-sm font-medium">{employee?.name || id}</span>
                            <select className="rounded-md border border-gray-300 p-2" value={role} onChange={(e) => handleRoleChange(id, e.target.value)}>
                                <option value="" disabled>
                                    Select a role
                                </option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Tester">Tester</option>
                            </select>
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveEmployee(id)}>
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectTeam;
