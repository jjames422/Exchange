'use client';

import React, { useState } from 'react';

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('File uploaded successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('File upload failed');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Upload File</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
