import React from 'react';

type SummaryProps = {
    formData: any;
};

const Summary = ({ formData }: SummaryProps) => (
    <div>
        <h3 className="mb-4 text-xl font-bold">Summary</h3>
        <pre className="rounded-md bg-gray-100 p-4">{JSON.stringify(formData, null, 2)}</pre>
    </div>
);

export default Summary;
