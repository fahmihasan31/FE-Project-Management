import React, { useState } from 'react';
import Stepper from './stepper';
import FormContent from './formContent';
import { postProject } from '@/store/slices/projects';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';

type AddModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddModal = ({ isOpen, onClose }: AddModalProps) => {
    const dispatch = useAppDispatch();
    const ProjectState = useAppSelector((state) => state.Projects);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        masterProject: {
            id: '',
            client_id: '',
            name: '',
            description: '',
            schedule_start: '',
            schedule_end: '',
            status: 'draft',
            amount: 0,
        },
        projectRequirement: {},
        projectMember: {},
        projectDocument: {},
    });

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleClose = () => {
        setFormData({
            masterProject: { id: '', client_id: '', name: '', description: '', schedule_start: '', schedule_end: '', status: 'draft', amount: 0 },
            projectRequirement: {},
            projectMember: {},
            projectDocument: {},
        });
        setCurrentStep(1);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(postProject(formData)).unwrap();
        alert('Form submitted successfully!');
        setCurrentStep(1);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
                {/* Close Button */}
                <button
                    type="button"
                    className="absolute right-4 top-4 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleClose}
                >
                    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Stepper */}
                <Stepper currentStep={currentStep} />

                {/* Form Content */}
                <div className="mt-6">
                    <FormContent currentStep={currentStep} formData={formData} setFormData={setFormData} />
                </div>

                {ProjectState.error && <p className="text-sm text-red-500">{ProjectState.error}</p>}

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`rounded px-4 py-2 ${currentStep === 1 ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Back
                    </button>
                    {currentStep === 5 ? (
                        <button onClick={handleSubmit} className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                            Submit
                        </button>
                    ) : (
                        <button onClick={handleNext} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddModal;
