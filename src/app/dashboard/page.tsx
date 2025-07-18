// components/UploadForm.tsx
"use client";
import { useState } from "react";
import { Loader } from "../coponents/Loader";

export default function UploadForm() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);


  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    
    

    if (!files) {
      return
      setLoading(false);
    };
    
    const fileName =  files[0].name.split('.',1);

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    const res = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Error converting images to PDF");
      return;
      setLoading(false);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName} converted.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
    setLoading(false)
  };

  return (
    <>
      <div className="w-full h-screen bg-[#0603257c]">
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#000000a6]">
          <div className="text-2xl font-bold text-white">SPARSHAM</div>
          <a href="/login" className="text-white text-lg hover:underline">
            Login
          </a>
        </nav>
        <div className="flex justify-center items-center w-full p-8">
          <div className="w-full bg-[#e7e7e72a] rounded-md p-2">
            <h1 className="mt-10 text-3xl font-bold text-[#ffffff] text-center">
              JPG to PDF
            </h1>
            <p className="mt-5 text-xl text-center">
              Convert you JPG or PNG image in one Click
            </p>
            <div className="form flex justify-center items-center mt-10">
              <form onSubmit={handleSubmit}>
                <div className="border border-dashed py-6 px-2 text-sm">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <div>
                {loading?<Loader/>:null}
                </div>
                <div className="flex justify-center w-full">
                  <button
                    className="mt-10 mb-10 bg-red-800 rounded-md px-4 py-3 "
                    type="submit"
                  >
                    Convert to PDF
                  </button>
                </div>
              </form>
            </div>
      
          </div>
        </div>
      </div>
    </>
  );
}
