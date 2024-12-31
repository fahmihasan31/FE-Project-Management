import React from 'react';
import { FaProjectDiagram, FaTasks, FaFileAlt, FaUsers, FaClipboardList } from 'react-icons/fa';

const steps = [
    { id: 1, title: 'Master Project', icon: FaProjectDiagram },
    { id: 2, title: 'Project Documents', icon: FaFileAlt },
    { id: 3, title: 'Project Requirements', icon: FaTasks },
    { id: 4, title: 'Project Members', icon: FaUsers },
    { id: 5, title: 'Summary', icon: FaClipboardList },
];

type StepperProps = {
    currentStep: number;
};

const Stepper = ({ currentStep }: StepperProps) => {
    return (
        <div className="relative mt-6 flex w-full items-center justify-between">
            <div className="top-1/6 absolute left-0 h-1 w-full -translate-y-1/2 rounded-full bg-gray-300" />

            <div
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-600 transition-all duration-300"
                style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
            />

            {steps.map((step, index) => (
                <div key={step.id || index} className="relative z-10 flex flex-col items-center">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                            currentStep >= step.id ? 'scale-110 border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-400'
                        }`}
                    >
                        <step.icon className="h-4 w-4" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
