import { useState } from 'react';
import { toast } from 'react-toastify';
// import { DocumentTextIcon } from '@heroicons/react/solid';
import { IoDocumentText } from 'react-icons/io5';

interface DocumentData {
    name: string;
    url: string;
}

const DocumentManage = () => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSave = () => {
        if (!file) {
            toast.error('Please upload a file first.');
            return;
        }

        const newDocument = {
            name: file.name,
            url: URL.createObjectURL(file),
        };

        setDocuments((prev) => [...prev, newDocument]);
        setFile(null);
        toast.success('Document uploaded successfully.');
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
                    <button onClick={handleSave} className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-700">
                        Save
                    </button>
                </div>

                {/* Uploaded Documents */}
                <div>
                    <h3 className="mb-4 text-xl font-semibold text-gray-600">Uploaded Documents</h3>
                    {documents.length === 0 ? (
                        <p className="text-gray-500">No documents uploaded yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {documents.map((doc, index) => (
                                <div key={index} className="flex flex-col items-center justify-center rounded-md border bg-gray-50 p-4 shadow-sm hover:shadow-md">
                                    <IoDocumentText className="h-12 w-8 text-blue-500" />
                                    <a href={doc.url} download={doc.name} className="mt-2 text-center text-sm font-medium text-blue-600 hover:underline">
                                        {doc.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentManage;
