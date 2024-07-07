'use client';

import React, { useState } from 'react';

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUploadResult(data);
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadResult({ error: error.message });
    }
  };

  return (
    <div>
      <h2>Upload MT103 File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadResult && (
        <div>
          {uploadResult.error ? (
            <p>Error: {uploadResult.error}</p>
          ) : (
            <pre>{JSON.stringify(uploadResult.data, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
