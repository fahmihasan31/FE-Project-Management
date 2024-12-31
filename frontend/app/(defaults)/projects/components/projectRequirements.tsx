import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { getSkills } from '@/store/slices/skills';

interface ProjectRequirementsProps {
    formData: any;
    setFormData: (data: any) => void;
}

const ProjectRequirements = ({ formData, setFormData }: ProjectRequirementsProps) => {
    const dispatch = useAppDispatch();
    const SkillsState = useAppSelector((state) => state.Skills);
    const [selectedSkills, setSelectedSkills] = useState<string[]>(formData.skills || []);
    const [filteredSkills, setFilteredSkills] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getSkills({}));
    }, [dispatch]);

    useEffect(() => {
        const availableSkills = SkillsState.data.filter((skill: any) => !selectedSkills.includes(skill.id));
        setFilteredSkills(availableSkills);
    }, [selectedSkills, SkillsState.data]);

    const handleAddSkill = (skillId: string) => {
        if (skillId) {
            const updatedSkills = [...selectedSkills, skillId];
            setSelectedSkills(updatedSkills);
            setFormData({ ...formData, skills: updatedSkills });
        }
    };

    const handleRemoveSkill = (skillId: string) => {
        const updatedSkills = selectedSkills.filter((s) => s !== skillId);
        setSelectedSkills(updatedSkills);
        setFormData({ ...formData, skills: updatedSkills });
    };

    return (
        <div>
            <h3 className="mb-4 text-xl font-bold">Project Requirements</h3>

            <div className="mb-4 ">
                <label className="mb-2 block text-sm font-medium text-gray-600">Add Skills</label>
                <select
                    className=" w-full overflow-y-auto rounded-md border border-gray-300 p-2"
                    onChange={(e) => {
                        handleAddSkill(e.target.value);
                        e.target.value = '';
                    }}
                    value=""
                >
                    <option value="" disabled>
                        Select a skill
                    </option>
                    {filteredSkills.map((skill: any) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skillId) => {
                    const skill = SkillsState.data.find((s: any) => s.id === skillId);
                    return (
                        <div key={skillId} className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
                            <span>{skill?.name || skillId}</span>
                            <button className="text-blue-500 hover:text-blue-700" onClick={() => handleRemoveSkill(skillId)}>
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectRequirements;
