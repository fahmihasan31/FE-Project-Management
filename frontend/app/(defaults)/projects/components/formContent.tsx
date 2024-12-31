import React from 'react';
import MasterProject from './masterProject';
import ProjectRequirements from './projectRequirements';
import ProjectDocuments from './projectDocument';
import ProjectMembers from './projectMembers';
import Summary from './summary';

type FormContentProps = {
    currentStep: number;
    formData: any;
    setFormData: (data: any) => void;
};

const FormContent = ({ currentStep, formData, setFormData }: FormContentProps) => {
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <MasterProject formData={formData} setFormData={setFormData} />;
            case 2:
                return <ProjectDocuments formData={formData} setFormData={setFormData} />;
            case 3:
                return <ProjectRequirements formData={formData} setFormData={setFormData} />;
            case 4:
                return <ProjectMembers formData={formData} setFormData={setFormData} />;
            case 5:
                return <Summary formData={formData} />;
            default:
                return null;
        }
    };

    return <div className="space-y-6 ">{renderStepContent()}</div>;
};

export default FormContent;
