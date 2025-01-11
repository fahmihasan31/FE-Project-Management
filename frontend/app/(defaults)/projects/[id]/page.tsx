'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { getProjects } from '@/store/slices/projects';
import OverviewTabContent from './components/project-manage/tabContent';
import MemberTabContent from './components/member/tabContent';
import DocumentTabContent from './components/document/tabContent';
import SkillRequirementTabContent from './components/skill-requirement/tabContent';
import { useAppDispatch } from '@/hook/redux-hook';

const Page = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjects({}));
    });

    const [activeTab, setActiveTab] = useState('project-manage');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'project-manage':
                return <OverviewTabContent projectId={params.id} />;
            case 'member':
                return <MemberTabContent />;
            case 'document':
                return <DocumentTabContent />;
            case 'skill-requirement':
                return <SkillRequirementTabContent projectId={params.id} />;
            default:
                return null;
        }
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="mb-6 flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-md">
                <div className="flex items-center">
                    {/* Back Button */}
                    <Link href="/projects" className="mr-4 text-gray-500 hover:text-blue-600">
                        <IoChevronBackOutline size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">Manage Project</h1>
                        <p className="text-sm text-gray-500">Manage all aspects of the project.</p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="mb-4 border-b">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        className={`${
                            activeTab === 'project-manage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                        } group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium hover:text-blue-600`}
                        onClick={() => handleTabChange('project-manage')}
                    >
                        Project Detail
                    </button>
                    <button
                        className={`${
                            activeTab === 'skill-requirement' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                        } group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium hover:text-blue-600`}
                        onClick={() => handleTabChange('skill-requirement')}
                    >
                        Skill Requirement
                    </button>
                    <button
                        className={`${
                            activeTab === 'member' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                        } group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium hover:text-blue-600`}
                        onClick={() => handleTabChange('member')}
                    >
                        Member
                    </button>
                    <button
                        className={`${
                            activeTab === 'document' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                        } group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium hover:text-blue-600`}
                        onClick={() => handleTabChange('document')}
                    >
                        Document
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            <div>{renderTabContent()}</div>
        </div>
    );
};

export default Page;
