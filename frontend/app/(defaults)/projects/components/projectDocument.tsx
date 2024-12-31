interface ProjectDocumentsProps {
    formData: any;
    setFormData: (data: any) => void;
}

const ProjectDocuments = ({ formData, setFormData }: ProjectDocumentsProps) => {
    return (
        <div>
            <h3 className="mb-4 text-xl font-bold">Project Documents</h3>
            {/* Input for Path */}
            <label className="mb-2 block text-sm font-medium text-gray-600">Document Path</label>
            <input
                type="file"
                multiple
                value={formData.path || ''}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter document path"
            />
        </div>
    );
};

export default ProjectDocuments;
