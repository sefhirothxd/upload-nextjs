'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const HomePage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.set('file', file);

    //send file to server
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-950 p-5">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl text-center my-4">Upload a file</h1>
          <input
            className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
            onChange={handleFileChange}
            type="file"
            name=""
            id=""
          />
          <button
            className="bg-green-500 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
          >
            Upload
          </button>
        </form>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="imagen preview"
            className="w-64 h-64 object-contain mx-auto mt-4"
            width={300}
            height={300}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
