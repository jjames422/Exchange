'use client';

import { useState } from 'react';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setParsedData(result);
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('/api/fiat/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parsedData.amountUSD }),
      });

      if (response.ok) {
        alert('Deposit successful.');
      } else {
        console.error('Error confirming deposit:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming deposit:', error);
    }
  };

  return (
    <div className="upload-page p-4 bg-darkBackground text-darkText">
      <h1 className="text-3xl md:text-4xl font-bold text-neonYellow">Upload Document</h1>
      <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
      <button onClick={handleFileUpload} className="mt-4 p-2 bg-neonPink text-darkText font-bold">Upload</button>
      {parsedData && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-neonGreen">Parsed Data</h2>
          <pre className="bg-lightBackground p-4 rounded">{JSON.stringify(parsedData, null, 2)}</pre>
          <button onClick={handleConfirm} className="mt-4 p-2 bg-neonBlue text-darkText font-bold">Confirm</button>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
