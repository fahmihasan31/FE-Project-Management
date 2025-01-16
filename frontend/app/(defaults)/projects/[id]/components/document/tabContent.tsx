import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoDocumentText } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook';
import { addDocument } from '@/store/slices/projects';
import http from '@/services/http/api';

interface DocumentData {
    path: string;
}

const DocumentManage = ({ projectId }: { projectId: string | any }) => {
    const dispatch = useAppDispatch();
    const manageState = useAppSelector((state) => state.Projects);
    const [documents, setDocuments] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const req = manageState.selectedData.documents.map((item: any) => item.path);
        setDocuments([...req]);
        console.log('isi document', req);
    }, manageState.selectedData);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('project_id', projectId);
        formData.append('file', file);

        try {
            await dispatch(addDocument(formData));
            console.log('data apa ini', formData);

            toast.success('Document uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload document');
            console.error('Upload error:', error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-gray-700">Manage Documents</h2>

                {/* File Upload Section */}
                <div className="mb-6">
                    <label htmlFor="fileUpload" className="mb-2 block text-sm font-medium text-gray-900">
                        Upload Document
                    </label>
                    <input type="file" id="fileUpload" onChange={handleFileChange} className="block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                </div>

                {/* Save Button */}
                <div className="mb-6 flex justify-end">
                    <button onClick={handleSubmit} className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                        Save
                    </button>
                </div>

                {/* Display Uploaded Documents */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {documents.map((doc, index) => (
                        <div key={index} className="rounded-lg border bg-white p-4 shadow-md">
                            <div className="flex items-center space-x-2">
                                <IoDocumentText size={24} className="text-blue-600" />
                            </div>
                            <div className="mt-4 text-sm text-gray-600">
                                <p className="truncate">{doc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentManage;
